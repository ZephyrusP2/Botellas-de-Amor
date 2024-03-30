from django.urls import path

import accounts.views as UserView

urlpatterns = [
    path("user/register", UserView.register, name="user.register"),
    path("user/login", UserView.login, name="user.login"),
    path("user/data", UserView.UserData.as_view(), name="user.data"),
    path("user/all", UserView.UserList.as_view(), name="user.list"),
    path("admin/login", UserView.admin_login, name="admin.login"),
]
