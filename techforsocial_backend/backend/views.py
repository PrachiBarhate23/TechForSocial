from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions, filters
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Project, Blog
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ProjectSerializer, BlogSerializer

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


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)

    if user is not None:
        serializer = UserSerializer(user)
        return Response({
            "message": "Login successful",
            "user": serializer.data
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            "error": "Invalid email or password"
        }, status=status.HTTP_401_UNAUTHORIZED)


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

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by("-created_at")
    serializer_class = BlogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "content", "user"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.query_params.get("user")
        if user:
            queryset = queryset.filter(user=user)
        return queryset

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        blog = self.get_object()
        user_id = request.user.id
        liked_by = blog.liked_by or []
        if user_id in liked_by:
            return Response({"detail": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)
        liked_by.append(user_id)
        blog.liked_by = liked_by
        blog.likes = (blog.likes or 0) + 1
        blog.save(update_fields=["liked_by", "likes"])
        serializer = self.get_serializer(blog, context={"request": request})
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def reply(self, request, pk=None):
        blog = self.get_object()
        content = request.data.get("content", "").strip()
        if not content:
            return Response({"detail": "content is required"}, status=status.HTTP_400_BAD_REQUEST)

        username = getattr(request.user, "username", None) or str(request.user)
        replies = blog.replies or []
        reply_obj = {"id": int(time.time() * 1000), "content": content, "user": username}
        replies.append(reply_obj)
        blog.replies = replies
        blog.save(update_fields=["replies"])
        serializer = self.get_serializer(blog, context={"request": request})
        return Response(serializer.data)