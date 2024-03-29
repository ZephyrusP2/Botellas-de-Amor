from django.urls import path

from .views import site as SiteView

urlpatterns = [
    path("site/create", SiteView.Create.as_view(), name="site.create"),
    path("site/show/<int:pk>", SiteView.Retreive.as_view(), name="site.show"),
    path("site/update/<int:pk>", SiteView.Update.as_view(), name="site.update"),
    path("site/delete/<int:pk>", SiteView.Delete.as_view(), name="site.delete"),
]
