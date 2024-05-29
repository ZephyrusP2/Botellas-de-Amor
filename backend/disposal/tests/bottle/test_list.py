from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Bottle


class BottleListTestCase(APITestCase):
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

        self.bottle_1 = Bottle.objects.create(
            experience=10,
            level=1,
            user_id=1,
        )
        self.bottle_2 = Bottle.objects.create(
            experience=20,
            level=2,
            user_id=2,
        )
        self.bottle_3 = Bottle.objects.create(
            experience=30,
            level=3,
            user_id=3,
        )

        return super().setUp()

    def test_bottle_list_success(self):
        response = self.client.get(reverse("bottle.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        self.assertIn("id", response.json()[0])
        self.assertIn("experience", response.json()[0])
        self.assertIn("level", response.json()[0])
        self.assertIn("user", response.json()[0])

    def test_bottle_list_unauthorized(self):
        self.client.credentials()
        response = self.client.get(reverse("bottle.list"))
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_bottle_list_empty(self):
        Bottle.objects.all().delete()
        response = self.client.get(reverse("bottle.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
        self.assertEqual(response.json(), [])
