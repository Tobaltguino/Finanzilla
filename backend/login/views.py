from django.shortcuts import render
from .models import User, Note, Gasto, LimiteMensual, Categoria
from .serializer import NoteSerializer, UserRegistrationSerializer, GastoSerializer, LimiteMensualSerializer, AgregarGastoSerializer, CategoriaSerializer, AgregarCategoriaSerializer

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







#Obtiene el gasto del usuario
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gastos(request):
    user = request.user 
    gastos = Gasto.objects.filter(usuario=user)
    serializer = GastoSerializer(gastos, many=True)
    return Response(serializer.data)

# Obtiene el limite mensual del usuario
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_limite(request):
    hoy = date.today()

    user = request.user
    limite = LimiteMensual.objects.filter(usuario=user, mes__month=hoy.month, mes__year=hoy.year)
    serializer = LimiteMensualSerializer(limite, many=True)
    return Response(serializer.data)

# Obtiene el "usuario" del login
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_usuario_actual(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
    })

## Guarda el limite mensual
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_limite(request):
    user = request.user
    data = request.data

    # actualiza o crea el límite de ese mes para ese usuario
    limite, created = LimiteMensual.objects.update_or_create(
        usuario=user,
        mes=date.today().replace(day=1),  # se guarda por mes actual
        defaults={"limite": data.get("limite")}
    )

    return Response({"success": True, "limite": limite.limite})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_gasto(request, gasto_id):
    try:
        gasto = Gasto.objects.get(id=gasto_id, usuario=request.user)
        gasto.delete()
        return Response({'success': True})
    except Gasto.DoesNotExist:
        return Response({'error': 'Gasto no encontrado'}, status=404)
    
# Obtiene las categorias del usuario
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categoria(request):
    user = request.user 
    categorias = Categoria.objects.filter(usuario=user)
    serializer = CategoriaSerializer(categorias, many=True)
    return Response(serializer.data)

# Agrega una categoria
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def agregar_categoria(request):

    serializer = AgregarCategoriaSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(usuario=request.user)  #admin = 6 
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Elimina una categoria
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def eliminar_categoria(request, categoria_id):
    try:
        categoria = Categoria.objects.get(id=categoria_id, usuario=request.user)
        categoria.delete()
        return Response({'success': True})
    except Gasto.DoesNotExist:
        return Response({'error': 'Categoria no encontrado'}, status=404)