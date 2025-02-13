# views.py
from django.http import Http404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response

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
    webCategory,
)
from .serializers import (
    BenefitSerializer,
    BlogPostSerializer,
    CategorySerializer,
    ExperienceSerializer,
    HoerImagesModelSerializer,
    PortfolioSerializer,
    SectionSerializer,
    ServicesCategorySerializer,
    ServiceSerializer,
    TeamSerializer,
    TechnologySerializer,
    WebCategorySerializer,
    WebModelSerializer,
)


class CategoryListView(generics.GenericAPIView, ListModelMixin, CreateModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CategoryDetailView(
    generics.GenericAPIView,
    RetrieveModelMixin,  # Add this mixin
    UpdateModelMixin,
    DestroyModelMixin,
):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"  # Use UUID as the lookup field

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class TechnologyListView(
    generics.GenericAPIView,
    ListModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class TechnologyDetailView(
    RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, generics.GenericAPIView
):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class SectionListView(generics.GenericAPIView, ListModelMixin, CreateModelMixin):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class SectionDetailView(
    RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, generics.GenericAPIView
):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"


class PortfolioListView(generics.ListAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.AllowAny]


class PortfolioListView(generics.ListAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Portfolio.objects.all()
        return queryset


import logging

logger = logging.getLogger(__name__)


class PortfolioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        logger.debug(f"Fetching portfolio with ID: {self.kwargs['pk']}")
        try:
            return Portfolio.objects.get(id=self.kwargs["pk"])
        except Portfolio.DoesNotExist:
            logger.error(f"Portfolio with ID {self.kwargs['pk']} not found")
            raise Http404("Portfolio not found")

    def perform_destroy(self, instance):
        logger.debug(f"Deleting portfolio with ID: {instance.id}")
        instance.delete()
        logger.info(f"Portfolio with ID {instance.id} deleted successfully")


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        try:
            return Team.objects.get(id=self.kwargs["pk"])
        except Team.DoesNotExist:
            raise NotFound("Team not found")


class ExperienceListView(generics.ListCreateAPIView):
    queryset = Experiences.objects.all().order_by("-created_at")
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]


class ExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Experiences.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]


class HoerImagesModelListView(generics.ListCreateAPIView):
    queryset = HoerImagesModel.objects.all()
    serializer_class = HoerImagesModelSerializer
    permission_classes = [permissions.AllowAny]


class HoerImagesModelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HoerImagesModel.objects.all()
    serializer_class = HoerImagesModelSerializer
    permission_classes = [permissions.AllowAny]


class BenefitsListView(generics.ListAPIView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitSerializer


class BenefitsDetailView(generics.RetrieveAPIView):
    queryset = Benefits.objects.all()
    serializer_class = BenefitSerializer


class ServicesListView(generics.ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class ServicesDetailView(generics.RetrieveAPIView):
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class WebModelListView(generics.ListCreateAPIView):
    queryset = WebModel.objects.all()
    serializer_class = WebModelSerializer
    permission_classes = [permissions.AllowAny]


class WebModelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WebModel.objects.all()
    serializer_class = WebModelSerializer
    permission_classes = [permissions.AllowAny]


class WebCategoryListView(generics.ListCreateAPIView):
    queryset = webCategory.objects.all()
    serializer_class = WebCategorySerializer
    permission_classes = [permissions.AllowAny]


class WebCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = webCategory.objects.all()
    serializer_class = WebCategorySerializer
    permission_classes = [permissions.AllowAny]


class ServicesCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServicesCategoryModel.objects.all()
    serializer_class = ServicesCategorySerializer
