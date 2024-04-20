from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class OperatorLoginTestCase(APITestCase):
    def setUp(self):
        self.operator_user = User.objects.create(
            name="operator",
            last_name="operator",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="operator@gmail.com",
            password="operatorpassword",
            role="operator",
        )
        self.operator_user.set_password("operatorpassword")
        self.operator_user.save()
        self.token = Token.objects.create(user=self.operator_user)
        self.url = reverse("admin.login")

        return super().setUp()

    def test_operator_login_success(self):
        data = {"email": "operator@gmail.com", "password": "operatorpassword"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        self.assertEqual(response.json()["role"], "operator")

    def test_operator_login_invalid_credentials(self):
        data = {"email": "operator@gmail.com", "password": "wrongpassword"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())

    def test_operator_login_non_operator_user(self):
        non_operator_user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="user@example.com",
            password="userpassword",
            role="user",
        )
        non_operator_user.set_password("userpassword")
        non_operator_user.save()
        self.token = Token.objects.create(user=non_operator_user)
        data = {"email": "user@example.com", "password": "userpassword"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
