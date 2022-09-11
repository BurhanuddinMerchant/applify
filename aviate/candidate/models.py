from django.db import models
from django.contrib.auth.models import User

from reviewer.models import Reviewer

# Create your models here.
class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.username


class Work(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    currently_working = models.BooleanField(default=False)
    description = models.TextField()
    location = models.CharField(max_length=256)
    role = models.CharField(max_length=256)
    company = models.CharField(max_length=256)

    def __str__(self) -> str:
        return f"{self.candidate.user.username} {self.company}"


class Academic(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    currently_studying = models.BooleanField(default=False)
    description = models.TextField()
    location = models.CharField(max_length=256)
    institute = models.CharField(max_length=256)
    degree = models.CharField(max_length=256, default="NA")
    gpa = models.CharField(max_length=5, default="NA")

    def __str__(self) -> str:
        return f"{self.candidate.user.username} {self.institute}"


class ProfessionalLink(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, default="")
    link = models.CharField(max_length=256, default="")


class Skill(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, default="")


class Application(models.Model):
    STATUS_CHOICES = (
        ("APPLIED", "APPLIED"),
        ("ACCEPTED", "ACCEPTED"),
        ("REJECTED", "REJECTED"),
    )
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="candidate"
    )
    company = models.CharField(max_length=256, blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    status = models.CharField(choices=STATUS_CHOICES, default="APPLIED", max_length=256)
    reviewer = models.ForeignKey(
        Reviewer, on_delete=models.CASCADE, null=True, blank=True
    )
    resume = models.FileField(blank=True, null=True, upload_to="resumes")
    feedback = models.TextField(default="")

    def __str__(self) -> str:
        return f"{self.candidate.user.username} {self.company} {self.status}"
