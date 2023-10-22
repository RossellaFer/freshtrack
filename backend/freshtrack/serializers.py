from rest_framework import serializers
from .models import Food


class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name')
    pantry_metric = serializers.SerializerMethodField()
    pantry_after_opening_metric = serializers.SerializerMethodField()
    refrigerate_metric = serializers.SerializerMethodField()
    refrigerate_after_opening_metric = serializers.SerializerMethodField()
    refrigerate_after_thawing_metric = serializers.SerializerMethodField()
    freezer_metric = serializers.SerializerMethodField()

    class Meta:
        model = Food
        fields = (
            'name',
            'keywords',
            'external_id',
            'category_name',
            'pantry_min',
            'pantry_max',
            'pantry_metric',
            'pantry_tips',
            'pantry_after_opening_min',
            'pantry_after_opening_max',
            'pantry_after_opening_metric',
            'refrigerate_min',
            'refrigerate_max',
            'refrigerate_metric',
            'refrigerate_tips',
            'refrigerate_after_opening_min',
            'refrigerate_after_opening_max',
            'refrigerate_after_opening_metric',
            'refrigerate_after_thawing_min',
            'refrigerate_after_thawing_max',
            'refrigerate_after_thawing_metric',
            'freezer_min',
            'freezer_max',
            'freezer_tips',
            'freezer_metric',
            'expired',
            'consumed',
            'created_at',
            'deleted_at',
        )
    
    # TODO: create a mixin to handle enum fields
    def get_pantry_metric(self, obj):
        return self.format_metric(obj.pantry_metric)

    def get_pantry_after_opening_metric(self, obj):
        return self.format_metric(obj.pantry_after_opening_metric)

    def get_refrigerate_metric(self, obj):
        return self.format_metric(obj.refrigerate_metric)

    def get_refrigerate_after_opening_metric(self, obj):
        return self.format_metric(obj.refrigerate_after_thawing_metric)

    def get_refrigerate_after_thawing_metric(self, obj):
        return self.format_metric(obj.refrigerate_after_thawing_metric)

    def get_freezer_metric(self, obj):
        return self.format_metric(obj.freezer_metric)

    def format_metric(self, metric):
        return metric.value if metric else None