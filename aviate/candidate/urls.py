from django.urls import path, include
from candidate.views import (
    AppliedApplications,
    CandidateRegisterView,
    CreateProfile,
    SubmitApplication,
)

urlpatterns = [
    path("register", CandidateRegisterView.as_view(), name="register candidate"),
    path("profile", CreateProfile.as_view(), name="create profile"),
    path("applied", AppliedApplications.as_view(), name="applied"),
    path("apply", SubmitApplication.as_view(), name="apply"),
]
