from django.shortcuts import render, redirect
import pdb; #pdb.set_trace()
from model.models import MultipleImage, Monitoring
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

    # L'image en base 64
    imgB64 = request.POST.get('result[image]') 
    # pdb.set_trace()
    image = base64_to_image(imgB64)              # On convertie en image
    # Le nom de l'image
    imgname = request.POST.get('result[name]') 
    # Le modèle séléctionné
    namemodel = request.POST.get('result[name_model]') 
    # L'accuracy
    nombre_aleatoire = random.uniform(0.5, 1)
    nombre_arrondi = round(nombre_aleatoire, 2)

    return JsonResponse({"acc": nombre_arrondi})

def image_to_base64(path):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def base64_to_image(base64_string):
    # Decode the Base64 string to bytes
    img_data = base64.b64decode(base64_string.split(',')[1]) # remove the header 'data:image/png;base64'
    # Create a BytesIO object from the bytes 
    #  and Open the image with PIL and return it
    img = Image.open(io.BytesIO(img_data))
    return img

def monitoring(request):
    if request.method == "POST":
        
        # récupérer les données envoyées par le formulaire
        stock_data = request.POST
        # print(stock_data)
        # créer une instance du modèle avec les données reçues
        my_instance = Monitoring(
            pathimg=stock_data['imgB64'], # Image au format 64
            date=stock_data['date'], # Date récuperer
            heure=stock_data['heure'], # Heure récuperer 
            ctgbyuser=stock_data['ctgbyuser'], # Label choisi par l'utilisateur pour le monitoring
            ctgbymodel=stock_data['ctgbymodel'], # Label prédit par le model
            namemodel=stock_data['namemodel'], # Nom du model choisi pour la prédiction
            accuracy=stock_data['accuracy'], # % de la prédiction            
        )

        # sauvegarder l'instance dans la base de données
        my_instance.save()

       # renvoyer une réponse JSON
        return JsonResponse({'success': True})

    # Si la méthode HTTP n'est pas POST, renvoyer une réponse HTML
    # return render(request, 'model.html')
    return JsonResponse({'success': request.method})