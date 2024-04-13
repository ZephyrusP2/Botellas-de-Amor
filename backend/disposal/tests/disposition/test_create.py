from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Disposition, Site


class DispositionCreateTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            gender="Masculino",
            email="user@example.com",
            password="userpassword",
            role="user",
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

        self.url = reverse("disposition.create")

        return super().setUp()

    def test_disposition_create_success(self):
        data = {
            "site": self.site.id,
            "bottles": 1,
            "weight": 1.0,
            "user": self.user.id,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Disposition.objects.count(), 1)
        self.user.refresh_from_db()
        self.assertEqual(self.user.plastic_footprint,
                         data["bottles"] * data["weight"])

    def test_disposition_create_unauthorized(self):
        self.client.credentials()
        data = {
            "site": self.site.id,
            "bottles": 1,
            "weight": 1.0,
            "user": self.user.id,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertEqual(Disposition.objects.count(), 0)

    def test_disposition_create_invalid_data(self):
        data = {
            "site": self.site.id,
            "bottles": 1,
            "weight": 1.0,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Disposition.objects.count(), 0)
        self.assertIn("This field is required.", response.json()["user"])
