from .models import *
from rest_framework import serializers

class AutoEntrepreneurSerializer(serializers.ModelSerializer):
    class Meta:
        model = AutoEntrepreneur
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'

        