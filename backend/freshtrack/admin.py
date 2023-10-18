from django.contrib import admin
from .models import Food, FoodCategory


class FoodAdmin(admin.ModelAdmin):
    pass

class FoodCategoryAdmin(admin.ModelAdmin):
    pass

admin.site.register(Food, FoodAdmin)
admin.site.register(FoodCategory, FoodCategoryAdmin)
