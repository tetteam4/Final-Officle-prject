from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="TET  API Backend ",
        default_version="v1",
        description="API endpoints for Authors Haven API Course",
        contact=openapi.Contact(email="teteam4@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", schema_view.with_ui("redoc", cache_timeout=0)),
    path("admin/", admin.site.urls),
    path("api/", include("apps.core.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
