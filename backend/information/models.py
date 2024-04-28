from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


def upload_to_projects(instance, filename):
    return f"projects/{filename}".format(filename)


class Project(models.Model):
    """
    Project model
    """

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(
        _("Image"), upload_to=upload_to_projects, default="projects/default.jpg")
    location = models.CharField(max_length=50)
    description = models.TextField()
    goal_tons = models.CharField(max_length=50)
    total_tons = models.CharField(max_length=50)
    organizations = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    class Meta:
        db_table = "projects"

    def __str__(self):
        return self.name


class Fact(models.Model):
    """
    Fact model
    """

    id = models.AutoField(primary_key=True)
    message = models.TextField()

    class Meta:
        db_table = "facts"

    def __str__(self):
        return self.id
