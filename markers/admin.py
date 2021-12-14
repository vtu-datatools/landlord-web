"""Markers admin."""

from django.contrib.gis import admin

from markers.models import Marker


@admin.register(Marker)
class MarkerAdmin(admin.OSMGeoAdmin):
    """Marker admin."""

    list_display = ("name", "location")
