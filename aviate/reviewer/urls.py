from django.urls import path, include
from reviewer.views import (
    GetApplicationDetail,
    GetOpenApplications,
    ReviewApplication,
    ReviewerRegisterView,
)

urlpatterns = [
    path("register", ReviewerRegisterView.as_view(), name="register reviewer"),
    path("applications", GetOpenApplications.as_view(), name="all applications"),
    path("review", ReviewApplication.as_view(), name="review application"),
    path("application/<int:pk>", GetApplicationDetail.as_view(), name="app detail"),
]
