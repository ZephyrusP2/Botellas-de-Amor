from rest_framework import generics, permissions
from backend.permissions import IsAdmin

from disposal.models import Challenge
from disposal.serializers import ChallengesSerializer


class Create(generics.CreateAPIView):
    """
    Challenge list and create
    """

    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["post"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Challenge.objects.all()

    def perform_create(self, serializer):
        """
        Perform create
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Retreive(generics.RetrieveAPIView):
    """
    Challenge retrieve
    """

    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Challenge.objects.all()


class Update(generics.UpdateAPIView):
    """
    Challenge update
    """

    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["put"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Challenge.objects.all()

    def perform_update(self, serializer):
        """
        Perform update
        :param serializer: serializer
        :return: None
        """
        serializer.save()


class Delete(generics.DestroyAPIView):
    """
    Challenge delete
    """

    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Challenge.objects.all()

    def perform_destroy(self, instance):
        """
        Perform destroy
        :param instance: instance
        :return: None
        """
        instance.delete()


class List(generics.ListAPIView):
    """
    Challenge list
    """

    serializer_class = ChallengesSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Challenge.objects.all()
