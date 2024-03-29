from django.urls import path

from .views import UserView

urlpatterns = [
    path("user/register", UserView.register, name="user.register"),
    path("user/login", UserView.login, name="user.login"),
    path(
        "user/<int:pk>",
        UserView.UserRetrieveUpdateDestroy.as_view(),
        name="user.detail",
    ),
    path("user/all", UserView.UserList.as_view(), name="user.list"),
    path("admin/login", UserView.admin_login, name="admin.login"),
    path("user/carbon-footprint", UserView.get_carbon_footprint,
         name="user.carbon-footprint"),
]
