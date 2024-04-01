from django.urls import reverse
from accounts.models import User
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from disposal.models import Disposition, Site


class DispositionListTestCase(APITestCase):
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
            user=self.admin_user,
            operator=self.operator_user,
            site=self.site
        )

        self.disposition2 = Disposition.objects.create(
            bottles=2,
            weight=2.0,
            user=self.operator_user,
            operator=self.admin_user,
            site=self.site
        )

        self.url = reverse("disposition.list")

        return super().setUp()

    def test_list_dispositions(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_list_dispositions_unauthenticated(self):
        self.client.credentials()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_list_dispositions_operator(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.operator_token.key)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["bottles"], 1)
