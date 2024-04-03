from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Bottle


class BottleRetrieveTestCase(APITestCase):
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

    def test_bottle_retrieve_success(self):
        response = self.client.get(reverse("bottle.show", args=[self.bottle.id]))
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("experience", response.json())
        self.assertIn("level", response.json())
        self.assertIn("user", response.json())

    def test_bottle_retrieve_unauthorized(self):
        self.client.credentials()
        response = self.client.get(reverse("bottle.show", args=[self.bottle.id]))
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_bottle_retrieve_not_found(self):
        response = self.client.get(reverse("bottle.show", args=[1000]))
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
