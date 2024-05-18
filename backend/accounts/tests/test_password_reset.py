from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class PasswordResetTestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create(
            name="admin",
            last_name="admin",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="admin@example.com",
            password="adminpassword",
            role="admin",
        )
        self.admin_user.set_password("adminpassword")
        self.admin_user.save()
        self.user = User.objects.create(
            name="user",
            last_name="user",
            birth_date="1990-01-01",
            location="location",
            gender="Masculino",
            email="user@email.com",
            password="userpassword",
        )
        self.user.set_password("userpassword")
        self.user.save()
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.url = reverse("user.reset_password", args=[self.user.id])

        return super().setUp()

    def test_password_reset_success(self):
        data = {
            "new_password": "newpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertEqual(response.json()["id"], self.user.id)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("newpassword"))

    def test_password_reset_invalid_data(self):
        data = {
            "old_password": "userpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)

    def test_password_reset_unauthorized(self):
        self.client.credentials()
        data = {
            "new_password": "newpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
        self.assertEqual(
            response.json()["detail"], "Authentication credentials were not provided.")
