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
