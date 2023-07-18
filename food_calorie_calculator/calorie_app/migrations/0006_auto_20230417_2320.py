# Generated by Django 3.2.16 on 2023-04-17 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calorie_app', '0005_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllFoodData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cate', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=50)),
                ('value', models.IntegerField()),
                ('unit', models.CharField(max_length=50)),
                ('energy', models.FloatField()),
                ('protein', models.FloatField()),
                ('fat', models.FloatField()),
                ('cholesterol', models.FloatField()),
                ('sugar', models.FloatField()),
                ('fiebr', models.FloatField()),
                ('vitamin_a', models.FloatField()),
                ('vitamin_b1', models.FloatField()),
                ('vitamin_b2', models.FloatField()),
                ('vitamin_c', models.FloatField()),
                ('calcium', models.FloatField()),
                ('iron', models.FloatField()),
                ('sodium', models.FloatField()),
                ('potassium', models.FloatField()),
            ],
        ),
        migrations.AlterModelOptions(
            name='fooditem',
            options={},
        ),
    ]
