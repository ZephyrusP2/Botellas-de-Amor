from django.urls import path
from .views import UserView, UserRetrieveUpdateDestroy, UserList

urlpatterns = [
    path('user/signup', UserView.signup, name='user.signup'),
    path('user/login', UserView.login, name='user.login'),
    path('user/<int:pk>', UserRetrieveUpdateDestroy.as_view(), name='user.detail'),
    path('user/all', UserList.as_view(), name='user.list'),
]
