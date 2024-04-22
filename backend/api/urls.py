from django.urls import include, path

urlpatterns = [
    path("accounts/", include("accounts.urls")),
    path("disposal/", include("disposal.urls")),
    path("information/", include("information.urls")),
]
