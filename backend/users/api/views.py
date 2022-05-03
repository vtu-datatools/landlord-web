from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsOwnerOrAdminOrReadOnly

User = get_user_model()

from .serializers import (
    UserCreateSerializer,
    UserDetailSerializer,
    UserListSerializer,
    UserUpdateSerializer,
    UserTokenSerializer,
)


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    throttle_scope = "create_user"


class UserDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = "username"
    permission_classes = [AllowAny]


class UserDeleteAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = "username"
    permission_classes = [IsOwnerOrAdminOrReadOnly]


class UserUpdateAPIView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = "username"
    permission_classes = [IsOwnerOrAdminOrReadOnly]
    throttle_scope = "edit_user"


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [AllowAny]


class ProtectedView(APIView):
    # Return user profile data
    def get(self, request):
        user_data = request.user
        return Response(
            data={
                "username": user_data.username,
                "email": user_data.email,
                "name": user_data.name,
            }
        )


class UsernameAvailable(APIView):
    permission_classes = (AllowAny,)
    # Check to see if username is available (used before creation)
    def get(self, request):
        username = request.query_params["username"]
        username_exists = User.objects.filter(username=username).exists()

        return Response(data={"message": not username_exists})


class EmailAvailable(APIView):
    permission_classes = (AllowAny,)
    # Check to see if email is available (used before creation)
    def get(self, request, *args, **kwargs):
        email = self.request.GET["email"]
        email_exists = User.objects.filter(email=email).exists()
        return Response(data={"message": not email_exists})


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenSerializer
