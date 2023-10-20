from django.db import models
from enumfields import EnumField

from .enums import Metric


class FoodCategory(models.Model):
    name = models.CharField(max_length=120, unique=True)
    external_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=250, unique=True)
    keywords = models.TextField(blank=True, null=True)
    external_id = models.CharField(max_length=50, blank=True, null=True)
    category = models.ForeignKey(
        FoodCategory,
        related_name='products',
        on_delete=models.SET_NULL,
        null=True,
    )

    # Pantry fields
    pantry_min = models.IntegerField(blank=True, null=True)
    pantry_max = models.IntegerField(blank=True, null=True)
    pantry_metric = EnumField(Metric, max_length=20, blank=True, null=True)
    pantry_tips = models.TextField(blank=True, null=True)
    pantry_after_opening_min = models.IntegerField(blank=True, null=True)
    pantry_after_opening_max = models.IntegerField(blank=True, null=True)
    pantry_after_opening_metric = EnumField(Metric, max_length=20, blank=True, null=True)

    # Refrigeration fields
    refrigerate_min = models.IntegerField(blank=True, null=True)
    refrigerate_max = models.IntegerField(blank=True, null=True)
    refrigerate_metric = EnumField(Metric, max_length=20, blank=True, null=True)
    refrigerate_tips = models.TextField(blank=True, null=True)
    refrigerate_after_opening_min = models.IntegerField(blank=True, null=True)
    refrigerate_after_opening_max = models.IntegerField(blank=True, null=True)
    refrigerate_after_opening_metric = EnumField(Metric, max_length=20, blank=True, null=True)
    refrigerate_after_thawing_min = models.IntegerField(blank=True, null=True)
    refrigerate_after_thawing_max = models.IntegerField(blank=True, null=True)
    refrigerate_after_thawing_metric = EnumField(Metric, max_length=20, blank=True, null=True)

    # Freezer fields
    freezer_min = models.IntegerField(blank=True, null=True)
    freezer_max = models.IntegerField(blank=True, null=True)
    freezer_tips = models.TextField(blank=True, null=True)
    freezer_metric = EnumField(Metric, max_length=20, blank=True, null=True)

    # Boolean fields
    expired = models.BooleanField(default=False)
    consumed = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
