from django.contrib.gis.geos import Point
from django.test import TestCase

from .models import CurrentEvents


class CurrentEventsTestCase(TestCase):
    def set_up(self):
        return CurrentEvents.objects.create(
            businessoperator='Sahotas',
            geom=Point(1, 1),
            detailurl='http://www.google.com',
            totaloutstanding=10
        )

    def test_current_event_creation(self):
        m = self.set_up()
        self.assertTrue(isinstance(m, CurrentEvents))
        self.assertEqual(m.__str__(), m.businessoperator)
        self.assertEqual(m.__unicode__(), (m.businessoperator, m.geom))
