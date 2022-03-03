"""Markers admin."""

from django.contrib.gis import admin

from .models import CurrentIssues


@admin.register(CurrentIssues)
class CurrentEventsAdmin(admin.OSMGeoAdmin):
    """Marker admin."""

    list_display = ("businessoperator", "geom")
