from django.contrib import admin
from .models import Food, FoodCategory, FreshtrackUser


class FoodAdmin(admin.ModelAdmin):
    pass

class FoodCategoryAdmin(admin.ModelAdmin):
    pass

class FreshtrackUserAdmin(admin.ModelAdmin):
    pass

admin.site.register(Food, FoodAdmin)
admin.site.register(FoodCategory, FoodCategoryAdmin)
admin.site.register(FreshtrackUser, FreshtrackUserAdmin)
