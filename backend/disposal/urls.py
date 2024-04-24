from django.urls import path

from .views import bottle as BottleView
from .views import challenge as ChallengeView
from .views import disposition as DispositionView
from .views import site as SiteView
from .views import statistics as StatisticsView

urlpatterns = [
    path("site/create", SiteView.Create.as_view(), name="site.create"),
    path("site/show/<int:pk>", SiteView.Retrieve.as_view(), name="site.show"),
    path("site/update/<int:pk>", SiteView.Update.as_view(), name="site.update"),
    path("site/delete/<int:pk>", SiteView.Delete.as_view(), name="site.delete"),
    path("site/list", SiteView.List.as_view(), name="site.list"),
    path("challenge/create", ChallengeView.Create.as_view(), name="challenge.create"),
    path(
        "challenge/show/<int:pk>",
        ChallengeView.Retrieve.as_view(),
        name="challenge.show",
    ),
    path(
        "challenge/update/<int:pk>",
        ChallengeView.Update.as_view(),
        name="challenge.update",
    ),
    path(
        "challenge/delete/<int:pk>",
        ChallengeView.Delete.as_view(),
        name="challenge.delete",
    ),
    path("challenge/list", ChallengeView.List.as_view(), name="challenge.list"),
    path("challenge/toggle", ChallengeView.toggle, name="challenge.toggle"),
    path("disposition/list", DispositionView.List.as_view(), name="disposition.list"),
    path(
        "disposition/create",
        DispositionView.Create.as_view(),
        name="disposition.create",
    ),
    path(
        "disposition/show/<int:pk>",
        DispositionView.Retrieve.as_view(),
        name="disposition.show",
    ),
    path(
        "disposition/update/<int:pk>",
        DispositionView.Update.as_view(),
        name="disposition.update",
    ),
    path(
        "disposition/delete/<int:pk>",
        DispositionView.Delete.as_view(),
        name="disposition.delete",
    ),
    path("bottle/create", BottleView.Create.as_view(), name="bottle.create"),
    path("bottle/retrieve", BottleView.Retrieve.as_view(), name="bottle.show"),
    path("bottle/update/<int:pk>", BottleView.Update.as_view(), name="bottle.update"),
    path("bottle/delete/<int:pk>", BottleView.Delete.as_view(), name="bottle.delete"),
    path("bottle/list", BottleView.List.as_view(), name="bottle.list"),
    path(
        "statistics/total_bottles_contributed", 
        StatisticsView.total_bottles_contributed, 
        name="statistics.total_bottles_contributed"
    ),
    path(
        "statistics/plastic_footprint_reduced", 
        StatisticsView.plastic_footprint_reduced, 
        name="statistics.plastic_footprint_reduced"
    ),
    path(
        "statistics/total_users", 
        StatisticsView.users, 
        name="statistics.total_users"
    ),
    path(
        "statistics/most_contributed_bottles_by_gender", 
        StatisticsView.most_contributed_bottles_by_gender, 
        name="statistics.most_contributed_bottles_by_gender"
    ),
    path(
        "statistics/top_5_sites", 
        StatisticsView.top_5_sites, 
        name="statistics.top_5_sites"
    ),
    path(
        "statistics/top_5_users", 
        StatisticsView.top_5_users, 
        name="statistics.top_5_users"
    ),
    path(
        "statistics/total_kilos_contributed", 
        StatisticsView.total_kilos_contributed, 
        name="statistics.total_kilos_contributed"
    ),
    path(
        "statistics/average_age", 
        StatisticsView.average_age, 
        name="statistics.average_age"
    ),
    path(
        "statistics/projected_bottles_contribution/<days>", 
        StatisticsView.projected_bottles_contribution, 
        name="statistics.projected_bottles_contribution"
    ),
]
