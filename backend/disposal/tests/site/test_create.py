from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
import os

from accounts.models import User
from disposal.models import Site, Schedule


class SiteCreateTestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create(
            name="admin",
            last_name="admin",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="admin@example.com",
            password="adminpassword",
            role="admin",
        )
        self.admin_user.set_password("adminpassword")
        self.admin_user.save()
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.url = reverse("site.create")

        image_path = os.path.join(os.path.dirname(__file__), "default.jpg")
        image = open(image_path, "rb")
        file_data = SimpleUploadedFile(
            "default.jpg", image.read(), content_type="image/jpeg")

        self.data = {
            "image": file_data,
            "name": "Universidad EAFIT",
            "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        }

        schedules = [
            {"day": "Lunes", "opens": "10:00:00", "closes": "17:00:00"},
            {"day": "Martes", "opens": "10:00:00", "closes": "17:00:00"},
            {"day": "Miércoles", "opens": "10:00:00", "closes": "17:00:00"},
            {"day": "Jueves", "opens": "10:00:00", "closes": "17:00:00"},
            {"day": "Viernes", "opens": "10:00:00", "closes": "17:00:00"},
            {"day": "Sábado", "opens": "10:00:00", "closes": "17:00:00"},
            {"day": "Domingo", "opens": "10:00:00", "closes": "17:00:00"},
        ]

        self.data["schedules"] = str(schedules)

        return super().setUp()

    def test_site_create_success(self):
        response = self.client.post(
            self.url, self.data, format="multipart")
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json())
        self.assertIn("image", response.json())
        self.assertIn("name", response.json())
        self.assertIn("address", response.json())
        site = Site.objects.get(name="Universidad EAFIT")
        schedules_count = Schedule.objects.filter(site=site).count()
        self.assertEqual(schedules_count, 7)
        site.image.delete()

    def test_site_create_invalid_data(self):
        self.data.pop("address")
        response = self.client.post(self.url, self.data, format="multipart")
        self.assertEqual(response.status_code, 400)
        self.assertIn("address", response.json())
        self.assertEqual(response.json()["address"], [
                         "This field is required."])

    def test_site_create_unauthorized(self):
        self.client.credentials()
        response = self.client.post(self.url, self.data, format="multipart")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
