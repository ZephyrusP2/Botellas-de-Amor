from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class UserDataTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="user@gmail.com",
            password="userpassword",
        )
        self.user.set_password("userpassword")
        self.user.save()
        self.token = Token.objects.create(user=self.user)
        self.url = reverse("user.data")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        return super().setUp()

    def test_user_data_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("name", response.json())
        self.assertIn("last_name", response.json())
        self.assertIn("birth_date", response.json())
        self.assertIn("location", response.json())

    def test_user_data_unauthorized(self):
        self.client.credentials()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
        self.assertEqual(
            response.json()["detail"], "Authentication credentials were not provided.")

    def test_user_data_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token invalidtoken")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
        self.assertEqual(response.json()["detail"], "Invalid token.")
