from django.urls import path,include
from rest_framework import routers

from .views import *

routes=routers.DefaultRouter()
routes.register('client',ClientViewSet)

urlpatterns=[
    path('',include(routes.urls)),
]