from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """User with email"""
    pass

    def __str__(self):
        return self.username
