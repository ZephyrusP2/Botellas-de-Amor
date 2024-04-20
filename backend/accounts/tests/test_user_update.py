from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class UserUpdateTestCase(APITestCase):
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
        self.url = reverse("user.update", args=[self.admin_user.id])

        return super().setUp()

    def test_user_update_success(self):
        data = {
            "name": "admin",
            "last_name": "admin",
            "birth_date": "1990-01-01",
            "location": "location",
            "gender": "Masculino",
            "email": "admin1@example.com",
        }
        response = self.client.put(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertEqual(response.json()["email"], "admin1@example.com")

    def test_user_update_invalid_data(self):
        data = {
            "name": "admin",
            "last_name": "admin",
            "birth_date": "1990-01-01",
            "location": "location",
            "gender": "Masculino",
        }
        response = self.client.put(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json())
        self.assertEqual(response.json()["email"], ["This field is required."])

    def test_user_update_unauthorized(self):
        self.client.credentials()
        data = {
            "name": "admin",
            "last_name": "admin",
            "birth_date": "1990-01-01",
            "location": "location",
            "gender": "Masculino",
            "email": "admin1@example.com",
        }
        response = self.client.put(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)

    def test_user_update_not_found(self):
        url = reverse("user.update", args=[1000])
        data = {
            "name": "admin",
            "last_name": "admin",
            "birth_date": "1990-01-01",
            "location": "location",
            "gender": "Masculino",
            "email": "admin1@example.com",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
        self.assertEqual(response.json()["detail"], "No User matches the given query.")
