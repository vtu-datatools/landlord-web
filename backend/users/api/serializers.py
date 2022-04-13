from django.core.mail import send_mail
from rest_framework.serializers import ModelSerializer, EmailField, CharField
from backend.users.models import User


class UserSerializer(ModelSerializer):

    email = EmailField(required=True)
    password = CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "first_name", "last_name")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        send_mail(
            subject="Welcome to Vancouver Landlords!",
            message="A new user hass been registered with: Username: {} Email: {}".format(
                validated_data["email"], validated_data["email"]
            ),
            from_email=None,
            recipient_list=[validated_data["email"]],
            fail_silently=False,
        )
        instance.save()

        return instance
