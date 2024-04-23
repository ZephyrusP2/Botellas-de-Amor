from rest_framework import generics, permissions

from accounts.models import User
from backend.permissions import IsAdminOrOperator, IsAdminOrOperatorOrSelf
from disposal.models import Disposition, Bottle
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
        user.plastic_footprint += int(self.request.data["weight"]) * \
            int(self.request.data["bottles"])
        user.save()
        bottle = Bottle.objects.get(user=user)
        bottle.experience += 100
        if bottle.experience >= 100:
            bottle.level += 1
            bottle.experience = bottle.experience - 100
        bottle.save()


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
        user.plastic_footprint -= self.get_object().weight * self.get_object().bottles
        user.plastic_footprint += int(self.request.data["weight"]) * \
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
        weight = instance.weight
        user.plastic_footprint -= weight * bottles
        user.save()
        instance.delete()
