from django.urls import path
from .views import zarejestruj_uzytkownika, zaloguj_uzytkownika, dodaj_ogloszenie

urlpatterns = [
    path('rejestracja/', zarejestruj_uzytkownika),
    path('logowanie/', zaloguj_uzytkownika),
    path('dodaj-ogloszenie/', dodaj_ogloszenie),
]