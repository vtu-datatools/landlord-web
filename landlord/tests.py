from django.contrib.gis.geos import Point
from django.test import TestCase

from .models import Marker


class MarkerTestCase(TestCase):
    def set_up(self):
        return Marker.objects.create(name='City Hall', location=Point(1, 1))

    def test_marker_creation(self):
        m = self.set_up()
        self.assertTrue(isinstance(m, Marker))
        self.assertEqual(m.__str__(), m.name)
        self.assertEqual(m.__unicode__(), (m.name, m.location))
