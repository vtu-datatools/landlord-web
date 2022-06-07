from django.urls import path

from .views import QuestionListAPIView, QuestionAPIView, VoteAPIView, ResultsAPIView

urlpatterns = [
    path("", QuestionListAPIView.as_view(), name="index"),
    path("<int:pk>/", QuestionAPIView.as_view(), name="question"),
    path("vote/", VoteAPIView.as_view(), name="vote"),
    path("results/", ResultsAPIView.as_view(), name="results"),
]
