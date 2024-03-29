from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer
    """

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "role",
            "name",
            "last_name",
            "birth_date",
            "gender",
            "email",
            "password",
        )
