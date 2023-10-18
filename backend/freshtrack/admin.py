from django.contrib import admin
from .models import Food


class FoodAdmin(admin.ModelAdmin):
    pass

admin.site.register(Food, FoodAdmin)