"""Markers serializers."""

from rest_framework_gis import serializers

from landlord.models import CurrentEvents


class CurrentEventsSerializer(serializers.GeoFeatureModelSerializer):
    """Marker GeoJSON serializer."""

    class Meta:
        """Marker serializer meta class."""

        fields = ("businessoperator", "detailurl", "totaloutstanding")
        geo_field = "geom"
        model = CurrentEvents
