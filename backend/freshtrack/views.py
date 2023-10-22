from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import permissions, status, viewsets
from rest_framework.views import APIView
from .validations import custom_validation
from rest_framework.authentication import SessionAuthentication

from .serializers import FoodSerializer, FreshtrackUserSerializer, FreshtrackUserLoginSerializer
from .models import Food
from .enums import Metric


class FoodView(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'keywords']

    def create(self, request, *args, **kwargs):
        category_name = request.data.get('category_name')

        try:
            category = FoodCategory.objects.get(name=category_name)
        except FoodCategory.DoesNotExist:
            return Response({'error': f'Category "{category_name}" not found.'}, status=status.HTTP_400_BAD_REQUEST)

        request.data['category'] = category.id
        return super().create(request, *args, **kwargs)


class FreshtrackUserRegister(APIView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = FreshtrackUserSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

# Alternatively, we can set these as variables on the frontend
def metric_options(request):
    options = [option.value for option in Metric]

    return JsonResponse({'metric_options': options})

class FreshTrackUserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = FreshtrackUserLoginSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(clean_data)
            login(request, user)

            return Response(serializer.data, status=status.HTTP_200_OK)
