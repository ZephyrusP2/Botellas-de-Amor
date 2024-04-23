from django.http import JsonResponse
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (api_view, authentication_classes, 
                                       permission_classes)

from accounts.models import User
from backend.permissions import IsAdminOrOperator, IsAdminOrOperatorOrSelf
from disposal.models import Disposition
from disposal.serializers import DispositionSerializer
from django.db.models import Sum

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def total_bottles_contributed(request):
    total_bottles = Disposition.objects.filter(user=request.user).aggregate(Sum('bottles'))['total_bottles_contributed'] or 0
    return JsonResponse({'total_bottles': total_bottles}, safe=False)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def plastic_footprint_reduced(request):
    total_users = User.objects.count()
    plastic_footprint = User.objects.filter(user=request.user).aggregate(Sum('plastic_footprint'))['total_plastic_footprint'] or 0
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
    gender = Disposition.objects.filter(gender=request.user.gender)
    if gender == 'Femenino':
        women = Disposition.objects.filter(gender=gender).aggregate(Sum('bottles'))['total_bottles_by_women'] or 0
    elif gender == 'Masculino':
        men = Disposition.objects.filter(gender=gender).aggregate(Sum('bottles'))['total_bottles_by_men'] or 0
    
    response = []
    response.append({'women': women, 'men': men})
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

    sorted_sites = sorted(total_bottles.items(), key=lambda x: x[1], reverse=True)
    top_5_sites = sorted_sites[:5]
    response = []
    for site, bottles in top_5_sites:
        response.append({'site': site, 'bottles': bottles})

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

    sorted_users = sorted(total_bottles.items(), key=lambda x: x[1], reverse=True)
    top_5_users = sorted_users[:5]
    response = []
    for user, bottles in top_5_users:
        response.append({'user': user, 'bottles': bottles})

    return JsonResponse(response, safe=False)