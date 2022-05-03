from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (
    UserCreateAPIView,
    UserDetailAPIView,
    UserListAPIView,
    UserDeleteAPIView,
    UserUpdateAPIView,
    UsernameAvailable,
    EmailAvailable,
    ProtectedView,
    UserTokenObtainPairView,
)

urlpatterns = [
    path("", UserListAPIView.as_view(), name="user-list"),
    path("register/", UserCreateAPIView.as_view(), name="user-register"),
    path("<slug:username>/", UserDetailAPIView.as_view(), name="user-detail"),
    path("<slug:username>/edit/", UserUpdateAPIView.as_view(), name="user-update"),
    path("<slug:username>/delete/", UserDeleteAPIView.as_view(), name="user-delete"),
    path("token/obtain/", UserTokenObtainPairView.as_view(), name="token-create"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token-refresh"),
    path("protected/", ProtectedView.as_view(), name="protected"),
    path("available/username/", UsernameAvailable.as_view(), name="username-available"),
    path("available/email/", EmailAvailable.as_view(), name="email-available"),
]
