from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User


class ChallengeCreateTestCase(APITestCase):
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
        self.url = reverse("challenge.create")

        return super().setUp()

    def test_challenge_create_success(self):
        data = {"challenge": "Reciclar 5 botellas de plástico", "experience": 100}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json())

    def test_challenge_create_invalid_data(self):
        data = {"challenge": "Reciclar 5 botellas de plástico"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("experience", response.json())
        self.assertEqual(response.json()["experience"], ["This field is required."])

    def test_challenge_create_unauthorized(self):
        self.client.credentials()
        data = {"challenge": "Reciclar 5 botellas de plástico", "experience": 100}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
