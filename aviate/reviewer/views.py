from http.client import HTTPResponse
from urllib import response
from reviewer.models import Reviewer
from candidate.models import (
    Academic,
    Application,
    Candidate,
    ProfessionalLink,
    Skill,
    Work,
)
from candidate.utils import get_tokens_for_user
from reviewer.serializers import ReviewerRegisterSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import FileResponse


class ReviewerRegisterView(GenericAPIView):
    serializer_class = ReviewerRegisterSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(data=token)


class ReviewApplication(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if not Reviewer.objects.filter(user=request.user).exists():
            return Response(data="User not a reviewer", status=400)
        status = request.data["status"]
        id = request.data["id"]
        feedback = request.data["feedback"]
        if not Application.objects.filter(pk=id, status="APPLIED").exists():
            return Response(data="Application already reviewed")
        Application.objects.filter(pk=id).update(
            status=status, reviewer=request.user.reviewer, feedback=feedback
        )
        return Response(data="Reviewed")


class GetOpenApplications(GenericAPIView):
    def get(self, request, *args, **kwargs):
        applications = Application.objects.filter(status="APPLIED").values()
        for i in range(len(applications)):
            candidate = Candidate.objects.get(pk=applications[i]["candidate_id"])
            applications[i]["candidate_name"] = candidate.user.username

        return Response(data=applications)


class GetApplicationDetail(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        id = pk
        application = Application.objects.get(pk=id)
        resume = False
        if application.resume.name is not None:
            resume = True
        print(resume)
        works = Work.objects.filter(candidate=application.candidate).values()
        academics = Academic.objects.filter(candidate=application.candidate).values()
        skills = Skill.objects.filter(candidate=application.candidate).values()
        links = ProfessionalLink.objects.filter(
            candidate=application.candidate
        ).values()
        return Response(
            data={
                "works": works,
                "academics": academics,
                "candidate_id": application.candidate.id,
                "candidate_name": application.candidate.user.username,
                "candidate_email": application.candidate.user.email,
                "cover_letter": application.cover_letter,
                "company": application.company,
                "skills": skills,
                "resume": resume,
                "links": links,
            }
        )


class GetResume(GenericAPIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        application = Application.objects.get(pk=pk)
        resume = application.resume
        response = FileResponse(resume)
        return response
