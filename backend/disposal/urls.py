from django.urls import path

from .views import site as SiteView
from .views import challenge as ChallengeView
from .views import disposition as DispositionView
from .views import bottle as BottleView

urlpatterns = [
    path("site/create", SiteView.Create.as_view(), name="site.create"),
    path("site/show/<int:pk>", SiteView.Retrieve.as_view(), name="site.show"),
    path("site/update/<int:pk>", SiteView.Update.as_view(), name="site.update"),
    path("site/delete/<int:pk>", SiteView.Delete.as_view(), name="site.delete"),
    path("site/list", SiteView.List.as_view(), name="site.list"),

    path("challenge/create", ChallengeView.Create.as_view(),
         name="challenge.create"),
    path("challenge/show/<int:pk>",
         ChallengeView.Retrieve.as_view(), name="challenge.show"),
    path("challenge/update/<int:pk>",
         ChallengeView.Update.as_view(), name="challenge.update"),
    path("challenge/delete/<int:pk>",
         ChallengeView.Delete.as_view(), name="challenge.delete"),
    path("challenge/list", ChallengeView.List.as_view(), name="challenge.list"),
    path("challenge/toggle", ChallengeView.toggle, name="challenge.toggle"),

    path("disposition/list", DispositionView.List.as_view(),
         name="disposition.list"),
    path("disposition/create", DispositionView.Create.as_view(),
         name="disposition.create"),
    path("disposition/show/<int:pk>",
         DispositionView.Retrieve.as_view(), name="disposition.show"),
    path("disposition/update/<int:pk>", DispositionView.Update.as_view(),
         name="disposition.update"),
    path("disposition/delete/<int:pk>", DispositionView.Delete.as_view(),
         name="disposition.delete"),

    path("bottle/create", BottleView.Create.as_view(), name="bottle.create"),
    path("bottle/retrieve", BottleView.Retrieve.as_view(), name="bottle.show"),
    path("bottle/update/<int:pk>",
         BottleView.Update.as_view(), name="bottle.update"),
    path("bottle/delete/<int:pk>",
         BottleView.Delete.as_view(), name="bottle.delete"),
    path("bottle/list", BottleView.List.as_view(), name="bottle.list"),

]
