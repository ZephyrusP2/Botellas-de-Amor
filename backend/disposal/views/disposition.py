from rest_framework import generics, permissions
from backend.permissions import IsAdminOrOperator, IsAdminOrOperatorOrSelf

from disposal.models import Disposition, Site
from accounts.models import User
from disposal.serializers import DispositionSerializer

carbon_footprint = 30


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
        user.carbon_footprint += carbon_footprint * \
            int(self.request.data["bottles"])
        user.save()


class Retrieve(generics.RetrieveAPIView):
    """
    Retrieve a disposition
    """
    queryset = Disposition.objects.all()
    serializer_class = DispositionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperatorOrSelf]


class Update(generics.UpdateAPIView):
    """
    Update a disposition
    """
    queryset = Disposition.objects.all()
    serializer_class = DispositionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]

    def perform_update(self, serializer):
        """
        Update a disposition
        """
        operator = self.request.user
        user = User.objects.get(id=self.request.data["user"])
        user.carbon_footprint -= carbon_footprint * self.get_object().bottles
        user.carbon_footprint += carbon_footprint * \
            int(self.request.data["bottles"])
        user.save()
        serializer.save(operator=operator)


class Delete(generics.DestroyAPIView):
    """
    Delete a disposition
    """
    queryset = Disposition.objects.all()
    serializer_class = DispositionSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]

    def perform_destroy(self, instance):
        """
        Delete a disposition
        """
        user = User.objects.get(id=instance.user.id)
        bottles = instance.bottles
        user.carbon_footprint -= carbon_footprint * bottles
        user.save()
        instance.delete()
