from django.urls import path

import information.views as ProjectView

urlpatterns = [
    path("project/create", ProjectView.Create.as_view(), name="project.create"),
    path("project/show/<int:pk>",
         ProjectView.Retrieve.as_view(), name="project.show"),
    path("project/update/<int:pk>",
         ProjectView.Update.as_view(), name="project.update"),
    path("project/delete/<int:pk>",
         ProjectView.Delete.as_view(), name="project.delete"),
    path("project/list", ProjectView.List.as_view(), name="project.list"),
]
