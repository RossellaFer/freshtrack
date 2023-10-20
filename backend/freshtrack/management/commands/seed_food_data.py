from django.core.management.base import BaseCommand
from django.db import transaction

from freshtrack.models import Food, FoodCategory
from freshtrack.enums import Metric

import requests


class Command(BaseCommand):
    help = 'Initial script to seed Food and FoodCategory models'

    def retrieve_api_data(self):
        api_url = 'https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json'
        response = requests.get(api_url)

        if response.status_code == 200:
            json_response = response.json()
            data = json_response['sheets']

            product_list = list(filter(lambda item: item['name'] == 'Product', data))
            category_list = list(filter(lambda item: item['name'] == 'Category', data))

            product_data = product_list[0]['data']
            category_data = category_list[0]['data']

            return product_data, category_data
        else:
            print('Failed to fetch data from the API')
        
        print("Successfully retrieved data!")

    def convert_enum_field(self, enum_field):
        if not enum_field:
            return None
        
        if len(enum_field.split()) > 1:
            enum_field = '_'.join(enum_field.split()).replace('-','_').upper()

        return Metric[enum_field.upper()]


    def create_food_categories(self, category_data):
        counter = 0

        for data in category_data:
            category = {}
            
            for d in data:
                category.update(d)

            with transaction.atomic():
                try:
                    name = category.get('Category_Name', None)
                    sub_category = category.get('Subcategory_Name', None)
                    combined_name = f'{name}{f": {sub_category}" if sub_category else ""}'

                    FoodCategory.objects.create(
                        name=combined_name,
                        external_id=category['ID'],
                    )
                    counter += 1
                except Exception as e:
                    print(f"An error occurred while creating FoodCategory: {e}")
            
        print(f'Successfully created {counter} FoodCategory objects!')
        return True


    @transaction.atomic()
    def create_food(self, product_data):
        counter = 0
        food_to_create = []

        for data in product_data:
            product = {}
            for d in data:
                product.update(d)
            
            with transaction.atomic():
                try:
                    category = FoodCategory.objects.filter(
                        external_id=product['Category_ID'],
                    ).first()

                    external_id = product.get('ID', None)
                    name = product.get('Category_Name', None)
                    description = product.get('Name_subtitle', None)
                    keywords = product.get('Keywords', None)

                    # Pantry fields
                    pantry_min = product.get('Pantry_Min', None)
                    pantry_max = product.get('Pantry_Max', None)
                    pantry_metric = product.get('Pantry_Metric', None)
                    pantry_tips = product.get('Pantry_tips', None)
                    dop_pantry_min = product.get('DOP_Pantry_Min', None)
                    dop_pantry_max = product.get('DOP_Pantry_Max', None)
                    dop_pantry_metric = product.get('DOP_Pantry_Metric', None)
                    dop_pantry_tips = product.get('DOP_Pantry_tips', None)
                    pantry_after_opening_min = product.get('Pantry_After_Opening_Min', None)
                    pantry_after_opening_max = product.get('Pantry_After_Opening_Max', None)
                    pantry_after_opening_metric = product.get('Pantry_After_Opening_Metric', None)

                    # Refrigeration fields
                    refrigerate_min = product.get('Refrigerate_Min', None)
                    refrigerate_max = product.get('Refrigerate_Max', None)
                    refrigerate_metric = product.get('Refrigerate_Metric', None)
                    refrigerate_tips = product.get('Refrigerate_tips', None)
                    dop_refrigerate_min = product.get('DOP_Refrigerate_Min', None)
                    dop_refrigerate_max = product.get('DOP_Refrigerate_Max', None)
                    dop_refrigerate_metric = product.get('DOP_Refrigerate_Metric', None)
                    dop_refrigerate_tips = product.get('DOP_Refrigerate_tips', None)
                    refrigerate_after_opening_min = product.get('Refrigerate_After_Opening_Min', None)
                    refrigerate_after_opening_max = product.get('Refrigerate_After_Opening_Max', None)
                    refrigerate_after_opening_metric = product.get('Refrigerate_After_Opening_Metric', None)
                    refrigerate_after_thawing_min = product.get('Refrigerate_After_Thawing_Min', None)
                    refrigerate_after_thawing_max = product.get('Refrigerate_After_Thawing_Max', None)
                    refrigerate_after_thawing_metric = product.get('Refrigerate_After_Thawing_Metric', None)

                    # Freezer fields
                    freezer_min = product.get('Freeze_Min', None)
                    freezer_max = product.get('Freeze_Max', None)
                    freezer_metric = product.get('Freeze_Metric', None)
                    freezer_tips = product.get('Freeze_Tips', None)

                    food_to_create.append(
                        Food(
                            name=name,
                            description=description,
                            keywords=keywords,
                            external_id=external_id,
                            category=category,
                            pantry_min=pantry_min or dop_pantry_min,
                            pantry_max=pantry_max or dop_pantry_max,
                            pantry_metric=self.convert_enum_field(pantry_metric) or self.convert_enum_field(dop_pantry_metric),
                            pantry_tips=pantry_tips or dop_pantry_tips,
                            pantry_after_opening_min=pantry_after_opening_min,
                            pantry_after_opening_max=pantry_after_opening_max,
                            pantry_after_opening_metric=self.convert_enum_field(pantry_after_opening_metric),
                            refrigerate_min=refrigerate_min or dop_refrigerate_min,
                            refrigerate_max=refrigerate_max or dop_refrigerate_max,
                            refrigerate_metric=self.convert_enum_field(refrigerate_metric) or self.convert_enum_field(dop_refrigerate_metric),
                            refrigerate_tips=refrigerate_tips or dop_refrigerate_tips,
                            refrigerate_after_opening_min=refrigerate_after_opening_min,
                            refrigerate_after_opening_max=refrigerate_after_opening_max,
                            refrigerate_after_opening_metric=self.convert_enum_field(refrigerate_after_opening_metric),
                            refrigerate_after_thawing_min=refrigerate_after_thawing_min,
                            refrigerate_after_thawing_max=refrigerate_after_thawing_max,
                            refrigerate_after_thawing_metric=self.convert_enum_field(refrigerate_after_thawing_metric),
                            freezer_min=freezer_min,
                            freezer_max=freezer_max,
                            freezer_tips=freezer_tips,
                            freezer_metric=self.convert_enum_field(freezer_metric),
                        )
                    )
                    counter += 1
                except Exception as e:
                    print(f"An error occurred while creating FoodCategory: {e}")

        # print('FOOD TO CREATE', food_to_create)
        print(f'Successfully printed {counter} Food objects!')


    def handle(self, *args, **options):
        product_data, category_data = self.retrieve_api_data()
        categories_created = self.create_food_categories(category_data)

        if categories_created:
            self.create_food(product_data)

