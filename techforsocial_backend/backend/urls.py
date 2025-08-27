from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet

urlpatterns = [
    path("test/", views.test_api, name="test_api"),
    path("register/", views.register, name="register"),
    path("login/", views.login, name="login"),
    path("profile/", views.profile, name="profile"),
]

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
]