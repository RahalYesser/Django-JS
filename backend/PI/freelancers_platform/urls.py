from django.urls import path,include
from rest_framework import routers

from .views import *

routes=routers.DefaultRouter()
routes.register('client',ClientViewSet)
routes.register('auto-entrepreneurs', AutoEntrepreneurViewSet)
routes.register('services', ServiceViewSet)
routes.register('demandes', DemandeViewSet)

urlpatterns=[
    path('',include(routes.urls)),
    path('login/',signIn),
    path('clientsignup/',clientSignup),
    path('entreproneursignup/',entreproneurSignup),
    path('logout/',logout),
    path('send-email/', send_email_view),
    path('get_current_user/', get_current_user),
    path('services-by-entrepreneur/<int:entrepreneur_id>/',ServiceViewSet.as_view({'get':'by_entrepreneur'})),
    path('demandes-by-client/<int:client_id>/',DemandeViewSet.as_view({'get':'by_client'})),


]