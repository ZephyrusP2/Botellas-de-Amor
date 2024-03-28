from rest_framework import generics, permissions
from backend.permissions import IsAdmin

from disposal.models import Site
from disposal.serializers import SiteSerializer


class Create(generics.CreateAPIView):
    """
    Site list and create
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["get", "post"]

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
