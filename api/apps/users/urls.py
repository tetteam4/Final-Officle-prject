from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    CreateUserView,
    DeleteUserView,
    MyTokenObtainPairView,
    PasswordChangeApiView,
    PasswordRegisterEmailVerifyApiView,
    UpdateUserView,
    UserProfileView,
    UserViewSet,
    activate_account,
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")

urlpatterns = [
    path("user/token/", MyTokenObtainPairView.as_view(), name="token"),
    path("user/token/refresh/", TokenRefreshView.as_view()),
    path("api/", include(router.urls)),
    path(
        "api/create_user/",
        UserViewSet.as_view({"post": "create_user"}),
        name="create_user",
    ),
    path("profiles/", UserProfileView.as_view(), name="user-profile"),
    path("create/", CreateUserView.as_view(), name="create_user"),
    path("activate/<uidb64>/<token>/", activate_account, name="activate_account"),
    path("update/<int:pk>/", UpdateUserView.as_view(), name="update-user"),
    path("delete/<int:pk>/", DeleteUserView.as_view(), name="delete-user"),
    path(
        "user/password-rest-email/<email>/",
        PasswordRegisterEmailVerifyApiView.as_view(),
    ),
]
