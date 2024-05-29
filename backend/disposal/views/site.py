import json

from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.permissions import IsAdmin, IsAdminOrOperator
from disposal.models import Schedule, Site
from disposal.serializers import ScheduleSerializer, SiteSerializer


class Create(APIView):
    """
    Site create
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):

        serializer = SiteSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            site = serializer.save()
            save_schedule(self, site, request.data["schedules"])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def save_schedule(self, site, schedules):
    """
    Save schedule
    :param site: Site
    :param schedules: List
    """
    schedule_dict = eval(schedules)
    for schedule in schedule_dict:
        if "id" in schedule:
            Schedule.objects.filter(id=schedule["id"]).update(
                day=schedule["day"],
                opens=schedule["opens"],
                closes=schedule["closes"],
            )
        else:
            Schedule.objects.create(
                site=site,
                day=schedule["day"],
                opens=schedule["opens"],
                closes=schedule["closes"],
            )


class Retrieve(APIView):
    """
    Site retrieve
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Site.objects.all()

    def get(self, request, pk):
        try:
            site = Site.objects.get(pk=pk)
        except Site.DoesNotExist:
            return Response(
                {"detail": "Site Not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = SiteSerializer(site, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class Update(APIView):
    """
    Site update
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Site.objects.all()

    def patch(self, request, pk, format=None):
        try:
            site = Site.objects.get(pk=pk)
        except Site.DoesNotExist:
            return Response(
                {"detail": "Site Not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = SiteSerializer(site, data=request.data, partial=True)
        if serializer.is_valid():
            if "image" in request.data and site.image.name != "sites/default.jpg":
                site.image.delete()
            serializer.save()
            save_schedule(self, site, request.data["schedules"])
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        try:
            site = Site.objects.get(pk=pk)
        except Site.DoesNotExist:
            return Response(
                {"detail": "Site Not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = SiteSerializer(site, data=request.data)
        if serializer.is_valid():
            serializer.save()
            save_schedule(self, site, request.data["schedules"])
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Delete(APIView):
    """
    Site delete
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    queryset = Site.objects.all()

    def delete(self, request, pk):
        try:
            site = Site.objects.get(pk=pk)
        except Site.DoesNotExist:
            return Response(
                {"detail": "Site Not found."}, status=status.HTTP_404_NOT_FOUND
            )
        if site.image.name != "sites/default.jpg":
            site.image.delete()
        site.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class List(generics.ListAPIView):
    """
    Site list
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()
