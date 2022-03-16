from rest_framework.serializers import ModelSerializer, EmailField, CharField
from .models import CustomUser


class UserSerializer(ModelSerializer):

    email = EmailField(required=True)
    password = CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ("email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance
