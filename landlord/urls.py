"""CurrentEvents urls."""
from django.urls import path

from .views import CurrentEventsMapView

app_name = "landlord"

urlpatterns = [
    path("map/", CurrentEventsMapView.as_view()),
]
