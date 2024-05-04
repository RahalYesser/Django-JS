from django.db import models

from django.db import models

class User(models.Model):
    nom = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    
    class Meta:
        abstract = True
    
    def __str__(self):
        return self.nom

class AutoEntrepreneur(User):
    description = models.TextField()
    telephone = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    domaine = models.CharField(max_length=255)
    disponibilite = models.CharField(max_length=255)
    note = models.CharField(max_length=255)
    photo = models.FileField(upload_to='photos')
    
    class Meta:
        db_table = "auto_entrepreneur"

    def __str__(self):
        return self.nom

class Client(User):
    telephone = models.CharField(max_length=8)
    adresse = models.CharField(max_length=255)
    photo = models.FileField(upload_to='photos')
    
    class Meta:
        db_table = "client"

    def __str__(self):
        return self.nom
    
class Admin(User):
    class Meta:
        db_table = "admin"

class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    file = models.FileField(upload_to='service_files')
    tarif = models.CharField(max_length=255)
    entrepreneur = models.ForeignKey(AutoEntrepreneur, on_delete=models.CASCADE)
    client = models.ManyToManyField(Client, through='Demande', through_fields=('service', 'client'))
    
    class Meta:
        db_table = "service"

    def __str__(self):
        return self.title

class Demande(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateTimeField()
    
    class Meta:
        db_table = "demande"

    def __str__(self):
        return f"{self.client} - {self.service}"

class Feedback(models.Model):
    class Meta:
        db_table = "feedback"
