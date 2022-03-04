"""Markers API URL Configuration."""

from rest_framework import routers

from .viewsets import CurrentIssuesViewSet

router = routers.DefaultRouter()
router.register(r"issues", CurrentIssuesViewSet)

urlpatterns = router.urls
