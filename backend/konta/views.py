from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['POST'])
def zarejestruj_uzytkownika(request):
    dane = request.data
    try:
        uzytkownik = User.objects.create_user(
            username=dane.get('email'),
            email=dane.get('email'),
            password=dane.get('password'),
            first_name=dane.get('imie_nazwisko', '')
        )
        return Response({"wiadomosc": "Użytkownik stworzony!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"blad": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def zaloguj_uzytkownika(request):
    email = request.data.get('email')
    haslo = request.data.get('password')
    uzytkownik = authenticate(username=email, password=haslo)

    if uzytkownik is not None:
        return Response({"wiadomosc": "Zalogowano!", "user": email}, status=status.HTTP_200_OK)
    return Response({"blad": "Błędne dane"}, status=status.HTTP_400_BAD_REQUEST)