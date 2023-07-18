from rest_framework import generics, permissions, status
from .models import FoodItem   
from .models import AllFoodData 
from .serializers import FoodItemSerializer
from django.http import JsonResponse
from django.db import connection
from django.core import serializers
from django.http import HttpResponse
from django.db.models import Q
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

from django.contrib.auth import get_user_model
from rest_framework.response import Response
from .serializers import SignUpSerializer


from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

from django.shortcuts import render, redirect


class FoodItemList(generics.ListCreateAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer


def get_measurement_units(request, food_item_name):
    # Define your raw SQL query
    query = "SELECT DISTINCT(unit) FROM calorie_app_allfooddata WHERE name = %s"

    # Execute the query
    with connection.cursor() as cursor:
        cursor.execute(query, [food_item_name])
        rows = cursor.fetchall()

        # Fetch column names from the cursor description
        column_names = [col[0] for col in cursor.description]

    # Convert the fetched data into a list of dictionaries
    measurement_units = [dict(zip(column_names, row)) for row in rows]

    # Return the data as JSON
    return JsonResponse(measurement_units, safe=False)


def raw_sql_food_items(request):
    # Read the 'search' parameter from the request's query parameters, or use default value
    search = request.GET.get('search', '')

    # Return an empty JSON array if there is no search text
    if not search:
        return JsonResponse([], safe=False)

    # Define your raw SQL query
    query = "SELECT DISTINCT(name) FROM calorie_app_allfooddata WHERE name LIKE %s"

    # Execute the query
    with connection.cursor() as cursor:
        cursor.execute(query, [f'%{search}%'])
        rows = cursor.fetchall()

        # Fetch column names from the cursor description
        column_names = [col[0] for col in cursor.description]

    # Convert the fetched data into a list of dictionaries
    food_items = [dict(zip(column_names, row)) for row in rows]

    # Return the data as JSON
    return JsonResponse(food_items, safe=False)






def get_food_items_report(request):
    names_units = request.GET.get('names_units', '')

    # Parse names_units into a list of tuples
    names_units = [tuple(pair.split(',')) for pair in names_units.split(';') if pair]

    # Return an empty JSON array if there are no items
    if not names_units:
        return JsonResponse([], safe=False)

    # Define your raw SQL query
    query = "SELECT * FROM calorie_app_allfooddata WHERE " + " OR ".join(["(name = %s AND unit = %s)"] * len(names_units))


    # Execute the query
    with connection.cursor() as cursor:
        # Flatten the list of tuples into a single list, keeping only the first two elements of each tuple
        params = [param for pair in names_units for param in pair[:2]]

        cursor.execute(query, params)

        rows = cursor.fetchall()

        # Fetch column names from the cursor description
        column_names = [col[0] for col in cursor.description]

    # Convert the fetched data into a list of dictionaries
    food_items = []
    for row, (name, unit, multiplier) in zip(rows, names_units):
        item = dict(zip(column_names, row))
        for key in item:
            if key not in {'name', 'unit'}:
                item[key] *= int(multiplier)
        food_items.append(item)

    # Return the data as JSON
    return JsonResponse(food_items, safe=False)









class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = SignUpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = self.perform_create(serializer)
            return Response({"status": "success", "message": "User created successfully"}, status=201)
        return Response(serializer.errors, status=400)

    def perform_create(self, serializer):
        return serializer.save()


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)