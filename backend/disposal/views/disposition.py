from rest_framework import generics, permissions
from backend.permissions import IsAdminOrOperator

from disposal.models import Disposition, Site
from accounts.models import User
from disposal.serializers import DispositionSerializer


class List(generics.ListAPIView):
    """
    List all dispositions
    """
    queryset = Disposition.objects.all()
    serializer_class = DispositionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]


class Create(generics.CreateAPIView):
    """
    Create a disposition
    """
    queryset = Disposition.objects.all()
    serializer_class = DispositionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]

    def perform_create(self, serializer):
        """
        Create a new disposition
        """
        operator = self.request.user
        user = User.objects.get(id=self.request.data["user"])
        serializer.save(operator=operator)
        user.carbon_footprint += 30  # grams of CO2 per bottle
        user.save()
