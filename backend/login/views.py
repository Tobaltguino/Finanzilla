from django.shortcuts import render
from .models import User, Note, Gasto, LimiteMensual
from .serializer import NoteSerializer, UserRegistrationSerializer, GastoSerializer, LimiteMensualSerializer, AgregarGastoSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from datetime import date

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            
            return res

        except:
            return Response({'success':False})

class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()
        
            res.data = {'refreshed':True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res

        except:
            return Response({'refreshed':False})

@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res

    except:
        return Response({'success':False})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated':True})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def agregar_gasto(request):


    serializer = AgregarGastoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(usuario=request.user)  #admin = 6 
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)








@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gastos(request):
    user = request.user 
    gastos = Gasto.objects.filter(usuario=user)
    serializer = GastoSerializer(gastos, many=True)
    return Response(serializer.data)








@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_limite(request):
    hoy = date.today()

    user = request.user
    limite = LimiteMensual.objects.filter(usuario=user, mes__month=hoy.month, mes__year=hoy.year)
    serializer = LimiteMensualSerializer(limite, many=True)
    return Response(serializer.data)
