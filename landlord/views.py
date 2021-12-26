from django.views.generic.base import TemplateView


class MarkersMapView(TemplateView):
    """Markers map view."""

    template_name = "map.html"
