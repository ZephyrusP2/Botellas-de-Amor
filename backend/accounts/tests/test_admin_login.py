from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class AdminLoginTestCase(APITestCase):
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
        self.url = reverse("admin.login")

        return super().setUp()

    def test_admin_login_success(self):
        data = {"email": "admin@example.com", "password": "adminpassword"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        self.assertEqual("role", "admin")

    def test_admin_login_invalid_credentials(self):
        self.url = reverse("admin.login")
        data = {"email": "admin@example.com", "password": "wrongpassword"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())

    def test_admin_login_non_admin_user(self):
        non_admin_user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            gender="Masculino",
            email="user@example.com",
            password="userpassword",
            role="user",
        )
        non_admin_user.set_password("userpassword")
        non_admin_user.save()
        self.token = Token.objects.create(user=non_admin_user)
        self.url = reverse("admin.login")
        data = {"email": "user@example.com", "password": "userpassword"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
