import json
from django.http import JsonResponse
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
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

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
    serializer = EntreproneurSignUpSerializer(data=request.data)
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
    try:
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response({"message": "Logged out successfully"})
    except AuthenticationFailed:
        return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
    except PermissionDenied:
        return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
def send_email_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        subject = data.get('subject', 'No Subject')
        message = data.get('message', '')
        from_email = settings.EMAIL_HOST_USER
        recipient_list = data.get('recipient_list', [])
        
        if not recipient_list:
            return JsonResponse({'error': 'Recipient list is empty'}, status=400)

        try:
            send_mail(subject, message, from_email, recipient_list)
            return JsonResponse({'success': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405) 


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    print(request.user)
    user = request.user
    if user.is_authenticated:
        if hasattr(user, 'autoentrepreneur'):
            auto_entrepreneur = user.autoentrepreneur
            data = {
                'user_type': 'auto_entrepreneur',
                'id': auto_entrepreneur.id,
                'firstName': auto_entrepreneur.firstName,
                'lastName': auto_entrepreneur.lastName,
                'description': auto_entrepreneur.description,
                'tel': auto_entrepreneur.tel,
                'adresse': auto_entrepreneur.adresse,
                'domaine': auto_entrepreneur.domaine,
                'disponibilite': auto_entrepreneur.disponibilite,
                'gender': auto_entrepreneur.gender,
                'note': auto_entrepreneur.note,
                'photo': auto_entrepreneur.photo.url if auto_entrepreneur.photo else None,
                'valid': auto_entrepreneur.valid,
            }
        elif hasattr(user, 'client'):
            client = user.client
            data = {
                'user_type': 'client',
                'id': client.id,
                'firstName': client.firstName,
                'lastName': client.lastName,
                'tel': client.tel,
                'adresse': client.adresse,
                'photo': client.photo.url if client.photo else None,
                'gender': client.gender,
            }
        else:
            return JsonResponse({'error': 'Unexpected user type'}, status=400)
        
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)