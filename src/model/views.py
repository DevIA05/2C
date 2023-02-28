from django.shortcuts import render
import pdb; #pdb.set_trace()
from model.models import MultipleImage
from django.http import JsonResponse
import base64
import io
from PIL import Image
import random

# from django.conf.settings import PATH_IMG_INVALIDED, PATH_IMG_POSSESSED
from django.conf import settings

# Create your views here.

def page_model(request):
    # images = MultipleImage.objects.all()
    print(settings.PATH_IMG_INVALIDED)
    return render(request, 'model.html')


def makesThePrediction(request):
    # print(request.POST)
    imgB64 = request.POST.get('result[image]')
    imgname = request.POST.get('result[name]')
    nombre_aleatoire = random.uniform(0.5, 1)
    nombre_arrondi = round(nombre_aleatoire, 2)
    return JsonResponse({"name": imgname,  "acc": nombre_arrondi})

def base64_to_image(base64_string):
    # Decode the Base64 string to bytes
    image_bytes = base64.b64decode(base64_string)
    # Create a BytesIO object from the bytes
    image_buffer = io.BytesIO(image_bytes)
    # Open the image with PIL and return it
    return Image.open(image_buffer)