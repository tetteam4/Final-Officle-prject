from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import (
    About,
    BlogPost,
    Category,
    Experiences,
    HoerImagesModel,
    Portfolio,
    Section,
    Team,
    Technology,
)

# Adding custom CSS for each model admin


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ("name", "client", "category", "rating", "created_at")
    search_fields = (
        "name",
        "client",
        "category__name",
    )
    list_filter = ("category", "rating", "created_at")

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "created_at", "updated_at")
    search_fields = (
        "title",
        "category__name",
    )
    list_filter = ("category", "created_at")
    filter_horizontal = ("section",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("subtitle", "created_at", "updated_at")
    search_fields = ("subtitle",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "designation", "created_at")
    search_fields = ("first_name", "last_name", "designation")
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("name", "services", "created_at", "updated_at")
    search_fields = (
        "name",
        "services",
    )
    list_filter = ("services", "created_at")
    filter_horizontal = ("technologies_used",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(Experiences)
class ExperiencesAdmin(admin.ModelAdmin):
    list_display = ("title", "company_name", "created_at", "updated_at")
    search_fields = (
        "title",
        "company_name",
    )
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS


@admin.register(HoerImagesModel)
class HoerImagesModelAdmin(admin.ModelAdmin):
    list_display = ("head", "created_at", "updated_at")
    search_fields = ("head",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}  # Path to your custom CSS
