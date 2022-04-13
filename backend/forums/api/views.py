from backend.forums.models import Forum
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
)

from .serializers import (
    ForumListSerializer,
    ForumCreateDeleteSerializer,
    ForumUpdateSerializer,
    ForumDetailSerializer,
)


class ForumListAPIView(generics.ListAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumListSerializer
    permission_classes = [AllowAny]


class ForumCreateAPIView(generics.CreateAPIView):
    serializer_class = ForumCreateDeleteSerializer
    queryset = Forum.objects.all()
    permission_classes = [IsAdminUser]


class ForumDetailAPIView(generics.RetrieveAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"


class ForumDeleteAPIView(generics.DestroyAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumCreateDeleteSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"


class ForumUpdateAPIView(generics.UpdateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"
