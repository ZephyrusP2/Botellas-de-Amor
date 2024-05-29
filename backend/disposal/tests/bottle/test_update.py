from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Bottle


class BottleUpdateTestCase(APITestCase):
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
        self.bottle = Bottle.objects.create(
            experience=10,
            level=1,
            user_id=1,
        )

        return super().setUp()

    def test_bottle_update_success(self):
        response = self.client.put(
            reverse("bottle.update", args=[self.bottle.id]),
            {
                "experience": 10,
                "level": 1,
                "user": 1,
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("experience", response.json())
        self.assertIn("level", response.json())
        self.assertIn("user", response.json())

    def test_bottle_update_unauthorized(self):
        self.client.credentials()
        response = self.client.put(
            reverse("bottle.update", args=[self.bottle.id]),
            {
                "experience": 10,
                "level": 1,
                "user": 1,
            },
        )
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_bottle_update_not_found(self):
        response = self.client.put(
            reverse("bottle.update", args=[self.bottle.id + 1]),
            {
                "experience": 10,
                "level": 1,
                "user": 1,
            },
        )
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())

    def test_bottle_update_invalid_data(self):
        response = self.client.put(
            reverse("bottle.update", args=[self.bottle.id]),
            {
                "experience": 10,
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("level", response.json())
        self.assertEqual(response.json()["level"], ["This field is required."])
