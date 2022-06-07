from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from backend.votes.models import Question, Choice, Vote
from django.shortcuts import get_object_or_404
from django.db import IntegrityError


class QuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            "id",
            "question_text",
            "pub_date",
        )
        read_only_fields = ("id",)


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("id", "question", "name", "bio")


class ChoiceResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("id", "name", "votes")
        read_only_fields = ("votes",)


class QuestionDetailSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ("id", "question_text", "pub_date", "choices")
        read_only_fields = ("id",)


class ResultsSerializer(serializers.ModelSerializer):
    choices = ChoiceResultsSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ("id", "question_text", "pub_date", "choices")
        read_only_fields = ("id",)


class VoteSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    def create(self, validated_data):
        print(validated_data)
        choice = get_object_or_404(Choice, name=validated_data["name"])
        vote = Vote()
        vote.choice = choice
        try:
            vote.save(commit=False)
        except IntegrityError:
            return vote
        return vote

    class Meta:
        model = Vote
        exclude = ("id", "ip_address", "choice")
