from django.contrib import admin
from .models import Project, Blog

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "category", "team_name", "created_at")

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "user", "likes", "created_at")