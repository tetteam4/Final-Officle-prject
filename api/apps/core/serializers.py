from apps.attendance.models import WorkflowModel
from rest_framework import serializers
from taggit.serializers import TagListSerializerField

from . import models as core_models
from .models import (
    BlogPost,
    Category,
    Experiences,
    HoerImagesModel,
    Portfolio,
    Section,
    ServicesCategoryModel,
    Team,
    Technology,
    WebModel,
    WebModelImage,
    webCategory,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = core_models.Category
        fields = ["id", "name"]


class TechnologySerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Technology
        fields = ["id", "name", "icon", "tags"]


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ["id", "subtitle", "image", "description"]


class BlogPostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    section = SectionSerializer(many=True)

    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "category",
            "hero_image",
            "general_info",
            "conclusion",
            "section",
        ]


class PortfolioSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    echnologies = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = [
            "id",
            "name",
            "client",
            "category",
            "rating",
            "web_url",
            "images",
            "log_images",
            "top_images",
            "dashboard_images",
            "nav_images",
            "description",
            "deployment",
            "echnologies",
        ]

    def get_echnologies(self, obj):
        return [tag.name for tag in obj.echnologies.all()]


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [
            "id",
            "first_name",
            "last_name",
            "designation",
            "photo",
            "whatsapp",
            "twitter_link",
            "linkedin",
            "github",
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiences
        fields = [
            "id",
            "title",
            "company_name",
            "image",
            "points",
            "created_at",
            "updated_at",
        ]


class HoerImagesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoerImagesModel
        fields = [
            "id",
            "image",
            "head",
            "description",
            "video",
            "created_at",
            "updated_at",
        ]


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = core_models.Benefits
        fields = ["id", "title", "description"]


class WebCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = webCategory
        fields = ["id", "title", "icon"]


class WebModelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebModelImage
        fields = ["id", "image"]


class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkflowModel
        fields = ["id", "title", "description", "image"]


class WebModelSerializer(serializers.ModelSerializer):
    category = WebCategorySerializer()
    images = WebModelImageSerializer(many=True)
    workflow = WorkflowSerializer(many=True)

    class Meta:
        model = WebModel
        fields = ["id", "category", "workflow", "name", "description", "images"]


class ServicesCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesCategoryModel
        fields = [
            "id",
            "icon",
            "title",
        ]


class ServiceSerializer(serializers.ModelSerializer):
    benefit = BenefitSerializer(many=True)
    category = ServicesCategorySerializer()

    class Meta:
        model = core_models.Services
        fields = [
            "id",
            "pkid",
            "category",
            "name",
            "description",
            "video",
            "image",
            "icon",
            "benefit",
        ]
