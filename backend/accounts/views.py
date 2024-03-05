from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser

from .models import User
from .serializers import UserSerializer

# Create your views here.


class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    User retrieve, update and destroy
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ['get', 'put', 'delete', 'patch']

    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        password = serializer.validated_data.get('password', None)
        instance = serializer.save()
        if password:
            instance.set_password(password)
        instance.save()

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        user = self.request.user
        return User.objects.filter(id=user.id)


class UserView():
    """
    User view
    """

    @csrf_exempt
    def signup(request):
        """
        User signup
        :param request: request
        :return: JsonResponse
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
        :param request: request
        :return: JsonResponse
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
