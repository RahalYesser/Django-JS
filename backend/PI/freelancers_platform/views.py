from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view,permission_classes, authentication_classes
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

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
    
@api_view(['POST'])
def clientSignup(request):
    serializer = ClientSignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        username = request.data.get('user', {}).get('username')
        if username:
            user = User.objects.get(username=username)
            my_client_group = Group.objects.get_or_create(name='Client')
            my_client_group[0].user_set.add(user)
            token, created = Token.objects.get_or_create(user=user)
            data = {
                "user": serializer.data, 
                "token": token.key
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Username not provided in request data."}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def entreproneurSignup(request):
    serializer = AutoEntrepreneurSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        username = request.data.get('user', {}).get('username')
        if username:
            user = User.objects.get(username=username)
            my_entreproneur_group = Group.objects.get_or_create(name='AutoEntreproneur')
            my_entreproneur_group[0].user_set.add(user)
            token, created = Token.objects.get_or_create(user=user)
            data = {
                "user": serializer.data, 
                "token": token.key
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Username not provided in request data."}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signIn(request):
    data = request.data
    serializer = UserLoginSerializer(data=data)
    if serializer.is_valid():
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            token, created_token = Token.objects.get_or_create(user=user)
            user_group = None
            if user.groups.exists():
                user_group = user.groups.first().name
            response_data = {
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,  
                    "group": user_group  
                },
                "token": token.key
            }
            return Response(response_data, status=status.HTTP_200_OK)
    return Response({"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({"message":"Logged out successfully"})