from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Disposition, Site


class DispositionUpdateTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            gender="Masculino",
            email="user@example.com",
            password="userpassword",
            role="user",
            plastic_footprint=0.0,
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

        self.url = reverse("disposition.update", args=[self.disposition.id])

        return super().setUp()

    def test_update_disposition(self):
        data = {
            "bottles": 2,
            "weight": 2.0,
            "user": self.user.id,
            "operator": self.operator_user.id,
            "site": self.site.id,
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["bottles"], 2)
        self.assertEqual(response.data["weight"], 2.0)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["operator"], self.operator_user.id)
        self.assertEqual(response.data["site"], self.site.id)
        self.user.refresh_from_db()
        self.assertEqual(self.user.plastic_footprint,
                         data["bottles"] * data["weight"])

    def test_update_disposition_without_operator(self):
        self.client.credentials()
        data = {
            "bottles": 2,
            "weight": 2.0,
            "user": self.user.id,
            "operator": self.operator_user.id,
            "site": self.site.id,
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, 401)

    def test_update_disposition_with_user(self):
        user_token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + user_token.key)
        data = {
            "bottles": 2,
            "weight": 2.0,
            "user": self.user.id,
            "operator": self.operator_user.id,
            "site": self.site.id,
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, 403)
        self.user.refresh_from_db()
        self.assertEqual(self.user.plastic_footprint,
                         data["bottles"] * data["weight"])
