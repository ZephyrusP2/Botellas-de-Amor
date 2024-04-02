from rest_framework import serializers
from disposal.models import Challenge
from disposal.models import Site


class SiteSerializer(serializers.ModelSerializer):
    """
    Site serializer
    """

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

