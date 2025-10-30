from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Project, Blog

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering normal users.
    """

    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
        ]

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning user details.
    """

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "role"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class BlogSerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = "__all__"  # 'liked' is added via SerializerMethodField

    def get_liked(self, obj):
        request = self.context.get("request", None)
        if not request or not request.user or not request.user.is_authenticated:
            return False
        try:
            return request.user.id in (obj.liked_by or [])
        except Exception:
            return False
