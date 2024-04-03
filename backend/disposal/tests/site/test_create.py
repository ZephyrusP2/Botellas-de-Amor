from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User


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

        return super().setUp()

    def test_site_create_success(self):
        data = {
            "image": "path/to/image",
            "opens": "10:00:00",
            "closes": "17:00:00",
            "name": "Universidad EAFIT",
            "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json())

    def test_site_create_invalid_data(self):
        data = {
            "image": "path/to/image",
            "opens": "10:00:00",
            "closes": "17:00:00",
            "name": "Universidad EAFIT",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("address", response.json())
        self.assertEqual(response.json()["address"], ["This field is required."])

    def test_site_create_unauthorized(self):
        self.client.credentials()
        data = {
            "image": "path/to/image",
            "opens": "10:00:00",
            "closes": "17:00:00",
            "name": "Universidad EAFIT",
            "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
