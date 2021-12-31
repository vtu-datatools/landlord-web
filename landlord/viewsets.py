"""Markers API views."""
from rest_framework import viewsets
from rest_framework_gis import filters

from landlord.models import CurrentEvents
from landlord.serializers import CurrentEventsSerializer


class CurrentEventsViewSet(viewsets.ReadOnlyModelViewSet):
    """Marker view set."""

    # bbox_filter_field = "geom"
    # filter_backends = (filters.InBBoxFilter,)
    queryset = CurrentEvents.objects.all()
    serializer_class = CurrentEventsSerializer
