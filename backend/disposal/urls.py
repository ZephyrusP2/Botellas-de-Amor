from django.urls import path

from .views import site as SiteView

urlpatterns = [
    path("site/create", SiteView.Create.as_view(), name="site.create"),
]
