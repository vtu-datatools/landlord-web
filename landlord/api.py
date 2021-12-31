"""Markers API URL Configuration."""

from rest_framework import routers

from landlord.viewsets import CurrentEventsViewSet

router = routers.DefaultRouter()
router.register(r"landlord", CurrentEventsViewSet)

urlpatterns = router.urls
