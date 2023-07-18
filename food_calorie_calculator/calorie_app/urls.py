# calorie_app/urls.py
from django.urls import path, include

from .views import FoodItemList
from . import views
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('food-items/', FoodItemList.as_view(), name='food-items'),
    path('raw-food-items/', views.raw_sql_food_items, name='raw_sql_food_items'),
    path('food-item-measurement-units/<str:food_item_name>/', views.get_measurement_units, name='food-item-measurement-units'),
    path('food-items-report/', views.get_food_items_report, name='food_items_report'),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    #path('accounts/signup/', views.signup, name='signup'),
    path('accounts/signup/', views.SignUpView.as_view(), name='api_signup'),
    path('accounts/login/', views.LoginView.as_view(), name='login'),
    path('api-auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
