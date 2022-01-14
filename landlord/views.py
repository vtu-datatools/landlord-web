from django.views.generic.base import TemplateView


class CurrentIssuesMapView(TemplateView):
    """CurrentEvents map view."""

    template_name = "map.html"
