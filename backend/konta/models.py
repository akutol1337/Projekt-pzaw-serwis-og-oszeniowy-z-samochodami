from django.db import models
from django.contrib.auth.models import User

class Ogloszenie(models.Model):
    tytul = models.CharField(max_length=200)
    opis = models.TextField()
    cena = models.DecimalField(max_digits=10, decimal_places=2)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    data_dodania = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tytul