from rest_framework import serializers

from reviewer.models import Reviewer
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {"password": {"write_only": True}}


class ReviewerRegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    def create(self, validated_data):
        user = User(
            username=validated_data["user"]["username"],
            email=validated_data["user"]["email"],
        )
        user.set_password(validated_data["user"]["password"])
        validated_data["user"] = user
        user.save()
        Reviewer.objects.create(**validated_data)
        return user

    class Meta:
        model = Reviewer
        fields = "__all__"
