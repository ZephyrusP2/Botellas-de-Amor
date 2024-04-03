from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes

from backend.permissions import IsAdmin, IsAdminOrSelf

from .models import User
from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework.views import APIView

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


class UserCreate(generics.CreateAPIView):
    """
    User create
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def perform_create(self, serializer):
        """
        Perform create
        :param serializer: serializer
        :return: None
        """
        password = serializer.validated_data.get("password", None)
        instance = serializer.save()
        if password:
            instance.set_password(password)
        instance.save()

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return User.objects.all()


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
            user = User(
                name=data["name"],
                last_name=data["last_name"],
                birth_date=data["birth_date"],
                location=data["location"],
                gender=data["gender"],
                email=data["email"].lower(),
                password=data["password"],
            )
            user.set_password(data["password"])
            user.save()
            token = Token.objects.create(user=user)
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
        user = authenticate(
            request, email=data["email"].lower(), password=data["password"]
        )
        if user is None:
            return JsonResponse(
                {"error": "could not login. please check username and/or password"},
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
