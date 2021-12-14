"""Markers serializers."""

from rest_framework_gis import serializers

from markers.models import Marker


class MarkerSerializer(serializers.GeoFeatureModelSerializer):
    """Marker GeoJSON serializer."""

    class Meta:
        """Marker serializer meta class."""

        fields = ("id", "name")
        geo_field = "location"
        model = Marker
