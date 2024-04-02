from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from accounts.models import User
from disposal.models import Bottle

class BottleDeleteTestCase(APITestCase):
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
    
    def test_bottle_delete_success(self):
        response = self.client.delete(
            reverse("bottle.delete", args=[self.bottle.id]))
        self.assertEqual(response.status_code, 204)

    def test_bottle_delete_unauthorized(self):
        self.client.credentials()
        response = self.client.delete(
            reverse("bottle.delete", args=[self.bottle.id]))
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_bottle_delete_not_found(self):
        response = self.client.delete(reverse("bottle.delete", args=[1000]))
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
