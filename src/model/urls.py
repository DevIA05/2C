from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.page_model, name='page_model'),
    re_path(r'^makesThePrediction$', views.makesThePrediction),
    path('monitoring', views.monitoring, name='monitoring')
]
