# Generated by Django 4.1.1 on 2022-09-11 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("candidate", "0008_academic_degree_academic_gpa_skill_professionallink"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="resume",
            field=models.FileField(blank=True, null=True, upload_to=""),
        ),
    ]