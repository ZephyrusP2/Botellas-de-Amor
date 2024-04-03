from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Challenge


class ChallengeListTestCase(APITestCase):
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

        self.challenge_1 = Challenge.objects.create(
            challenge="challenge 1",
            experience=10,
        )
        self.challenge_2 = Challenge.objects.create(
            challenge="challenge 2",
            experience=20,
        )
        self.challenge_3 = Challenge.objects.create(
            challenge="challenge 3",
            experience=30,
        )

        return super().setUp()

    def test_challenge_list_success(self):
        response = self.client.get(reverse("challenge.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        self.assertIn("id", response.json()[0])
        self.assertIn("challenge", response.json()[0])
        self.assertIn("experience", response.json()[0])

    def test_challenge_list_unauthorized(self):
        self.client.credentials()
        response = self.client.get(reverse("challenge.list"))
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_challenge_list_empty(self):
        Challenge.objects.all().delete()
        response = self.client.get(reverse("challenge.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
        self.assertEqual(response.json(), [])
