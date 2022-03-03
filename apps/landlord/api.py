"""Markers API URL Configuration."""

from rest_framework import routers

from .viewsets import CurrentIssuesViewSet

router = routers.DefaultRouter()
router.register(r"landlord", CurrentIssuesViewSet)

urlpatterns = router.urls
