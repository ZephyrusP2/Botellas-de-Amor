from rest_framework import serializers

from disposal.models import Bottle, Challenge, Disposition, Site, Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    """
    Schedule serializer
    """

    class Meta:
        model = Schedule
        fields = (
            "id",
            "site",
            "opens",
            "closes",
            "day",
        )
        read_only_fields = ("site",)


class SiteSerializer(serializers.ModelSerializer):
    """
    Site serializer
    """

    schedules = serializers.SerializerMethodField()

    class Meta:
        model = Site
        fields = (
            "id",
            "image",
            "name",
            "address",
            "schedules",
        )

    def get_schedules(self, obj):
        schedules = Schedule.objects.filter(site=obj)
        return ScheduleSerializer(schedules, many=True).data


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
