from django.shortcuts import render

# Create your views here.

def page_model(request):
    return render(request, 'model.html')
