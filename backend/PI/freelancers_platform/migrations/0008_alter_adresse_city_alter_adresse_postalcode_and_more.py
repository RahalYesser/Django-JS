# Generated by Django 5.0.3 on 2024-06-15 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('freelancers_platform', '0007_adresse_remove_service_file_alter_servicefile_file_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adresse',
            name='city',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='adresse',
            name='postalcode',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='adresse',
            name='street',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]
