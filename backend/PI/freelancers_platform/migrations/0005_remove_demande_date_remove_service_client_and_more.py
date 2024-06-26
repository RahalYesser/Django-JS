# Generated by Django 5.0.6 on 2024-05-24 14:40

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('freelancers_platform', '0004_rename_telephone_autoentrepreneur_tel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='demande',
            name='date',
        ),
        migrations.RemoveField(
            model_name='service',
            name='client',
        ),
        migrations.AddField(
            model_name='autoentrepreneur',
            name='valid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='demande',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='feedback',
            name='client',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='freelancers_platform.client'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='feedback',
            name='entrepreneur',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='freelancers_platform.service'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='message',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='feedback',
            name='subject',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='autoentrepreneur',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='autoentrepreneur',
            name='photo',
            field=models.FileField(default='', upload_to='photos'),
        ),
        migrations.AlterField(
            model_name='demande',
            name='client',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='freelancers_platform.client'),
        ),
        migrations.AlterField(
            model_name='service',
            name='file',
            field=models.FileField(default='', upload_to='service_files'),
        ),
    ]
