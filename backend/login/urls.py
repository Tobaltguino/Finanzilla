from django.urls import path

from .views import get_notes, CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register, get_gastos

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('notes/', get_notes), #Retorna las notes si está autenticado
    path('gastos/', get_gastos), #Retorna los gastos si está autenticado
    path('logout/', logout),
    path('authenticated/', is_authenticated),
    path('signup/', register)
]