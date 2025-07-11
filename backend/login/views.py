from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import User
from .serializers import LoginSerializer
from rest_framework.response import Response

@api_view(["GET"])
def logins(request):
    logins = User.objects.all()
    serializer = LoginSerializer(logins, many=True)
    return Response(serializer.data)