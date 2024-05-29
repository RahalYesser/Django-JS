from datetime import datetime
from django.db import models
from django.contrib.auth.models import User


class AutoEntrepreneur(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default = '')
    firstName = models.CharField(max_length=255,default = '')
    lastName = models.CharField(max_length=255,default = '')
    description = models.TextField(default = '')
    tel = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    domaine = models.CharField(max_length=255)
    disponibilite = models.CharField(max_length=255)
    gender = models.CharField(max_length=10,default = '')
    note = models.CharField(max_length=255,default = '')
    photo = models.FileField(upload_to='photos',default = '')
    valid = models.BooleanField(default=False)
    class Meta:
        db_table = "auto_entrepreneur"

    def __str__(self):
        return self.firstName

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default = '')
    firstName = models.CharField(max_length=255,default = '')
    lastName = models.CharField(max_length=255,default = '')
    tel = models.CharField(max_length=8)
    adresse = models.CharField(max_length=255)
    photo = models.FileField(upload_to='photos',default = '')
    gender = models.CharField(max_length=10,default = '')
    
    class Meta:
        db_table = "client"

    def __str__(self):
        return self.firstName
    
class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    file = models.FileField(upload_to='service_files',default='')
    tarif = models.CharField(max_length=255)
    entrepreneur = models.ForeignKey(AutoEntrepreneur, on_delete=models.CASCADE)    
    class Meta:
        db_table = "service"

    def __str__(self):
        return self.title
    
class ServiceFile(models.Model):
    service = models.ForeignKey(Service, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='service_files/')

    class Meta:
        db_table = "service_file"

    def __str__(self):
        return self.file.name
    
class Demande(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE,default = '')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    
    class Meta:
        db_table = "demande"

    def __str__(self):
        return f"{self.client} - {self.service}"

class Feedback(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE,default = '')
    entrepreneur = models.ForeignKey(Service, on_delete=models.CASCADE,default = '')
    subject = models.CharField(max_length=255,default = '')
    message = models.TextField(default = '')
    created_at = models.DateTimeField(default=datetime.now)

    class Meta:
        db_table = "feedback"

    def __str__(self):
        return self.subject