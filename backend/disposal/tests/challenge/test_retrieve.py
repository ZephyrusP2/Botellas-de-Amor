from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Challenge


class ChallengeRetrieveTestCase(APITestCase):
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
        self.challenge = Challenge.objects.create(
            challenge="challenge 1",
            experience=10,
        )

        return super().setUp()

    def test_challenge_retrieve_success(self):
        response = self.client.get(reverse("challenge.show", args=[self.challenge.id]))
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("challenge", response.json())
        self.assertIn("experience", response.json())

    def test_challenge_retrieve_unauthorized(self):
        self.client.credentials()
        response = self.client.get(reverse("challenge.show", args=[self.challenge.id]))
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_challenge_retrieve_not_found(self):
        response = self.client.get(reverse("challenge.show", args=[1000]))
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
