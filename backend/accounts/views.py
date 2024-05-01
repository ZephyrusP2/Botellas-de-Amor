import datetime

from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView

from backend.permissions import IsAdmin, IsAdminOrSelf
from disposal.models import Bottle, Disposition

from .models import User
from .serializers import UserSerializer, UserUpdateSerializer

# Create your views here.


class UserData(generics.RetrieveAPIView):
    """
    User retrieve
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return User.objects.all()


class UserList(generics.ListAPIView):
    """
    Admin user list
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return User.objects.all()


class UserCreate(APIView):
    """
    User create
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = User.objects.all()

    def post(self, request):
        """
        Post
        :param request: request
        :return: JsonResponse
        """
        data = request.data
        today = datetime.date.today()
        birth_date = datetime.datetime.strptime(
            data["birth_date"], "%Y-%m-%d").date()
        if birth_date > today:
            return JsonResponse(
                {"birth_date": ["Birth date cannot be in the future"]}, status=400
            )
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.email = data["email"].lower()
            user.gender = data["gender"].lower()
            user.set_password(data["password"])
            user.save()
            token = Token.objects.create(user=user)
            Bottle.objects.create(user=user)
            return JsonResponse({"token": token.key, "id": user.id}, status=201)
        return JsonResponse(serializer.errors, status=400)


class UserRetrieve(generics.RetrieveAPIView):
    """
    User retrieve
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return User.objects.all()


class UserUpdate(generics.UpdateAPIView):
    """
    User update
    """

    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

    http_method_names = ["put"]

    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        serializer.save()

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return User.objects.all()


class UserDelete(generics.DestroyAPIView):
    """
    User delete
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return User.objects.all()


@csrf_exempt
def register(request):
    """
    User register
    :param request: request
    :return: JsonResponse
    """
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)
            today = datetime.date.today()
            birth_date = datetime.datetime.strptime(
                data["birth_date"], "%Y-%m-%d"
            ).date()
            if birth_date > today:
                return JsonResponse(
                    {"birth_date": ["Birth date cannot be in the future"]}, status=400
                )
            user = User(
                name=data["name"],
                last_name=data["last_name"],
                birth_date=data["birth_date"],
                location=data["location"],
                gender=data["gender"].lower(),
                email=data["email"].lower(),
                password=data["password"],
            )
            user.set_password(data["password"])
            user.save()
            token = Token.objects.create(user=user)
            Bottle.objects.create(user=user)
            return JsonResponse({"token": token.key, "id": user.id}, status=201)
        except IntegrityError:
            return JsonResponse({"error": "Email already exists"}, status=400)


@csrf_exempt
def login(request):
    """
    User login
    :param request: request
    :return: JsonResponse
    """
    if request.method == "POST":
        data = JSONParser().parse(request)
        User = get_user_model()
        try:
            User.objects.get(email=data["email"].lower())
        except User.DoesNotExist:
            return JsonResponse(
                {"error": "Usuario no encontrado"},
                status=400,
            )
        user = authenticate(
            request, email=data["email"].lower(), password=data["password"]
        )
        if user is None:
            return JsonResponse(
                {"error": "Contraseña incorrecta"},
                status=400,
            )
        else:
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            return JsonResponse({"token": str(token), "id": user.id}, status=200)


@csrf_exempt
def admin_login(request):
    """
    Admin login
    :param request: request
    :return: JsonResponse
    """
    if request.method == "POST":
        data = JSONParser().parse(request)
        user = authenticate(
            request, email=data["email"].lower(), password=data["password"]
        )
        if user is None or user.role != "admin" and user.role != "operator":
            return JsonResponse(
                {
                    "error": "could not login. user is not an admin or operator. please check username and/or password"
                },
                status=400,
            )
        else:
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            return JsonResponse({"token": str(token), "role": user.role}, status=200)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def bottles(request):
    """
    User bottles
    :param request: request
    :return: JsonResponse
    """
    if request.method == "GET":
        user = request.user
        dispositions = Disposition.objects.filter(user=user)
        userBottles = 0
        for disposition in dispositions:
            userBottles += disposition.bottles
        return JsonResponse({"bottles": userBottles}, status=200)
