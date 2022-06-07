from django.db import models, IntegrityError


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published", auto_now=True)

    def __str__(self):
        return f"ID: {self.id} - {self.question_text} - Published on: {self.pub_date:%B %d, %Y}"


class Choice(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="choices"
    )
    name = models.CharField(max_length=200)
    bio = models.TextField(max_length=2000, blank=True, default="")
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Vote(models.Model):
    ip_address = models.CharField(max_length=50, default="None")
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name="vote")

    class Meta:
        unique_together = (
            "ip_address",
            "choice",
        )

    def save(self, commit=True, *args, **kwargs):

        if commit:
            try:
                self.choice.votes += 1
                self.choice.save()
                super(Vote, self).save(*args, **kwargs)

            except IntegrityError:
                self.choice.votes -= 1
                self.choice.save()
                raise IntegrityError

        else:
            raise IntegrityError

    def __str__(self):
        return self.choice.name
