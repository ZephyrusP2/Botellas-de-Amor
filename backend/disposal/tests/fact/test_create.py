from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User

class FactCreateTestCase(APITestCase):
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
        self.url = reverse("fact.create")

        return super().setUp()
    
    def test_fact_create_success(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {"message": "Reciclar ayuda al medio ambiente"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json())

    def test_fact_create_invalid_data(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {"message": ""}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], [
                         "This field may not be blank."])
        
    def test_fact_create_unauthorized(self):
        data = {"message": "Reciclar ayuda al medio ambiente"}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertIn("detail", response.json())