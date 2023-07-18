from django.apps import AppConfig


class CalorieAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'calorie_app'

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'
    label = 'accounts_app'