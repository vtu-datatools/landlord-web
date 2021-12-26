"""Markers API URL Configuration."""

from rest_framework import routers

from landlord.viewsets import MarkerViewSet

router = routers.DefaultRouter()
router.register(r"markers", MarkerViewSet)

urlpatterns = router.urls
