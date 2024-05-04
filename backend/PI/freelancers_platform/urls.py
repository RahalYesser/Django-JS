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
]