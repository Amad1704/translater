from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
import requests


def index(request):
    if request.method == "POST":
        pass
    else:
        return render(request, 'index.html', {})