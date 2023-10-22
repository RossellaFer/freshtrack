from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets

from .serializers import FoodSerializer
from .models import Food, FoodCategory
from .enums import Metric


class FoodView(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
    filterset_fields = ['name', 'keywords']

    def create(self, request, *args, **kwargs):
        category_name = request.data.get('category_name')

        try:
            category = FoodCategory.objects.get(name=category_name)
        except FoodCategory.DoesNotExist:
            return Response({'error': f'Category "{category_name}" not found.'}, status=status.HTTP_400_BAD_REQUEST)

        request.data['category'] = category.id
        return super().create(request, *args, **kwargs)


def metric_options(request):
    options = [option.value for option in Metric]

    return JsonResponse({'metric_options': options})