from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """User with email"""

    # Any extra fields would go here
    def __str__(self):
        return self.email
