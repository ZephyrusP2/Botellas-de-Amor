from rest_framework import generics, permissions
from backend.permissions import IsAdmin

from disposal.models import Challenge, Bottle
from disposal.serializers import ChallengesSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse


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
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Challenge.objects.all()


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def toggle(request):
    """
    Check if the challenge is checked
    :return: bool
    """
    challenge = Challenge.objects.get(pk=request.data["challenge_id"])
    user = request.user
    bottle = Bottle.objects.get(user=user)
    status = request.data["status"]
    if status == "checked":
        bottle.experience += challenge.experience
        if bottle.experience >= 100:
            bottle.experience = 0
            bottle.level += 1
        bottle.save()
    else:
        bottle.experience -= challenge.experience
        if bottle.experience < 0:
            bottle.experience = 0
        bottle.save()
    return JsonResponse({"level": bottle.level})
