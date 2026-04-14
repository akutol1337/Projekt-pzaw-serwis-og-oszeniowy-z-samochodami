from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class Car(models.Model):
    brand = models.CharField(
        "Marka samochodu:",
        max_length=100)

    model = models.CharField(
        "Model samochodu",
        max_length=100)

    year = models.IntegerField(
        "Rok produkcji",
        default=1900,
        validators= [MinValueValidator(1900),MaxValueValidator(2026)]
    )

    price = models.DecimalField(
        "Cena",
        max_digits=10,
        decimal_places=2,
        default=10000,
        validators=[MinValueValidator(10000),MaxValueValidator(9999999)]
    )

    milage = models.IntegerField(
        "Przebieg (w km)",
        default=0,
        validators=[MinValueValidator(0),MaxValueValidator(999999)]
    )

    description = models.TextField(
        "Opis",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  self.brand