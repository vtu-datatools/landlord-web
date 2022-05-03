from rest_framework.serializers import (
    ModelSerializer,
    HyperlinkedRelatedField,
    SerializerMethodField,
    CharField,
    URLField,
    EmailField,
    SlugField,
    ValidationError,
)
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.humanize.templatetags.humanize import naturaltime

from backend.users.models import UserProfile


class UserDetailSerializer(ModelSerializer):
    bio = CharField(source="profile.bio")
    avatar = URLField(source="profile.avatar")
    status = URLField(source="profile.status")
    name = CharField(source="profile.name")
    threads = HyperlinkedRelatedField(
        many=True, read_only=True, view_name="thread-detail", lookup_field="pk"
    )
    posts = HyperlinkedRelatedField(
        many=True, read_only=True, view_name="post-detail", lookup_field="pk"
    )
    date_joined = SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "username",
            "name",
            "bio",
            "avatar",
            "status",
            "is_staff",
            "date_joined",
            "threads",
            "posts",
        ]
        lookup_field = "username"

    def get_date_joined(self, obj):
        return naturaltime(obj.date_joined)


class UserListSerializer(ModelSerializer):
    bio = CharField(source="profile.bio")
    avatar = URLField(source="profile.avatar")
    status = URLField(source="profile.status")
    name = CharField(source="profile.name")

    class Meta:
        model = User
        fields = [
            "username",
            "name",
            "bio",
            "avatar",
            "status",
            "is_staff",
            "date_joined",
        ]


class UserUpdateSerializer(ModelSerializer):
    # A field from the user's profile:
    bio = CharField(source="profile.bio", allow_blank=True)
    name = CharField(source="profile.name", max_length=32, allow_blank=True)
    avatar = URLField(source="profile.avatar", allow_blank=True)
    status = CharField(
        source="profile.status",
        allow_blank=True,
        default="",
        min_length=0,
        max_length=16,
    )
    current_password = CharField(
        write_only=True,
        allow_blank=True,
        label=_("Current Password"),
        help_text=_("Required"),
    )
    new_password = CharField(
        allow_blank=True,
        default="",
        write_only=True,
        min_length=4,
        max_length=32,
        label=_("New Password"),
    )
    email = EmailField(
        allow_blank=True,
        default="",
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="has already been taken by other user",
            )
        ],
    )

    class Meta:
        model = User
        fields = (
            "username",
            "name",
            "email",
            "current_password",
            "new_password",
            "bio",
            "avatar",
            "status",
        )
        read_only_fields = ("username",)
        lookup_field = "username"

    def update(self, instance, validated_data):
        # make sure requesting user provide his current password
        # e.g if admin 'endiliey' is updating a user 'donaldtrump',
        # currentPassword must be 'endiliey' password instead of 'donaldtrump' password
        try:
            username = self.context.get("request").user.username
        except:
            msg = _("Must be authenticated")
            raise ValidationError(msg, code="authorization")

        password = validated_data.get("current_password")
        validated_data.pop("current_password", None)

        if not password:
            msg = _("Must provide current password")
            raise ValidationError(msg, code="authorization")

        user = authenticate(
            request=self.context.get("request"), username=username, password=password
        )
        if not user:
            msg = _("Sorry, the password you entered is incorrect.")
            raise ValidationError(msg, code="authorization")

        # change password to a new one if it exists
        new_password = validated_data.get("new_password") or None
        if new_password:
            instance.set_password(new_password)
        validated_data.pop("new_password", None)

        # Update user profile fields
        profile_data = validated_data.pop("profile", None)
        profile = instance.profile
        for field, value in profile_data.items():
            if value:
                setattr(profile, field, value)
        # Update user fields
        for field, value in validated_data.items():
            if value:
                setattr(instance, field, value)

        profile.save()
        instance.save()
        return instance


class UserCreateSerializer(ModelSerializer):
    # A field from the user's profile:
    username = SlugField(
        min_length=4,
        max_length=32,
        help_text=_(
            "Required. 4-32 characters. Letters, numbers, underscores or hyphens only."
        ),
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="has already been taken by other user",
            )
        ],
        required=True,
    )
    password = CharField(
        min_length=4,
        max_length=32,
        write_only=True,
        help_text=_("Required. 4-32 characters."),
        required=True,
    )
    email = EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="has already been taken by other user",
            )
        ],
    )
    bio = CharField(source="profile.bio", allow_blank=True, default="")
    name = CharField(source="profile.name", allow_blank=True, default="", max_length=32)
    avatar = URLField(source="profile.avatar", allow_blank=True, default="")
    status = CharField(
        source="profile.status",
        allow_blank=True,
        max_length=16,
        min_length=0,
        default="",
    )

    class Meta:
        model = User
        fields = ("username", "name", "email", "password", "bio", "avatar", "status")

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", None)
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        avatar = profile_data.get("avatar") or None
        if not avatar:
            avatar = "https://api.adorable.io/avatar/200/" + username
        profile = UserProfile(
            user=user,
            bio=profile_data.get("bio", ""),
            avatar=avatar,
            name=profile_data.get("name", ""),
            status=profile_data.get("status", "Member"),
        )
        send_mail(
            subject="Welcome to Vancouver Landlords!",
            message="A new user hass been registered with: Username: {} Email: {}".format(
                validated_data["email"], validated_data["email"]
            ),
            from_email=None,
            recipient_list=[validated_data["email"]],
            fail_silently=False,
        )
        profile.save()
        return user


class UserTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["username"] = self.user.username
        data["is_staff"] = self.user.is_staff
        return data
