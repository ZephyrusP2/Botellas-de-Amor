from django.urls import reverse
from accounts.models import User
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from disposal.models import Disposition, Site
from disposal.views.disposition import carbon_footprint


class DispositionDeleteTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            gender="Masculino",
            email="user@example.com",
            password="userpassword",
            role="user",
            carbon_footprint=carbon_footprint
        )
        self.user.set_password("userpassword")
        self.user.save()

        self.operator_user = User.objects.create(
            name="operator",
            last_name="operator",
            birth_date="1990-01-01",
            gender="Masculino",
            email="operator@example.com",
            password="operatorpassword",
            role="operator",
        )
        self.operator_user.set_password("operatorpassword")
        self.operator_user.save()
        self.operator_token = Token.objects.create(user=self.operator_user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.operator_token.key)

        self.site = Site.objects.create(
            image="path/to/image",
            opens="10:00:00",
            closes="17:00:00",
            name="Universidad EAFIT",
            address="Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
        )

        self.disposition = Disposition.objects.create(
            bottles=1,
            weight=1.0,
            user=self.user,
            operator=self.operator_user,
            site=self.site,
        )

        self.url = reverse("disposition.delete", args=[self.disposition.id])

        return super().setUp()

    def test_delete_disposition(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Disposition.objects.filter(
            id=self.disposition.id).exists())
        self.user.refresh_from_db()
        self.assertEqual(self.user.carbon_footprint, 0.0)

    def test_delete_disposition_not_found(self):
        url = reverse("disposition.delete", args=[self.disposition.id + 1])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)
        self.assertTrue(Disposition.objects.filter(
            id=self.disposition.id).exists())
        self.assertEqual(self.user.carbon_footprint, carbon_footprint)
