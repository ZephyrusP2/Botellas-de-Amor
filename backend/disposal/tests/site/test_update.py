from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Site


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
        self.site = Site.objects.create(
            image="path/to/image",
            opens="10:00:00",
            closes="17:00:00",
            name="Universidad EAFIT",
            address="Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        )

        return super().setUp()

    def test_site_update_success(self):
        response = self.client.put(
            reverse("site.update", args=[self.site.id]),
            {
                "image": "path/to/image",
                "opens": "10:00:00",
                "closes": "17:00:00",
                "name": "Universidad EAFIT",
                "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("name", response.json())
        self.assertIn("address", response.json())
        self.assertIn("opens", response.json())
        self.assertIn("closes", response.json())
        self.assertIn("image", response.json())

    def test_site_update_unauthorized(self):
        self.client.credentials()
        response = self.client.put(
            reverse("site.update", args=[self.site.id]),
            {
                "image": "path/to/image",
                "opens": "10:00:00",
                "closes": "17:00:00",
                "name": "Universidad EAFIT",
                "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
            },
        )
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_site_update_not_found(self):
        response = self.client.put(
            reverse("site.update", args=[1000]),
            {
                "image": "path/to/image",
                "opens": "10:00:00",
                "closes": "17:00:00",
                "name": "Universidad EAFIT",
                "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
            },
        )
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())

    def test_site_update_invalid_data(self):
        response = self.client.put(
            reverse("site.update", args=[self.site.id]),
            {
                "image": "path/to/image",
                "opens": "10:00:00",
                "closes": "17:00:00",
                "name": "Universidad EAFIT",
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("address", response.json())
        self.assertEqual(response.json()["address"], ["This field is required."])
