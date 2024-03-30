from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Fact

class FactUpdateTestCase(APITestCase):
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
        self.fact = Fact.objects.create(
            message="Reciclar ayuda al medio ambiente",
        )

        return super().setUp()
    
    def test_fact_update_success(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.put(reverse("fact.update", args=[self.fact.id]), {
            "message": "Reciclar ayuda al medio ambiente",
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("message", response.json())

    def test_fact_update_unauthorized(self):
        response = self.client.put(reverse("fact.update", args=[self.fact.id]), {
            "message": "Reciclar ayuda al medio ambiente",
        })
        self.assertEqual(response.status_code, 403)
        self.assertIn("detail", response.json())

    def test_fact_update_not_found(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.put(reverse("fact.update", args=[self.fact.id + 1]), {
            "message": "Reciclar ayuda al medio ambiente",
        })
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())

    def test_fact_update_invalid_data(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.put(reverse("fact.update", args=[self.fact.id]), {
            "message": "",
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], [
            "This field may not be blank."
        ])