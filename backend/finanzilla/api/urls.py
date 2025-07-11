from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django.contrib import admin

print("hola"+include('login.api.urls'))
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('login.api.urls'))
]






#2da app