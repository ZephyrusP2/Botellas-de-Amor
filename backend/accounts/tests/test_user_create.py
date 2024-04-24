from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User

# Create your tests here.


class UserCreateTestCase(APITestCase):
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
        self.url = reverse("user.create")

        return super().setUp()

    def test_user_create_success(self):
        data = {
            "name": "user",
            "last_name": "user",
            "birth_date": "1990-01-01",
            "location": "location",
            "gender": "Masculino",
            "email": "user@gmail.com",
            "password": "userpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json())

    def test_user_create_invalid_data(self):
        data = {
            "name": "user",
            "last_name": "user",
            "birth_date": "1990-01-01",
            "location": "location",
            "password": "userpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json())
        self.assertEqual(response.json()["email"], ["This field is required."])

    def test_user_create_unauthorized(self):
        self.client.credentials()
        data = {
            "name": "user",
            "last_name": "user",
            "birth_date": "1990-01-01",
            "location": "location",
            "gender": "Masculino",
            "email": "user@gmail.com",
            "password": "userpassword",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_user_create_future_birth_date(self):
        data = {
            "name": "user",
            "last_name": "user",
            "birth_date": "2500-01-01",
            "location": "location",
            "gender": "Masculino",
            "email": "user@gmail.com",
            "password": "userpassword",
            "role": "user"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("birth_date", response.json())
        self.assertEqual(response.json()["birth_date"], [
                         "Birth date cannot be in the future"])
