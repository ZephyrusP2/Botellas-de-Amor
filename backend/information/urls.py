from django.urls import path

from information.views import FactView, ProjectView

urlpatterns = [
    path("project/create", ProjectView.Create.as_view(), name="project.create"),
    path("project/show/<int:pk>", ProjectView.Retrieve.as_view(), name="project.show"),
    path(
        "project/update/<int:pk>", ProjectView.Update.as_view(), name="project.update"
    ),
    path(
        "project/delete/<int:pk>", ProjectView.Delete.as_view(), name="project.delete"
    ),
    path("project/list", ProjectView.List.as_view(), name="project.list"),
    path("fact/create", FactView.Create.as_view(), name="fact.create"),
    path("fact/show/<int:pk>", FactView.Retrieve.as_view(), name="fact.show"),
    path("fact/update/<int:pk>", FactView.Update.as_view(), name="fact.update"),
    path("fact/delete/<int:pk>", FactView.Delete.as_view(), name="fact.delete"),
    path("fact/list", FactView.List.as_view(), name="fact.list"),
]
