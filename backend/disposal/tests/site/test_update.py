from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Site, Schedule

import os
from django.core.files.uploadedfile import SimpleUploadedFile
import datetime


class SiteUpdateTestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create(
            name="admin",
            last_name="admin",
            birth_date="1990-01-01",
            gender="Masculino",
            email="admin@example.com",
            password="adminpassword",
            role="admin",
        )
        self.admin_user.set_password("adminpassword")
        self.admin_user.save()
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        image_path = os.path.join(os.path.dirname(__file__), "default.jpg")
        image = open(image_path, "rb")
        file_data = SimpleUploadedFile(
            "test_update.jpg", image.read(), content_type="image/jpeg")
        image.close()
        self.site = Site.objects.create(
            image=file_data,
            name="Universidad EAFIT",
            address="Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        )
        self.schedule = Schedule.objects.create(
            site=self.site,
            day="Lunes",
            opens="10:00:00",
            closes="17:00:00",
        )

        self.data = {
            "image": file_data,
            "name": "Universidad EAFIT",
            "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        }

        schedules = [
            {"id": self.schedule.id, "day": "Lunes",
                "opens": "10:00:00", "closes": "18:00:00"},
        ]

        self.data["schedules"] = str(schedules)

        return super().setUp()

    def test_site_update_success(self):
        response = self.client.put(
            reverse("site.update", args=[self.site.id]),
            self.data,
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("name", response.json())
        self.assertIn("address", response.json())
        self.assertIn("image", response.json())
        self.schedule.refresh_from_db()
        self.assertEqual(self.schedule.opens, datetime.time(10, 0))
        self.assertEqual(self.schedule.closes, datetime.time(18, 0))
        self.site.image.delete()

    def test_site_update_unauthorized(self):
        self.client.credentials()
        response = self.client.put(
            reverse("site.update", args=[self.site.id]),
            self.data,
        )
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
        self.site.image.delete()

    def test_site_update_not_found(self):
        response = self.client.put(
            reverse("site.update", args=[1000]),
            self.data,
        )
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
        self.site.image.delete()

    def test_site_update_invalid_data(self):
        self.data.pop("address")
        response = self.client.put(
            reverse("site.update", args=[self.site.id]),
            self.data,
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("address", response.json())
        self.assertEqual(response.json()["address"], [
                         "This field is required."])
        self.site.image.delete()

    def test_site_update_no_image(self):
        self.data.pop("image")
        response = self.client.patch(
            reverse("site.update", args=[self.site.id]),
            self.data,
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("name", response.json())
        self.assertIn("address", response.json())
        self.assertIn("image", response.json())
        self.site.image.delete()
