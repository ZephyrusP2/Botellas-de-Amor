from django.urls import path
from .views import UserView

urlpatterns = [
    path('user/signup', UserView.signup, name='user.signup'),
    path('user/login', UserView.login, name='user.login'),
    path('user/<int:pk>', UserView.UserRetrieveUpdateDestroy.as_view(),
         name='user.detail'),
    path('user/all', UserView.UserList.as_view(), name='user.list'),
]
