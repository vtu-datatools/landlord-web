"""CurrentEvents urls."""
from django.urls import path

from .views import CurrentIssuesMapView

app_name = "landlord"

urlpatterns = [
    path("map/", CurrentIssuesMapView.as_view()),
]
