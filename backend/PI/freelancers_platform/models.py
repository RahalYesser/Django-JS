from django.db import models

class User(models.Model):
    nom = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    class Meta:
        abstract = True
    
class AutoEntrepreneur(User):
    description = models.TextField()
    telephone = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    domaine = models.CharField(max_length=255)
    disponibilite = models.CharField(max_length=255)
    note = models.CharField(max_length=255)
    photo = models.FileField(upload_to='photos')

class Client(User):
    telephone = models.CharField(max_length=8)
    adresse = models.CharField(max_length=255)
    photo = models.FileField(upload_to='photos')
    
class Admin(User):
    pass
    
class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    file = models.FileField(upload_to='service_files')
    tarif = models.CharField(max_length=255)
    entrepreneur = models.ForeignKey(AutoEntrepreneur,on_delete=models.CASCADE)
    client=models.ManyToManyField(Client,through='Demande',through_fields=('client','service'))
    
class Demande(models.Model):
    client=models.ForeignKey(Client,on_delete=models.CASCADE)
    service=models.ForeignKey(Service,on_delete=models.CASCADE)
    date = models.DateTimeField()
    
class Feedback(models.Model):
    pass