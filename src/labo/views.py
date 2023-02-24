from django.shortcuts import render
import pdb; #pdb.set_trace()
from labo.models import MultipleImage
import base64
import io
from django.core.files.uploadedfile import InMemoryUploadedFile

# Create your views here.
def page_test(request):
    if request.method == "POST":
        images = request.FILES.getlist('images')
        pdb.set_trace()
        # inject in database
    #    return render(request, 'test.html')
    images = MultipleImage.objects.all()
    print(type(images))
    return render(request, 'test.html', {'images': images})
    

def save_image(image, filename):
    
    # Create an in-memory buffer
    buffer = io.BytesIO() 
    
    # Save the image to the buffer in PNG format
    image.save(buffer, format="PNG")
    
    # Create a new InMemoryUploadedFile object from the buffer
    file = InMemoryUploadedFile(
        buffer,  # File content
        None,  # Field name
        filename,  # File name
        "image/png",  # Content type
        buffer.getbuffer().nbytes,  # File size
        None,  # Charset
    )
    # Add image in model
    # MultipleImage.objects.create(images=file)
    return file 