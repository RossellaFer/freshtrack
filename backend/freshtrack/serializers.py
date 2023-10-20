from rest_framework import serializers
from .models import Food


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        # TODO: fix enum field JSON issue
        fields = (
            'name',
            'keywords',
        )