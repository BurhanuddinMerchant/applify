from rest_framework import serializers

from candidate.models import Academic, Candidate, Work
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {"password": {"write_only": True}}


class CandidateRegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    def create(self, validated_data):
        user = User(
            username=validated_data["user"]["username"],
            email=validated_data["user"]["email"],
        )
        user.set_password(validated_data["user"]["password"])
        validated_data["user"] = user
        user.save()
        Candidate.objects.create(**validated_data)
        return user

    class Meta:
        model = Candidate
        fields = "__all__"


class CreateWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = "__all__"


class CreateAcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = "__all__"
