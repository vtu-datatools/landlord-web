from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User


class UserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
        )


class UserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields
