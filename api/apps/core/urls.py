from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("teams", views.TeamViewSet)
router.register(
    "services-category", views.ServicesCategoryViewSet, basename="services-category"
),
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
    path("benefits/", views.BenefitsListView.as_view(), name="benefits-list"),
    path(
        "benefits/<int:pk>/", views.BenefitsDetailView.as_view(), name="benefits-detail"
    ),
    path("services/", views.ServicesListView.as_view(), name="services-list"),
    path(
        "services/<uuid:pk>/",
        views.ServicesDetailView.as_view(),
        name="services-detail",
    ),
    path("webmodels/", views.WebModelListView.as_view(), name="webmodel-list"),
    path(
        "webmodels/<int:pk>/",
        views.WebModelDetailView.as_view(),
        name="webmodel-detail",
    ),
    path(
        "webcategories/", views.WebCategoryListView.as_view(), name="webcategory-list"
    ),
    path(
        "webcategories/<int:pk>/",
        views.WebCategoryDetailView.as_view(),
        name="webcategory-detail",
    ),
]
