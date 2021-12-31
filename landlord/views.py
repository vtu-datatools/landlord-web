from django.views.generic.base import TemplateView


class CurrentEventsMapView(TemplateView):
    """CurrentEvents map view."""

    template_name = "map.html"
