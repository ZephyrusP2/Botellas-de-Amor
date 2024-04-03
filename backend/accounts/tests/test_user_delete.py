from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class UserDeleteTestCase(APITestCase):
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
            email="user@example.com",
            password="userpassword",
            role="user",
        )
        self.user.set_password("userpassword")
        self.user.save()
        self.token = Token.objects.create(user=self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.url = reverse("user.delete", args=[self.user.id])

        return super().setUp()

    def test_user_delete_success_as_admin(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(User.objects.filter(id=self.user.id).exists())

    def test_user_delete_success_as_user(self):
        self.client.credentials()
        token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(User.objects.filter(id=self.user.id).exists())

    def test_user_delete_unauthorized(self):
        self.client.credentials()
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 401)

    def test_user_delete_not_found(self):
        url = reverse("user.delete", args=[1000])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
        self.assertEqual(
            response.json()["detail"], "No User matches the given query.")
