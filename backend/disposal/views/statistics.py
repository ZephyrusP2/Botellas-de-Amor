from django.http import JsonResponse
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (
    api_view, authentication_classes, permission_classes)
from rest_framework import status

from accounts.models import User
from backend.permissions import IsAdminOrOperator, IsAdminOrOperatorOrSelf
from disposal.models import Disposition
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from dateutil.relativedelta import relativedelta
from datetime import date
from django.utils import timezone


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def total_bottles_contributed(request):
    total_bottles = Disposition.objects.aggregate(
        total_bottles_contributed=Sum('bottles'))['total_bottles_contributed'] or 0
    return JsonResponse({'total_bottles': total_bottles})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def plastic_footprint_reduced(request):
    total_users = User.objects.count()
    plastic_footprint = User.objects.aggregate(total_plastic_footprint=Sum(
        'plastic_footprint'))['total_plastic_footprint'] or 0
    plastic_footprint_average = plastic_footprint / total_users
    return JsonResponse({'plastic_footprint_average': plastic_footprint_average})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def users(request):
    total_users = User.objects.count()
    return JsonResponse({'total_users': total_users})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def most_contributed_bottles_by_gender(request):
    women = 0
    men = 0

    users = User.objects.all()

    for user in users:
        dispositions = Disposition.objects.filter(user=user)
        gender = user.gender
        if gender:
            if gender.lower() == 'femenino':
                women += dispositions.aggregate(total_bottles_by_women=Sum('bottles'))[
                    'total_bottles_by_women'] or 0
            elif gender.lower() == 'masculino':
                men += dispositions.aggregate(total_bottles_by_men=Sum('bottles'))[
                    'total_bottles_by_men'] or 0

    response = [{"women": women, "men": men}]
    return JsonResponse(response, safe=False)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def top_5_sites(request):
    dispositions = Disposition.objects.all()
    total_bottles = {}
    for disposition in dispositions:
        if disposition.site in total_bottles:
            total_bottles[disposition.site] += disposition.bottles
        else:
            total_bottles[disposition.site] = disposition.bottles

    sorted_sites = sorted(total_bottles.items(),
                          key=lambda x: x[1], reverse=True)
    top_5_sites = sorted_sites[:5]
    response = []
    for site, bottles in top_5_sites:
        response.append({'site': site.name, 'bottles': bottles})

    return JsonResponse(response, safe=False)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def top_5_users(request):
    dispositions = Disposition.objects.all()
    total_bottles = {}
    for disposition in dispositions:
        if disposition.user in total_bottles:
            total_bottles[disposition.user] += disposition.bottles
        else:
            total_bottles[disposition.user] = disposition.bottles

    sorted_users = sorted(total_bottles.items(),
                          key=lambda x: x[1], reverse=True)
    top_5_users = sorted_users[:5]
    response = []
    for user, bottles in top_5_users:
        response.append({'user': user.get_full_name(), 'bottles': bottles})

    return JsonResponse(response, safe=False)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def total_kilos_contributed(request):
    total_kilos = Disposition.objects.aggregate(total_kilos_contributed=Sum('weight'))[
        'total_kilos_contributed'] or 0
    return JsonResponse({'total_kilos': total_kilos}, safe=False)


def get_age(birth_date):
    actual_date = date.today()
    age = actual_date.year - birth_date.year - \
        ((actual_date.month, actual_date.day) < (birth_date.month, birth_date.day))
    return age


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def average_age(request):
    birth_dates = User.objects.filter(birth_date=request.user.birth_date)
    user_ages = [get_age(user.birth_date) for user in birth_dates]

    if user_ages:
        average_age = sum(user_ages) / len(user_ages)
    else:
        average_age = None

    return JsonResponse({'average_age': average_age}, safe=False)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def projected_bottles_contribution(request, months):
    months = int(months)
    end_date = timezone.now()
    start_date = end_date - relativedelta(months=months)

    dispositions = (
        Disposition.objects
        .filter(created_at__range=(start_date, end_date))
        .annotate(created_month=TruncMonth('created_at'))
        .values('user_id', 'created_month')
        .annotate(total_bottles=Sum('bottles'))
    )

    if dispositions.exists():
        current_month = end_date.replace(day=1)
        projected_month = current_month + relativedelta(months=1)

        total_bottles_current_month = (
            dispositions
            .filter(created_month=TruncMonth('created_at'))
            .aggregate(bottles_sum=Sum('bottles'))
        ).get('bottles_sum', 0)

        projected_bottles = total_bottles_current_month * \
            (projected_month.month / current_month.month)

        return JsonResponse({'projected_bottles': projected_bottles}, safe=False)
    else:
        return JsonResponse({'error': 'No data available for the specified time range'}, status=status.HTTP_404_NOT_FOUND)
