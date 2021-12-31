"""Markers admin."""

from django.contrib.gis import admin

from landlord.models import CurrentEvents


@admin.register(CurrentEvents)
class CurrentEventsAdmin(admin.OSMGeoAdmin):
    """Marker admin."""

    list_display = ("businessoperator", "geom")
