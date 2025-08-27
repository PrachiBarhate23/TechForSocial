from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions, filters
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Project 
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ProjectSerializer

User = get_user_model()


@api_view(["GET"])
@permission_classes([AllowAny])
def test_api(request):
    return Response({"message": "backend is running..."})


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    """
    Handles user registration with email, first name, last name, and password.
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                "message": "User registered successfully",
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    """
    Handles user login with email + password and returns JWT refresh & access tokens.
    """
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(
            {
                "message": "Login successful",
                **serializer.validated_data,
            },
            status=status.HTTP_200_OK,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    Returns profile details of the currently authenticated user.
    """
    return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        tag = self.request.query_params.get("tag")
        if category:
            queryset = queryset.filter(category=category)
        if tag:
            queryset = queryset.filter(tags__contains=[tag])
        return queryset