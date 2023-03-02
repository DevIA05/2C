from django.shortcuts import render, redirect
import pdb; #pdb.set_trace()
from model.models import MultipleImage
from django.http import JsonResponse
import base64
import io, os
from PIL import Image
import random
from django.core.files.uploadedfile import InMemoryUploadedFile
import re

# from django.conf.settings import PATH_IMG_INVALIDED, PATH_IMG_POSSESSED
from django.conf import settings

# Create your views here.

def page_model(request):
    path_images = MultipleImage.objects.values_list('pathimg', flat=True)
    images = []
    for path in path_images:
        file_name = re.search(r'[^\\]+$', path).group()
        images.append(image_to_base64(path))
    return render(request, 'model.html', {'images': images})


def makesThePrediction(request):
    imgB64 = request.POST.get('result[image]')
    imgname = request.POST.get('result[name]')
    nombre_aleatoire = random.uniform(0.5, 1)
    nombre_arrondi = round(nombre_aleatoire, 2)
    return JsonResponse({"name": imgname,  "acc": nombre_arrondi})

def image_to_base64(path):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def base64_to_image(base64_string):
    # Decode the Base64 string to bytes
    image_bytes = base64.b64decode(base64_string)
    # Create a BytesIO object from the bytes
    image_buffer = io.BytesIO(image_bytes)
    # Open the image with PIL and return it
    return Image.open(image_buffer)

