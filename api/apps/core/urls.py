from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("teams", views.TeamViewSet)

urlpatterns = [
    path("categories/", views.CategoryListView.as_view(), name="category-list"),
    path(
        "categories/<uuid:id>/",
        views.CategoryDetailView.as_view(),
        name="category-detail",
    ),
    path("technologies/", views.TechnologyListView.as_view(), name="technology-list"),
    path(
        "technologies/<uuid:id>/",
        views.TechnologyDetailView.as_view(),
        name="technology-detail",
    ),
    path("sections/", views.SectionListView.as_view(), name="section-list"),
    path(
        "sections/<uuid:id>/",
        views.SectionDetailView.as_view(),
        name="section-detail",
    ),
    path("blogs/", views.BlogPostListView.as_view(), name="blogpost-list"),
    path(
        "blogs/<uuid:id>/", views.BlogPostDetailView.as_view(), name="blogpost-detail"
    ),
    path("portfolios/", views.PortfolioListView.as_view(), name="portfolio-list"),
    path(
        "portfolios/<uuid:pk>/",
        views.PortfolioDetailView.as_view(),
        name="portfolio-detail",
    ),
    path("", include(router.urls)),
    path("about/", views.AboutCreateView.as_view(), name="about-create"),
    path("about/<uuid:pk>/", views.AboutView.as_view(), name="about-detail"),
    path(
        "experiences/",
        views.ExperienceListView.as_view(),
        name="experience_list_api",
    ),
    path(
        "experiences/<int:pk>/",
        views.ExperienceDetailView.as_view(),
        name="experience_detail_api",
    ),
    path(
        "hero-images/",
        views.HoerImagesModelListView.as_view(),
        name="hoer_images_list_api",
    ),
    path(
        "hero-images/<int:pk>/",
        views.HoerImagesModelDetailView.as_view(),
        name="hoer_images_detail_api",
    ),
]
