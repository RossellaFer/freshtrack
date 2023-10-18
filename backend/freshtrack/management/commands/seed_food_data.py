from django.core.management.base import BaseCommand
from django.db import transaction

from myapp.models import MyModel

import requests


class Command(BaseCommand):
    help = 'My one-time script'

    @transaction.atomic()
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

            for category in category_data:
                print('Create category here')

            for product in product_data:
                print('Create product here')
        else:
            print('Failed to fetch data from the API')

        print("Success!")

    def handle(self, *args, **options):
        self.retrieve_api_data()
