from django.contrib import admin

from candidate.models import (
    Academic,
    Application,
    Candidate,
    ProfessionalLink,
    Skill,
    Work,
)

# Register your models here.
admin.site.register(Candidate)
admin.site.register(Academic)
admin.site.register(Application)
admin.site.register(Work)
admin.site.register(Skill)
admin.site.register(ProfessionalLink)
