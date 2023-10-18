from django.db import models
from enumfields import EnumField

from .enums import Metric


class FoodCategory(models.Model):
    name = models.CharField(max_length=120)
    sub_name = models.CharField(max_length=120)
    external_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    keywords = models.TextField()
    external_id = models.CharField(max_length=50)  # unique ID from FSIS API
    category = models.ForeignKey(
        FoodCategory,
        related_name='products',
        on_delete=models.SET_NULL,
        null=True,
    )

    # Pantry fields
    pantry_min = models.IntegerField()
    pantry_max = models.IntegerField()
    pantry_metric = EnumField(Metric, max_length=20)
    pantry_tips = models.TextField()
    pantry_after_opening_min = models.IntegerField()
    pantry_after_opening_max = models.IntegerField()
    pantry_after_opening_metric = EnumField(Metric, max_length=20, blank=True, null=True)

    # Refrigeration fields
    refrigerate_min = models.IntegerField()
    refrigerate_max = models.IntegerField()
    refrigerate_metric = EnumField(Metric, max_length=20)
    refrigerate_tips = models.TextField()
    refrigerate_after_opening_min = models.IntegerField()
    refrigerate_after_opening_max = models.IntegerField()
    refrigerate_after_opening_metric = EnumField(Metric, max_length=20, blank=True, null=True)
    refrigerate_after_thawing_min = models.IntegerField()
    refrigerate_after_thawing_max = models.IntegerField()
    refrigerate_after_thawing_metric = EnumField(Metric, max_length=20, blank=True, null=True)

    # Freezer fields
    freeze_min = models.IntegerField()
    freeze_max = models.IntegerField()
    freezer_tips = models.TextField()
    freezer_metric = EnumField(Metric, max_length=20, blank=True, null=True)

    # Boolean fields
    expired = models.BooleanField(default=False)
    consumed = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
