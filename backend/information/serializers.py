from rest_framework import serializers

from information.models import Fact, Project


class ProjectSerializer(serializers.ModelSerializer):
    """
    Project serializer
    """

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "image",
            "location",
            "description",
            "goal_tons",
            "total_tons",
            "organizations",
            "status",
        )


class FactSerializer(serializers.ModelSerializer):
    """
    Fact serializer
    """

    class Meta:
        model = Fact
        fields = ("id", "message")
