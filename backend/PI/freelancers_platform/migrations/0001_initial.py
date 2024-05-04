# Generated by Django 5.0.3 on 2024-05-04 11:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AutoEntrepreneur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('telephone', models.CharField(max_length=255)),
                ('adresse', models.CharField(max_length=255)),
                ('domaine', models.CharField(max_length=255)),
                ('disponibilite', models.CharField(max_length=255)),
                ('note', models.CharField(max_length=255)),
                ('photo', models.FileField(upload_to='photos')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('telephone', models.CharField(max_length=8)),
                ('adresse', models.CharField(max_length=255)),
                ('photo', models.FileField(upload_to='photos')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Demande',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='freelancers_platform.client')),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('date', models.DateField()),
                ('file', models.FileField(upload_to='service_files')),
                ('tarif', models.CharField(max_length=255)),
                ('client', models.ManyToManyField(through='freelancers_platform.Demande', to='freelancers_platform.client')),
                ('entrepreneur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='freelancers_platform.autoentrepreneur')),
            ],
        ),
        migrations.AddField(
            model_name='demande',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='freelancers_platform.service'),
        ),
    ]
