from rest_framework import serializers

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
