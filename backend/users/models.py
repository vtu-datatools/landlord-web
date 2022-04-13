from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """User with email"""

    bio = models.TextField(max_length=2000, blank=True, default="")
    avatar = models.URLField(default="", blank=True)
    status = models.CharField(max_length=16, default="", blank=True)

    def __str__(self):
        return self.username
