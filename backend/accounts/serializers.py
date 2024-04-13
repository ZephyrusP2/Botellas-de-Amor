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
            "location",
            "gender",
            "email",
            "password",
            "plastic_footprint",
        )
        read_only_fields = ("id", "plastic_footprint")


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    User update serializer
    """

    class Meta:
        model = User
        fields = (
            "id",
            "role",
            "name",
            "last_name",
            "birth_date",
            "location",
            "gender",
            "email",
        )
        read_only_fields = ("id",)
