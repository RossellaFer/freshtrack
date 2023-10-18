from django.db import models
from enumfields import EnumField

from .enums import Metric


class Food(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    keywords = models.TextField()

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

    expired = models.BooleanField(default=False)

    def __str__(self):
        return self.name