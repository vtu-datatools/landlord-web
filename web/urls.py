"""VTU URL Configuration
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("markers.api")),
    path("markers/", include("markers.urls")),
]
