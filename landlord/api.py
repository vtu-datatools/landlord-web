"""Markers API URL Configuration."""

from rest_framework import routers

from landlord.viewsets import CurrentIssuesViewSet

router = routers.DefaultRouter()
router.register(r"landlord", CurrentIssuesViewSet)

urlpatterns = router.urls
