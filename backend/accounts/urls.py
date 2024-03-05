from django.urls import path
from .views import UserView

urlpatterns = [
    path('user/signup', UserView.signup, name='user.signup'),
]
