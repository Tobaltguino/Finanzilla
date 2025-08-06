from rest_framework import serializers
from .models import Note, User, Gasto, LimiteMensual

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username', 'email', 'password']

    def create(self, validate_data):
        user = User(
            username=validate_data['username'],
            email=validate_data['email']
        )
        user.set_password(validate_data['password'])
        user.save()
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "description"]

class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = ["id", "usuario", "nombre", "fecha", "monto", "categoria"]
        depth = 1
        

class LimiteMensualSerializer(serializers.ModelSerializer):
    class Meta:
        model = LimiteMensual
        fields = ["id", "usuario", "mes", "limite"]

class AgregarGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Gasto
        fields=["nombre", "fecha", "monto", "categoria", "usuario"]
        read_only_fields = ["usuario"]