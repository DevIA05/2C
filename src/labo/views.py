from django.shortcuts import render

# Create your views here.
def page_test(request):
    return render(request, 'test.html')