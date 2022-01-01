from django.contrib.gis.geos import Point
from django.test import TestCase
from django.urls import resolve
from rest_framework import status
from rest_framework.test import APITestCase

from .models import CurrentIssues


class CurrentEventsModelTest(TestCase):
    def set_up(self):
        return CurrentIssues.objects.create(
            businessoperator="Sahotas",
            geom=Point(1, 1),
            detailurl="http://www.google.com",
            totaloutstanding=10,
        )

    def test_current_event_creation(self):
        """
        Ensure we can create a new CurrentIssues object and get it's information.
        """
        m = self.set_up()
        self.assertTrue(isinstance(m, CurrentIssues))
        self.assertEqual(m.__str__(), m.businessoperator)
        self.assertEqual(m.__unicode__(), (m.businessoperator, m.geom))
