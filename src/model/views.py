from django.shortcuts import render, redirect
import pdb; #pdb.set_trace()
from model.models import MultipleImage, Monitoring, Modeles
from django.http import JsonResponse
import base64
import io, os
from PIL import Image
import random
from django.core.files.uploadedfile import InMemoryUploadedFile
import re
import tensorflow as tf
import numpy as np

# from django.conf.settings import PATH_IMG_INVALIDED, PATH_IMG_POSSESSED
from django.conf import settings

# Create your views here.

# Récupère les images depuis la table MultipleImage et les envoie dans l'onglet image
def page_model(request):

    # ------------------- Image ----------------------------------
    path_images = MultipleImage.objects.values_list('pathimg', flat=True)
    images = [] # Stocke les images 
    for path in path_images:
        file_name = re.search(r'[^\\]+$', path).group()
        images.append(image_to_base64(path)) # Converti l'image en base 64 puis l'ajoute à images

    # ------------------- Modèle ----------------------------------        

    modeles = Modeles.objects.all()  # retrieve all objects from the Modeles model
    data = {}
    for m in modeles:
        data[m.namemodel] = {"acc": float(m.perf), "listctg": m.listctg}

    return render(request, 'model.html', {'images': images, 'data': data})


#** Effectue la prédiction de l'image en fonction du modèle choisi
def makesThePrediction(request):
    model, labels, image = loadingElements(request)
    res = predict_image(model = model, labels = labels, image = image)
    return JsonResponse({})

def loadingElements(request):

    # ------------------- Image ----------------------------------
    imgB64 = request.POST.get('result[image]') # str
    # pdb.set_trace() 
    image = base64_to_image(imgB64)            # On convertie en image
    image = image.resize((224, 224))           # Adaptation de la taille de l'image pour correspondre aux entrées du modèle
    # Le nom de l'image
    imgname = request.POST.get('result[name]')  # str

    # ------------------- Modèle ----------------------------------
    namemodel = request.POST.get('result[name_model]') # str
    objModele = Modeles.objects.get(namemodel=namemodel)
    pathmodele = objModele.pathmodele
    model = tf.keras.models.load_model(pathmodele) 
    labels = objModele.listctg

    return model, labels, image

def predict_image(model, labels, image, shape=(224,224)):
    np_image = np.asarray(image)
    predictions = model.predict(np.array([np_image]))
    label_index = np.argmax(predictions)
    return labels[label_index]

#** Convert an image to base 64
# path: str, path of the image
# return str, the image in base 64
def image_to_base64(path):
    # Open the image file in binary read mode ('rb')
    with open(path, "rb") as image_file:
        # Read the content of the image file and encode it in base64
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    # Return the encoded base64 string
    return encoded_string

#** Converti une chaîne de caractère en base 64 en image
# base64_string: str, la chaîne de caractère
# return img,  
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