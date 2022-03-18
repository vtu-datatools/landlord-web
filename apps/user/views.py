from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer


class UserCreate(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = UserSerializer


user_create = UserCreate.as_view()


class Protected(APIView):
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
