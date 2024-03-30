from rest_framework import generics, permissions
from backend.permissions import IsAdmin

from disposal.models import Fact
from disposal.serializers import FactsSerializer

class Create(generics.CreateAPIView):
    """
    Fact list and create
    """

    serializer_class = FactsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["post"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Fact.objects.all()

    def perform_create(self, serializer):
        """
        Perform create
        :param serializer: serializer
        :return: None
        """
        serializer.save()

class Retreive(generics.RetrieveAPIView):
    """
    Fact retrieve
    """

    serializer_class = FactsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Fact.objects.all()
    
class Update(generics.UpdateAPIView):
    """
    Fact update
    """

    serializer_class = FactsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["put"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Fact.objects.all()
    
    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        serializer.save()

class Delete(generics.DestroyAPIView):
    """
    Fact delete
    """

    serializer_class = FactsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Fact.objects.all()
    
    def perform_destroy(self, instance):
        """
        Perform destroy
        :param instance: instance
        :return: None
        """
        instance.delete()

class List(generics.ListAPIView):
    """
    Fact list
    """

    serializer_class = FactsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Fact.objects.all()