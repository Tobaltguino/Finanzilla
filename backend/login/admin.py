from django.contrib import admin
from .models import User, Categoria, Gasto, Note

# Register your models here.
admin.site.register(User)
admin.site.register(Categoria)
admin.site.register(Gasto)
admin.site.register(Note)