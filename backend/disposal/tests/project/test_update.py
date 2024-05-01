from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
from disposal.models import Project


class ProjectUpdateTestCase(APITestCase):
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
        self.project = Project.objects.create(
            name="Proyecto de reciclaje",
            image="image.png",
            location="Calle 123",
            description="Proyecto de reciclaje de botellas de plástico",
            goal_tons="100",
            total_tons="0",
            organizations="Organización de reciclaje",
            status="En proceso",
        )

        return super().setUp()

    def test_project_update_success(self):
        response = self.client.put(
            reverse("project.update", args=[self.project.id]),
            {
                "name": "Proyecto de reciclaje actualizado",
                "image": "image.png",
                "location": "Calle 123",
                "description": "Proyecto de reciclaje de botellas de plástico",
                "goal_tons": "100",
                "total_tons": "0",
                "organizations": "Organización de reciclaje",
                "status": "En proceso",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("name", response.json())
        self.assertIn("image", response.json())
        self.assertIn("location", response.json())
        self.assertIn("description", response.json())
        self.assertIn("goal_tons", response.json())
        self.assertIn("total_tons", response.json())
        self.assertIn("organizations", response.json())
        self.assertIn("status", response.json())

    def test_project_update_unauthorized(self):
        self.client.credentials()
        response = self.client.put(
            reverse("project.update", args=[self.project.id]),
            {
                "name": "Proyecto de reciclaje actualizado",
                "image": "image.png",
                "location": "Calle 123",
                "description": "Proyecto de reciclaje de botellas de plástico",
                "goal_tons": "100",
                "total_tons": "0",
                "organizations": "Organización de reciclaje",
                "status": "En proceso",
            },
        )
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())

    def test_project_update_not_found(self):
        response = self.client.put(
            reverse("project.update", args=[1000]),
            {
                "name": "Proyecto de reciclaje actualizado",
                "image": "image.png",
                "location": "Calle 123",
                "description": "Proyecto de reciclaje de botellas de plástico",
                "goal_tons": "100",
                "total_tons": "0",
                "organizations": "Organización de reciclaje",
                "status": "En proceso",
            },
        )
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())

    def test_project_update_invalid_data(self):
        response = self.client.put(
            reverse("project.update", args=[self.project.id]),
            {
                "name": "Proyecto de reciclaje actualizado",
                "image": "image.png",
                "location": "Calle 123",
                "description": "Proyecto de reciclaje de botellas de plástico",
                "goal_tons": "100",
                "total_tons": "0",
                "organizations": "Organización de reciclaje",
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("status", response.json())
        self.assertEqual(response.json()["status"], ["This field is required."])
