#from labo.models import MultipleImage
from model.models import MultipleImage
import os
from PIL import Image
import io
from django.core.files.uploadedfile import InMemoryUploadedFile

print("working dir: " + os.getcwd())

# ============================================================================
#                             MultipleImage
# ============================================================================

# def getpath():
#     path = os.path.join("images","possessed")
#     for file in os.listdir(path):
#         file_path = os.path.join(path, file)
#         MultipleImage.objects.create(pathimg=file_path)


# getpath()
# def save_image(image, filename):
    
#     # Create an in-memory buffer
#     buffer = io.BytesIO() 
    
#     # Save the image to the buffer in PNG format
#     image.save(buffer, format="PNG")
    
#     # Create a new InMemoryUploadedFile object from the buffer
#     file = InMemoryUploadedFile(
#         buffer,  # File content
#         None,  # Field name
#         filename,  # File name
#         "image/png",  # Content type
#         buffer.getbuffer().nbytes,  # File size
#         None,  # Charset
#     )
    
#     return file

# path = "labo/static/img/possesses"
# for file in os.listdir(path):
#     if file != "Thumbs.db":
#         print(os.path.join(path, file))
#         img = Image.open(os.path.join(path, file))
#         # Transform img to InMemoryUploadedFile
#         muf = save_image(image=img, filename=file)
#         # Add image in model
#         MultipleImage.objects.create(images=muf)
