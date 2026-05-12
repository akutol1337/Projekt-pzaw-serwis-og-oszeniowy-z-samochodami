from django.urls import path
from .views import zarejestruj_uzytkownika, zaloguj_uzytkownika

urlpatterns = [
    path('rejestracja/', zarejestruj_uzytkownika),
    path('logowanie/', zaloguj_uzytkownika),
]