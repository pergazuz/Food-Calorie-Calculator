from django.db import models
from django.contrib.auth.models import User

class FoodItem(models.Model):
    name = models.CharField(max_length=255)
    calories = models.DecimalField(max_digits=6, decimal_places=2)
    def __str__(self):
        return self.name
    

class AllFoodData(models.Model):
    cate = models.CharField(max_length=255)
    name =  models.CharField(max_length=50)
    value = models.IntegerField()
    unit = models.CharField(max_length=50)
    energy = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    cholesterol = models.FloatField()
    sugar = models.FloatField()
    fiebr = models.FloatField()
    vitamin_a = models.FloatField()
    vitamin_b1 = models.FloatField()
    vitamin_b2 = models.FloatField()
    vitamin_c = models.FloatField()
    calcium = models.FloatField()
    iron = models.FloatField()
    sodium = models.FloatField()
    potassium = models.FloatField()


    def __str__(self):
        return self.cate
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add any additional fields you want to store for the user

    def __str__(self):
        return self.user.username

