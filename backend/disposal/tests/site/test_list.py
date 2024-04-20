from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Site


class SiteListTestCase(APITestCase):
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
        self.site_1 = Site.objects.create(
            image="path/to/image",
            opens="10:00:00",
            closes="17:00:00",
            name="Universidad EAFIT",
            address="Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        )
        self.site_2 = Site.objects.create(
            image="path/to/image",
            opens="10:00:00",
            closes="17:00:00",
            name="Universidad de Antioquia",
            address="Calle 67 #53-108, Medellín, Antioquia",
        )
        self.site_3 = Site.objects.create(
            image="path/to/image",
            opens="10:00:00",
            closes="17:00:00",
            name="Universidad Nacional",
            address="Cra. 80 #65-223, Medellín, Antioquia",
        )

        return super().setUp()

    def test_site_list_success(self):
        response = self.client.get(reverse("site.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        self.assertIn("id", response.json()[0])
        self.assertIn("name", response.json()[0])
        self.assertIn("address", response.json()[0])
        self.assertIn("opens", response.json()[0])
        self.assertIn("closes", response.json()[0])
        self.assertIn("image", response.json()[0])

    def test_site_list_unauthorized(self):
        self.client.credentials()
        response = self.client.get(reverse("site.list"))
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_site_list_empty(self):
        Site.objects.all().delete()
        response = self.client.get(reverse("site.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
        self.assertEqual(response.json(), [])
