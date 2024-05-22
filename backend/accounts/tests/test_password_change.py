from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class PasswordChangeTestCase(APITestCase):
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
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.url = reverse("user.change_password", args=[self.admin_user.id])

        return super().setUp()

    def test_password_change_success(self):
        data = {
            "old_password": "adminpassword",
            "new_password": "newpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertEqual(response.json()["id"], self.admin_user.id)
        self.admin_user.refresh_from_db()
        self.assertTrue(self.admin_user.check_password("newpassword"))

    def test_password_change_invalid_data(self):
        data = {
            "old_password": "adminpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)

    def test_password_change_unauthorized(self):
        self.client.credentials()
        data = {
            "old_password": "adminpassword",
            "new_password": "newpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
        self.assertEqual(
            response.json()["detail"], "Authentication credentials were not provided."
        )
