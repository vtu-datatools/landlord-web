from django.db import IntegrityError, transaction

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import (
    AllowAny,
)
from rest_framework.response import Response
from rest_framework import status

from backend.votes.models import Question
from .serializers import (
    QuestionListSerializer,
    QuestionDetailSerializer,
    ResultsSerializer,
    VoteSerializer,
)


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


class QuestionListAPIView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionListSerializer
    permission_classes = [AllowAny]


class QuestionAPIView(RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionDetailSerializer
    permission_classes = [AllowAny]


class ResultsAPIView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = ResultsSerializer
    permission_classes = [AllowAny]


class VoteAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            created_instance = serializer.create(validated_data=request.data)
            created_instance.ip_address = get_client_ip(request)

            try:
                created_instance.save()

            except IntegrityError:
                return Response(
                    {"message": "Already voted"}, status=status.HTTP_400_BAD_REQUEST
                )
            except transaction.TransactionManagementError:
                return Response(
                    {"message": "Already voted"}, status=status.HTTP_400_BAD_REQUEST
                )

            return Response(
                {"message": "Vote cast successful"}, status=status.HTTP_200_OK
            )
