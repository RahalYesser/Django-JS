from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token

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

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)       
    
class ClientSignUpSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Client
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        client = Client.objects.create(user=user , **validated_data)
        Token.objects.create(user=user)
        return client
    
class EntreproneurSignUpSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = AutoEntrepreneur
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        entreproneur = AutoEntrepreneur.objects.create(user=user , **validated_data)
        Token.objects.create(user=user)
        return entreproneur