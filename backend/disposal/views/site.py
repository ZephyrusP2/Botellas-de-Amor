from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from disposal.models import Site, Schedule
from disposal.serializers import SiteSerializer


class Create(APIView):
    """
    Site create
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = SiteSerializer(data=request.data)
        if serializer.is_valid():
            site = serializer.save()
            save_schedule(self, site, request.data.getlist("schedules"))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def save_schedule(self, site, schedules):
    """
    Save schedule
    :param site: Site
    :param schedules: List
    """
    for schedule_str in schedules:
        schedule_dict = eval(schedule_str)
        if "id" in schedule_dict:
            Schedule.objects.filter(id=schedule_dict["id"]).update(
                day=schedule_dict["day"],
                opens=schedule_dict["opens"],
                closes=schedule_dict["closes"],
            )
        else:
            Schedule.objects.create(
                site=site,
                day=schedule_dict["day"],
                opens=schedule_dict["opens"],
                closes=schedule_dict["closes"],
            )


class Retrieve(generics.RetrieveAPIView):
    """
    Site retrieve
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()


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
            save_schedule(self, site, request.data.getlist("schedules"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

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
            save_schedule(self, site, request.data.getlist("schedules"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Delete(generics.DestroyAPIView):
    """
    Site delete
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    http_method_names = ["delete"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()


class List(generics.ListAPIView):
    """
    Site list
    """

    serializer_class = SiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOperator]

    http_method_names = ["get"]

    def get_queryset(self):
        """
        Get queryset
        :return: QuerySet
        """
        return Site.objects.all()
