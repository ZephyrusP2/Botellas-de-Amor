from rest_framework import generics, permissions
from backend.permissions import IsAdmin

from disposal.models import Bottle
from disposal.serializers import BottleSerializer


class Create(generics.CreateAPIView):
    """
    Bottle list and create
    """

    serializer_class = BottleSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["post"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Bottle.objects.all()

    def perform_create(self, serializer):
        """
        Perform create
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Retreive(generics.RetrieveAPIView):
    """
    Bottle retrieve
    """
    serializer_class = BottleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Get the bottle object associated with the current user.
        """
        return Bottle.objects.get_or_create(user=self.request.user)[0]


class Update(generics.UpdateAPIView):
    """
    Bottle update
    """

    serializer_class = BottleSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["put"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Bottle.objects.all()

    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Delete(generics.DestroyAPIView):
    """
    Bottle delete
    """

    serializer_class = BottleSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Bottle.objects.all()

    def perform_destroy(self, instance):
        """
        Perform destroy
        :param instance: instance
        :return: None
        """
        instance.delete()


class List(generics.ListAPIView):
    """
    Bottle list
    """

    serializer_class = BottleSerializer
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Bottle.objects.all()
