from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import ProjectViewSet, BlogViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'blogs', BlogViewSet, basename='blog')

urlpatterns = [
    path("test/", views.test_api, name="test_api"),
    path("register/", views.register, name="register"),
    path("login/", views.login, name="login"),
    path("profile/", views.profile, name="profile"),
    path("", include(router.urls)),  
]
