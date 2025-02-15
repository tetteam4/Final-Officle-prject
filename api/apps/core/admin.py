from apps.attendance.models import WorkflowModel
from django import forms
from django.apps import apps
from django.contrib import admin
from django.forms import inlineformset_factory
from django.utils.translation import gettext_lazy as _

from .models import (
    Benefits,
    BlogPost,
    Category,
    Experiences,
    HoerImagesModel,
    Portfolio,
    Section,
    Services,
    ServicesCategoryModel,
    Team,
    Technology,
    WebModel,
    WebModelImage,
    webCategory,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}


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
        css = {"all": ("admin/css/admin_custom.css",)}


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
        css = {"all": ("admin/css/admin_custom.css",)}


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("subtitle", "created_at", "updated_at")
    search_fields = ("subtitle",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "designation", "created_at")
    search_fields = ("first_name", "last_name", "designation")
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}


@admin.register(Experiences)
class ExperiencesAdmin(admin.ModelAdmin):
    list_display = ("title", "company_name", "created_at", "updated_at")
    search_fields = (
        "title",
        "company_name",
    )
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}


@admin.register(HoerImagesModel)
class HoerImagesModelAdmin(admin.ModelAdmin):
    list_display = ("head", "created_at", "updated_at")
    search_fields = ("head",)
    list_filter = ("created_at",)

    class Media:
        css = {"all": ("admin/css/admin_custom.css",)}


@admin.register(Benefits)
class BenefitsAdmin(admin.ModelAdmin):
    list_display = ("title", "description")
    search_fields = ("title",)


@admin.register(Services)
class ServicesAdmin(admin.ModelAdmin):
    list_display = ("category", "description", "image", "icon")
    search_fields = ("category__title",)


# Form for WebModelImageInline
class WebModelImageInlineForm(forms.ModelForm):
    class Meta:
        model = WebModel
        fields = ["images"]

    def clean_images(self):
        images = self.cleaned_data.get("images")

        return list(set(images))


class WebModelImageInline(admin.TabularInline):
    model = WebModel.images.through
    form = WebModelImageInlineForm
    extra = 1


# class WebModelAdmin(admin.ModelAdmin):
#     list_display = ("description", "category")
#     search_fields = ("description",)

#     # inlines = [WebModelImageInline]


admin.site.register(webCategory)
admin.site.register(WebModelImage)
admin.site.register(WebModel)


@admin.register(ServicesCategoryModel)
class ServicesCategoryModelAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "icon"]
    search_fields = ["title"]
    list_filter = ["title"]
    ordering = ["title"]


@admin.register(WorkflowModel)
class WorkflowAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "description", "image"]
    search_fields = ["title"]
    list_filter = ["title"]
