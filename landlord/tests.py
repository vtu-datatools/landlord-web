from django.urls import resolve
from django.contrib.gis.geos import Point
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

from .models import CurrentIssues


class CurrentEventsModelTest(TestCase):
    def set_up(self):
        return CurrentIssues.objects.create(
            businessoperator='Sahotas',
            geom=Point(1, 1),
            detailurl='http://www.google.com',
            totaloutstanding=10
        )

    def test_current_event_creation(self):
        """
        Ensure we can create a new CurrentIssues object and get it's information.
        """
        m = self.set_up()
        self.assertTrue(isinstance(m, CurrentIssues))
        self.assertEqual(m.__str__(), m.businessoperator)
        self.assertEqual(m.__unicode__(), (m.businessoperator, m.geom))

class CurrentIssuesAPITest(APITestCase):
    def test_create_account(self):
        """
        Ensure we can access the current_events API.
        """
        url = resolve('/api/landlord/')
        print(url)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)