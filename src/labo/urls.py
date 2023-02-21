from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('test', views.page_test, name='page_test'),
]
