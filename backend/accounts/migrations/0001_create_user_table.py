# Generated by Django 5.0.2 on 2024-03-05 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("role", models.CharField(default="user", max_length=50)),
                ("name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("birth_date", models.DateField()),
                ("gender", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("password", models.CharField(max_length=50)),
            ],
            options={
                "db_table": "users",
            },
        ),
    ]