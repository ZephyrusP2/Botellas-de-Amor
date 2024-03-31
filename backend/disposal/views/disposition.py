from rest_framework import generics, permissions
from backend.permissions import IsAdminOrOperator

from disposal.models import Disposition
from disposal.serializers import DispositionSerializer


class List(generics.ListAPIView):
    """
    List all dispositions
    """
    queryset = Disposition.objects.all()
    serializer_class = DispositionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]

    def get_queryset(self):
        """
        This view should return a list of all the dispositions.
        """
        return Disposition.objects.all()
