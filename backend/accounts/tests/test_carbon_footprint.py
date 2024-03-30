from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User


class CarbonFootprintTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="user@gmail.com",
            password="userpassword",
            role="user",
        )
        self.user.set_password("userpassword")
        self.user.save()
        self.token = Token.objects.create(user=self.user)
        self.url = reverse("user.carbon-footprint")

        return super().setUp()

    def test_carbon_footprint_success(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("carbon_footprint", response.json())
        self.assertEqual(response.json()["carbon_footprint"], 0)

    def test_carbon_footprint_success_2(self):
        self.user.carbon_footprint = 10
        self.user.save()
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("carbon_footprint", response.json())
        self.assertEqual(response.json()["carbon_footprint"], 10)

    def test_carbon_footprint_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
