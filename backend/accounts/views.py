from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser

from .models import User

# Create your views here.


class UserView():
    """
    User view
    """

    @csrf_exempt
    def signup(request):
        """
        User signup
        """
        if request.method == 'POST':
            try:
                data = JSONParser().parse(request)
                user = User(
                    name=data['name'],
                    last_name=data['last_name'],
                    birth_date=data['birth_date'],
                    gender=data['gender'],
                    email=data['email'],
                    password=data['password']
                )
                user.set_password(data['password'])
                user.save()
                token = Token.objects.create(user=user)
                return JsonResponse({'token': token.key}, status=201)
            except IntegrityError:
                return JsonResponse({'error': 'Email already exists'}, status=400)

    @csrf_exempt
    def login(request):
        """
        User login
        """
        if request.method == 'POST':
            data = JSONParser().parse(request)
            user = authenticate(
                request,
                email=data['email'],
                password=data['password'])
            if user is None:
                return JsonResponse(
                    {'error': 'could not login. please check username and/or password'},
                    status=400)
            else:
                try:
                    token = Token.objects.get(user=user)
                except Token.DoesNotExist:
                    token = Token.objects.create(user=user)
                return JsonResponse({'token': str(token)}, status=200)
