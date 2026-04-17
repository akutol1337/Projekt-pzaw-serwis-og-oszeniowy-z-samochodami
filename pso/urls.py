
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework.routers import  DefaultRouter
from .views import  CarViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, RegisterView

router = DefaultRouter()
router.register(r'cars', CarViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('logowanie/', include('rest_framework.urls')),

    path('register/', RegisterView.as_view(), name='register'),
]
