from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    DIVISAS = [
        ('USD', 'Dólar estadounidense'),
        ('CLP', 'Peso chileno'),
        ('EUR', 'Euro'),
    ]
    divisa = models.CharField(max_length=3, choices=DIVISAS, default='USD')

    def __str__(self):
        return self.username

class Categoria(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)

    #notificaciones_activadas = models.BooleanField(default=True)
    #categoria_favorita = models.CharField(max_length=100, blank=True, null=True)

class Gasto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    fecha = models.DateField()
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

class Note(models.Model):
    description = models.CharField(max_length=300)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')


