from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Site


class SiteDeleteTestCase(APITestCase):
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
        self.site = Site.objects.create(
            image="path/to/image",
            opens="10:00:00",
            closes="17:00:00",
            name="Universidad EAFIT",
            address="Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        )

        return super().setUp()

    def test_site_delete_success(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(
            reverse("site.delete", args=[self.site.id]))
        self.assertEqual(response.status_code, 204)

    def test_site_delete_unauthorized(self):
        response = self.client.delete(
            reverse("site.delete", args=[self.site.id]))
        self.assertEqual(response.status_code, 403)
        self.assertIn("detail", response.json())

    def test_site_delete_not_found(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(reverse("site.delete", args=[1000]))
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())