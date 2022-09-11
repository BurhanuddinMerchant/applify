from candidate.utils import get_tokens_for_user
from candidate.serializers import CandidateRegisterSerializer
from candidate.models import Academic, Application, ProfessionalLink, Skill, Work
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CandidateRegisterView(GenericAPIView):
    serializer_class = CandidateRegisterSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(data=token)


class CreateProfile(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        candidate = request.user.candidate
        works = request.data["works"]
        academics = request.data["academics"]
        skills = request.data["skills"]
        links = request.data["links"]
        work_objects = []
        academics_objects = []
        skills_objects = []
        links_objects = []
        for work in works:
            work_objects.append(
                Work(
                    candidate=candidate,
                    start_date=work["start_date"],
                    end_date=work["end_date"],
                    currently_working=work["currently_working"],
                    description=work["description"],
                    location=work["location"],
                    role=work["role"],
                    company=work["company"],
                )
            )
        for academic in academics:
            academics_objects.append(
                Academic(
                    candidate=candidate,
                    start_date=academic["start_date"],
                    end_date=academic["end_date"],
                    currently_studying=academic["currently_studying"],
                    description=academic["description"],
                    location=academic["location"],
                    institute=academic["institute"],
                )
            )
        for link in links:
            links_objects.append(
                ProfessionalLink(
                    candidate=candidate, name=link["name"], link=link["link"]
                )
            )

        for skill in skills:
            skills_objects.append(Skill(candidate=candidate, name=skill["name"]))

        Work.objects.bulk_create(work_objects, batch_size=None, ignore_conflicts=False)
        Academic.objects.bulk_create(
            academics_objects, batch_size=None, ignore_conflicts=False
        )
        Skill.objects.bulk_create(
            skills_objects, batch_size=None, ignore_conflicts=False
        )
        ProfessionalLink.objects.bulk_create(
            links_objects, batch_size=None, ignore_conflicts=False
        )

        return Response(data="created")

    def get(self, request, *args, **kwargs):
        works = Work.objects.filter(candidate=request.user.candidate).values()
        academics = Academic.objects.filter(candidate=request.user.candidate).values()
        skills = Skill.objects.filter(candidate=request.user.candidate).values()
        links = ProfessionalLink.objects.filter(
            candidate=request.user.candidate
        ).values()
        return Response(
            data={
                "works": works,
                "academics": academics,
                "skills": skills,
                "links": links,
            }
        )


class SubmitApplication(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        cover_letter = request.data["cover_letter"]
        company = request.data["company"]
        resume = request.data["file"]
        application = Application.objects.create(
            cover_letter=cover_letter,
            company=company,
            candidate=request.user.candidate,
            resume=resume,
        )
        return Response(data="Submitted")


class AppliedApplications(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        applications = Application.objects.filter(
            candidate=request.user.candidate
        ).values()
        return Response(data=applications)
