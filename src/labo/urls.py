from django.contrib import admin
from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('test', views.page_test, name='page_test'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
