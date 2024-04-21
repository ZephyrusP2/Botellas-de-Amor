from django.db import models

from accounts.models import User
from django.utils.translation import gettext_lazy as _

def upload_to_projects(instance, filename):
    return f"projects/{filename}".format(filename)


class Site(models.Model):
    """
    Site model
    """

    id = models.AutoField(primary_key=True)
    image = models.CharField(max_length=50)
    opens = models.TimeField()
    closes = models.TimeField()
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)

    class Meta:
        db_table = "sites"

    def __str__(self):
        return self.name


class Challenge(models.Model):
    """
    Challenge model
    """

    id = models.AutoField(primary_key=True)
    challenge = models.CharField(max_length=50)
    experience = models.IntegerField()

    class Meta:
        db_table = "challenges"

    def __str__(self):
        return self.challenge


class Disposition(models.Model):
    """
    Disposition model
    """

    id = models.AutoField(primary_key=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    bottles = models.IntegerField()
    weight = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    operator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="operator"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "dispositions"

    def __str__(self):
        return self.user


class Bottle(models.Model):
    """
    Bottle model
    """

    id = models.AutoField(primary_key=True)
    experience = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "bottles"

    def __str__(self):
        return self.user
    
class Project(models.Model):
    """
    Project model
    """

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(_("Image"), upload_to=upload_to_projects, default="projects/default.jpg")
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
