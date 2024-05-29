from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Disposition, Site


class DispositionRetrieveTestCase(APITestCase):
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
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.operator_token.key)

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

        self.url = reverse("disposition.show", args=[self.disposition.id])

        return super().setUp()

    def test_retrieve_disposition(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["bottles"], 1)
        self.assertEqual(response.data["weight"], 1.0)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["operator"], self.operator_user.id)
        self.assertEqual(response.data["site"], self.site.id)

    def test_retrieve_disposition_unauthenticated(self):
        self.client.credentials()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.data["detail"], "Authentication credentials were not provided."
        )

    def test_retrieve_disposition_as_user(self):
        user_token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + user_token.key)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["bottles"], 1)
        self.assertEqual(response.data["weight"], 1.0)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["operator"], self.operator_user.id)
        self.assertEqual(response.data["site"], self.site.id)

    def test_retrieve_disposition_as_another_user(self):
        another_user = User.objects.create(
            name="another",
            last_name="user",
            birth_date="1990-01-01",
            location="Medellín, Antioquia",
            gender="Masculino",
            email="another@example.com",
            password="anotherpassword",
            role="user",
        )
        another_user.set_password("anotherpassword")
        another_user.save()
        another_user_token = Token.objects.create(user=another_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + another_user_token.key)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            response.data["detail"],
            "You do not have permission to perform this action.",
        )
