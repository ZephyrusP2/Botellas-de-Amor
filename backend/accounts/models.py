from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.db import models

# Create your models here.


class User(AbstractBaseUser):
    """
    Custom user model
    """

    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=50, default="user")
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()
    gender = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    plastic_footprint = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"

    objects = UserManager()

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.name + " " + self.last_name
