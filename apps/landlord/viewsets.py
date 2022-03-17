"""Markers API views."""
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework_gis import filters

from .models import CurrentIssues
from .serializers import CurrentIssuesSerializer


class CurrentIssuesViewSet(viewsets.ReadOnlyModelViewSet):
    """Marker view set."""

    permission_classes = (permissions.AllowAny,)

    bbox_filter_field = "geom"
    filter_backends = (filters.InBBoxFilter,)
    queryset = CurrentIssues.objects.all()
    serializer_class = CurrentIssuesSerializer
