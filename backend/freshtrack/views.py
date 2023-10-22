from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets

from .serializers import FoodSerializer
from .models import Food
from .enums import Metric


class FoodView(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
    filterset_fields = ['name', 'keywords']


def metric_options(request):
    options = [option.value for option in Metric]

    return JsonResponse({'metric_options': options})