from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Reviewer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=256)
