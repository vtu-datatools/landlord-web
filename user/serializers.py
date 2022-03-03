from rest_framework.serializers import ModelSerializer
from user.models import CustomUser


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("email", "last_login", "date_joined", "is_volunteer")
