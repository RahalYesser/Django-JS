from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from.serializers import *

class AutoEntrepreneurViewSet(viewsets.ModelViewSet):
    queryset = AutoEntrepreneur.objects.all()
    serializer_class = AutoEntrepreneurSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class DemandeViewSet(viewsets.ModelViewSet):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer