from django.urls import path

from .views import get_notes, CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register, get_gastos, get_limite, agregar_gasto, get_usuario_actual, set_limite, eliminar_gasto, get_categoria, agregar_categoria, eliminar_categoria,set_divisa

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('notes/', get_notes), #Retorna las notes si está autenticado
    path('gastos/', get_gastos), #Retorna los gastos si está autenticado
    path('limite/', get_limite), #Retorna los gastos si está autenticado
    path('agregar_gasto/', agregar_gasto), #Agrega un gasto si está autenticado
    path('logout/', logout),
    path('authenticated/', is_authenticated),
    path('signup/', register),
    path('usuario/', get_usuario_actual),
    path('set_limite/', set_limite),
    path('eliminar_gasto/<int:gasto_id>/', eliminar_gasto),
    path('categorias/', get_categoria), #Retorna las categorias si está autenticado
    path('agregar_categoria/', agregar_categoria), #Agrega una categoria si está autenticado
    path('eliminar_categoria/<int:categoria_id>/', eliminar_categoria), #Elimina una categoria pidiendo su id de BD, también se necesita estar autenticado
    path('set_divisa/',set_divisa)
]