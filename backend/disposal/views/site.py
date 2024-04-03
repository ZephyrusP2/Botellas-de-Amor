from rest_framework import generics, permissions
from backend.permissions import IsAdmin, IsAdminOrOperator

from disposal.models import Site
from disposal.serializers import SiteSerializer


class Create(generics.CreateAPIView):
    """
    Site list and create
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["post"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()

    def perform_create(self, serializer):
        """
        Perform create
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Retrieve(generics.RetrieveAPIView):
    """
    Site retrieve
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()


class Update(generics.UpdateAPIView):
    """
    Site update
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["put"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()

    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Delete(generics.DestroyAPIView):
    """
    Site delete
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()


class List(generics.ListAPIView):
    """
    Site list
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()