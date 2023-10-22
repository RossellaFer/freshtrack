from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions, status, viewsets
from rest_framework.views import APIView

from .serializers import FoodSerializer, FreshtrackUserSerializer
from .models import Food
from .enums import Metric


class FoodView(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
    filterset_fields = ['name', 'keywords']


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