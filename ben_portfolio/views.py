from django.shortcuts import render
from django.core.mail import send_mail
from django.http import JsonResponse
import json

def index(request):
    return render(request, "index.html")


