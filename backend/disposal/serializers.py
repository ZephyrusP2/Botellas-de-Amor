from rest_framework import serializers

from disposal.models import Bottle, Challenge, Disposition, Site


class SiteSerializer(serializers.ModelSerializer):
    """
    Site serializer
    """

    image = serializers.ImageField(required=False)

    class Meta:
        model = Site
        fields = (
            "id",
            "image",
            "opens",
            "closes",
            "name",
            "address",
        )


class ChallengesSerializer(serializers.ModelSerializer):
    """
    Challenge serializer
    """

    class Meta:
        model = Challenge
        fields = (
            "id",
            "challenge",
            "experience",
        )


class DispositionSerializer(serializers.ModelSerializer):
    """
    Disposition serializer
    """

    class Meta:
        model = Disposition
        fields = (
            "id",
            "site",
            "bottles",
            "weight",
            "user",
            "operator",
        )
        read_only_fields = ("operator",)


class BottleSerializer(serializers.ModelSerializer):
    """
    Bottle serializer
    """

    class Meta:
        model = Bottle
        fields = (
            "id",
            "experience",
            "level",
            "user",
        )
