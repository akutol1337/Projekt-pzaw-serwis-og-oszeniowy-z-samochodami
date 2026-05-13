from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Ogloszenie

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
        return Response({"wiadomosc": "Uzytkownik stworzony!"}, status=status.HTTP_201_CREATED)
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dodaj_ogloszenie(request):
    dane = request.data
    try:
        nowe_ogloszenie = Ogloszenie.objects.create(
            tytul=dane.get('tytul'),
            opis=dane.get('opis'),
            cena=dane.get('cena'),
            autor=request.user
        )
        return Response({
            "wiadomosc": "Ogłoszenie dodane pomyślnie!",
            "id_ogloszenia": nowe_ogloszenie.id
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"blad": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def usun_ogloszenie(request, pk):
    ogloszenie = get_object_or_404(Ogloszenie, pk=pk)

    if ogloszenie.autor != request.user:
        return Response(
            {"blad": "Nie masz uprawnień do usuniecia tego ogłloszenia!"},
            status=status.HTTP_403_FORBIDDEN
        )

    ogloszenie.delete()
    return Response({"wiadomosc": "Ogłoszenie zostało usunięte."}, status=status.HTTP_200_OK)