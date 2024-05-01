from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User


class ProjectCreateTestCase(APITestCase):
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
        self.url = reverse("project.create")

        return super().setUp()

    def test_project_create_success(self):
        data = {
            "name": "Proyecto de reciclaje",
            "image": "image.png",
            "location": "Calle 123",
            "description": "Proyecto de reciclaje de botellas de plástico",
            "goal_tons": "100",
            "total_tons": "0",
            "organizations": "Organización de reciclaje",
            "status": "En proceso",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response.json())

    def test_project_create_invalid_data(self):
        data = {
            "name": "Proyecto de reciclaje",
            "image": "image.png",
            "location": "Calle 123",
            "description": "Proyecto de reciclaje de botellas de plástico",
            "goal_tons": "100",
            "total_tons": "0",
            "organizations": "Organización de reciclaje",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("status", response.json())
        self.assertEqual(response.json()["status"], ["This field is required."])

    def test_project_create_unauthorized(self):
        self.client.credentials()
        data = {
            "name": "Proyecto de reciclaje",
            "image": "image.png",
            "location": "Calle 123",
            "description": "Proyecto de reciclaje de botellas de plástico",
            "goal_tons": "100",
            "total_tons": "0",
            "organizations": "Organización de reciclaje",
            "status": "En proceso",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
