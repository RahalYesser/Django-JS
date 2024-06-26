import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
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
from django.contrib.auth.hashers import make_password

class AutoEntrepreneurViewSet(viewsets.ModelViewSet):
    queryset = AutoEntrepreneur.objects.all()
    serializer_class = AutoEntrepreneurReadSerializer
    
    """  @action(detail=False, methods=['get'])
    def by_id(self, request, entrepreneur_id):
        autoentrepreneur = AutoEntrepreneur.objects.filter(id=entrepreneur_id)
        serializer = self.get_serializer(autoentrepreneur, many=False)
        return Response(serializer.data) """
    
class AutoEntrepreneurWriteViewSet(viewsets.ModelViewSet):
    queryset = AutoEntrepreneur.objects.all()
    serializer_class = AutoEntrepreneurWriteSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    @action(detail=False, methods=['get'])
    def by_entrepreneur(self, request, entrepreneur_id):
        autoentrepreneur = AutoEntrepreneur.objects.get(id=entrepreneur_id)
        services = Service.objects.filter(entrepreneur=autoentrepreneur)
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_region_and_domain(self, request):
        region = request.query_params.get('region')
        domain = request.query_params.get('domaine')
        entrepreneurs = AutoEntrepreneur.objects.all()
        if region:
            entrepreneurs = entrepreneurs.filter(adresse__region=region)
        if domain:
            entrepreneurs = entrepreneurs.filter(domaine=domain)
        services = Service.objects.filter(entrepreneur__in=entrepreneurs)
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)
    
class DemandeViewSet(viewsets.ModelViewSet):
    queryset = Demande.objects.all()
    serializer_class = DemandeReadSerializer

    @action(detail=False, methods=['get'])
    def by_client(self, request, client_id):
        client = Client.objects.get(id=client_id)
        demandes = Demande.objects.filter(client=client)
        serializer = self.get_serializer(demandes, many=True)
        return Response(serializer.data)
    
class DemandeWriteViewSet(viewsets.ModelViewSet):
    queryset = Demande.objects.all()
    serializer_class = DemandeReadSerializer

    def create(self, request):
        serializer = DemandeWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackReadSerializer
    
    def by_service(self, request, service_id):
        service = Service.objects.get(id=service_id)
        feedbacks = Feedback.objects.filter(service=service).order_by('-created_at')
        serializer = self.get_serializer(feedbacks, many=True)
        return Response(serializer.data)
    
class FeedbackWriteViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackWriteSerializer
   
    def create(self, request):
        serializer = FeedbackWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
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
        
        email = data.get('email')
        subject = data.get('name', 'No Subject') 
        message = data.get('message', '')
        from_email = settings.EMAIL_HOST_USER
        
        email_body = f"Submitted Email: {email}\n\nMessage:\n{message}"
        recipient_list = [from_email,email]  
        
        if not message or not from_email:
            return JsonResponse({'error': 'Message and email are required'}, status=400)

        try:
            send_mail(subject, email_body, from_email, recipient_list)
            return JsonResponse({'success': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_current_user(request):  
    user = request.user
    if user.is_authenticated:
        if hasattr(user, 'autoentrepreneur'):
            auto_entrepreneur = user.autoentrepreneur
            data = {
                'user_type': 'auto_entrepreneur',
                'id': auto_entrepreneur.id,
                'username':user.username,
                'firstName': auto_entrepreneur.firstName,
                'lastName': auto_entrepreneur.lastName,
                'email':user.email,
                'description': auto_entrepreneur.description,
                'tel': auto_entrepreneur.tel,
                'region': auto_entrepreneur.adresse.region,
                'city': auto_entrepreneur.adresse.city,
                'street': auto_entrepreneur.adresse.street,
                'postalcode': auto_entrepreneur.adresse.postalcode,                
                'domaine': auto_entrepreneur.domaine,
                'disponibilite': auto_entrepreneur.disponibilite,
                'gender': auto_entrepreneur.gender,
                'note': auto_entrepreneur.note,
                'photo': f"http://localhost:8000{auto_entrepreneur.photo.url}" if auto_entrepreneur.photo else None,
                'valid': auto_entrepreneur.valid,
            }
        elif hasattr(user, 'client'):
            client = user.client
            data = {
                'user_type': 'client',
                'id': client.id,
                'username':user.username,
                'firstName': client.firstName,
                'lastName': client.lastName,
                'tel': client.tel,
                'region': client.adresse.region,
                'city': client.adresse.city,
                'street': client.adresse.street,
                'postalcode': client.adresse.postalcode,
                'email':user.email,
                'photo': f"http://localhost:8000{client.photo.url}" if client.photo else None,
                'gender': client.gender,
            }
        else:
            return JsonResponse({'error': 'Unexpected user type'}, status=400)
        
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
