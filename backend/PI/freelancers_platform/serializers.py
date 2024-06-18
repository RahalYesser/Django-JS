from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token

class AdresseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adresse
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')

class AutoEntrepreneurReadSerializer(serializers.ModelSerializer):
    adresse = AdresseSerializer()
    user = UserSerializer()
    class Meta:
        model = AutoEntrepreneur
        fields = '__all__'

class AutoEntrepreneurWriteSerializer(serializers.ModelSerializer):
    adresse = AdresseSerializer()
    class Meta:
        model = AutoEntrepreneur
        fields = '__all__'
    
    def update(self, instance, validated_data):
        adresse_data = validated_data.pop('adresse', None)
        if adresse_data:
            # Update or create the Adresse instance
            adresse_instance, created = Adresse.objects.update_or_create(
                id=instance.adresse.id,
                defaults=adresse_data
            )
            instance.adresse = adresse_instance

        # Update the rest of the AutoEntrepreneur fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance


class ClientSerializer(serializers.ModelSerializer):
    adresse = AdresseSerializer()
    class Meta:
        model = Client
        fields = '__all__'

    def update(self, instance, validated_data):
        adresse_data = validated_data.pop('adresse', None)
        print(instance)
        if adresse_data:
            # Update or create the Adresse instance
            adresse_instance, created = Adresse.objects.update_or_create(
                id=instance.adresse.id,
                defaults=adresse_data
            )
            instance.adresse = adresse_instance
        print("2",validated_data)

        # Update the rest of the AutoEntrepreneur fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class ServiceFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFile
        fields = ('id', 'file')
    
class ServiceSerializer(serializers.ModelSerializer):
    files = ServiceFileSerializer(many=True, required=False)
    class Meta:
        model = Service
        fields = ('id', 'title', 'description', 'date', 'tarif', 'entrepreneur', 'files')
    
    #Converting the incoming data (usually from a request) into a dictionary of native Python datatypes.
    def to_internal_value(self, data):
        print(data)
        files_data = data.getlist('files')
        internal_value = super().to_internal_value(data)
        internal_value['files'] = files_data
        return internal_value
    
    def create(self, validated_data):        
        files_data = validated_data.pop('files')
        service = Service.objects.create(**validated_data)
        for file_data in files_data:
            ServiceFile.objects.create(service=service, file=file_data)
        return service

    def update(self, instance, validated_data):
        
        files_data = validated_data.pop('files',instance.files)
        print("files data : ",files_data)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.date = validated_data.get('date', instance.date)
        instance.tarif = validated_data.get('tarif', instance.tarif)
        instance.entrepreneur = validated_data.get('entrepreneur', instance.entrepreneur)
        instance.save()
        if files_data :
            # Clear existing files
            instance.files.all().delete()
            # Handle files update
            for file_data in files_data:
                ServiceFile.objects.update_or_create(service=instance, file=file_data)

        return instance 

class DemandeReadSerializer(serializers.ModelSerializer):
    service = ServiceSerializer()
    class Meta:
        model = Demande
        fields = '__all__'

class DemandeWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)       
    
class ClientSignUpSerializer(ModelSerializer):
    user = UserSerializer()
    adresse = AdresseSerializer()
    class Meta:
        model = Client
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        adresse_data = validated_data.pop('adresse')
        adresse = Adresse.objects.create(**adresse_data)
        user = User.objects.create_user(**user_data)
        client = Client.objects.create(user=user , adresse=adresse, **validated_data)
        Token.objects.create(user=user)
        return client
    
class EntreproneurSignUpSerializer(ModelSerializer):
    user = UserSerializer()
    adresse = AdresseSerializer()
    class Meta:
        model = AutoEntrepreneur
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        adresse_data = validated_data.pop('adresse')
        adresse = Adresse.objects.create(**adresse_data)
        user = User.objects.create_user(**user_data)
        entreproneur = AutoEntrepreneur.objects.create(user=user, adresse=adresse, **validated_data)
        Token.objects.create(user=user)
        return entreproneur

class FeedbackReadSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    class Meta:
        model = Feedback
        fields = '__all__'
    
class FeedbackWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
