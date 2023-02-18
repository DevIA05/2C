from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('model', views.page_model, name='page_model'),
]
