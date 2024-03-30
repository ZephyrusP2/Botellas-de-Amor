from django.urls import reverse
from accounts.models import User
from rest_framework.test import APITestCase
from disposal.models import Fact

class FactListTestCase(APITestCase):
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
        self.fact_1 = Fact.objects.create(
            message="Reciclar ayuda al medio ambiente",
        )
        self.fact_2 = Fact.objects.create(
            message="Reciclar ayuda al planeta",
        )
        self.fact_3 = Fact.objects.create(
            message="Reciclar ayuda a la sociedad",
        )

        return super().setUp()
    
    def test_fact_list_success(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(reverse("fact.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        self.assertIn("id", response.json()[0])
        self.assertIn("message", response.json()[0])

    def test_fact_list_unauthorized(self):
        response = self.client.get(reverse("fact.list"))
        self.assertEqual(response.status_code, 403)
        self.assertIn("detail", response.json())

    def test_fact_list_empty(self):
        self.client.force_authenticate(user=self.admin_user)
        Fact.objects.all().delete()
        response = self.client.get(reverse("fact.list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
        self.assertEqual(response.json(), [])
