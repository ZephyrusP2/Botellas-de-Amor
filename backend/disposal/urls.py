from django.urls import path

from .views import site as SiteView
from .views import challenge as ChallengeView
from .views import fact as FactView

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
    path("fact/create", FactView.Create.as_view(), name="fact.create"),
    path("fact/show/<int:pk>", FactView.Retreive.as_view(), name="fact.show"),
    path("fact/update/<int:pk>", FactView.Update.as_view(), name="fact.update"),
    path("fact/delete/<int:pk>", FactView.Delete.as_view(), name="fact.delete"),
    path("fact/list", FactView.List.as_view(), name="fact.list"),

]
