from django.http import JsonResponse
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)

from backend.permissions import IsAdmin
from .models import Project
from .serializers import ProjectSerializer


class Create(generics.CreateAPIView):
    """
    Project list and create
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Project.objects.all()


class Retrieve(generics.RetrieveAPIView):
    """
    Project retrieve
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Project.objects.all()


class Update(generics.UpdateAPIView):
    """
    Project update
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["put"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Project.objects.all()

    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Delete(generics.DestroyAPIView):
    """
    Project delete
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Project.objects.all()

    def perform_destroy(self, instance):
        """
        Perform destroy
        :param instance: instance
        :return: None
        """
        instance.delete()


class List(generics.ListAPIView):
    """
    Project list
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Project.objects.all()
