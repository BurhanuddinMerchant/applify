# Generated by Django 4.1.1 on 2022-09-10 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("candidate", "0004_application_company_application_cover_letter_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="feedback",
            field=models.TextField(blank=True, null=True),
        ),
    ]
