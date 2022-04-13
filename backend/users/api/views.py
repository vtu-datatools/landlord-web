from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from backend.users.models import User


class UserCreate(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = UserSerializer


user_create = UserCreate.as_view()


class Protected(APIView):
    # Return user profile data
    def get(self, request):
        user_data = request.user
        return Response(
            data={
                "username": user_data.username,
                "email": user_data.email,
                "first_name": user_data.first_name,
                "last_name": user_data.last_name,
            }
        )


protected = Protected.as_view()


class UsernameAvailable(APIView):
    permission_classes = (permissions.AllowAny,)
    # Check to see if username is available (used before creation)
    def get(self, request):
        username = request.query_params["username"]
        username_exists = User.objects.filter(username=username).exists()

        return Response(data={"message": not username_exists})


username_available = UsernameAvailable.as_view()


class EmailAvailable(APIView):
    permission_classes = (permissions.AllowAny,)
    # Check to see if email is available (used before creation)
    def get(self, request, *args, **kwargs):
        email = self.request.GET["email"]
        email_exists = User.objects.filter(email=email).exists()
        return Response(data={"message": not email_exists})


email_available = EmailAvailable.as_view()
