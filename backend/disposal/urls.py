from django.urls import path

from .views import site as SiteView
from .views import challenge as ChallengeView

urlpatterns = [
    path("site/create", SiteView.Create.as_view(), name="site.create"),
    path("site/show/<int:pk>", SiteView.Retreive.as_view(), name="site.show"),
    path("site/update/<int:pk>", SiteView.Update.as_view(), name="site.update"),
    path("site/delete/<int:pk>", SiteView.Delete.as_view(), name="site.delete"),
    path("site/list", SiteView.List.as_view(), name="site.list"),
    path("challenge/create", ChallengeView.Create.as_view(), name="challenge.create"),
    path("challenge/show/<int:pk>", ChallengeView.Retreive.as_view(), name="challenge.show"),
    path("challenge/update/<int:pk>", ChallengeView.Update.as_view(), name="challenge.update"),
    path("challenge/delete/<int:pk>", ChallengeView.Delete.as_view(), name="challenge.delete"),
    path("challenge/list", ChallengeView.List.as_view(), name="challenge.list"),

]
