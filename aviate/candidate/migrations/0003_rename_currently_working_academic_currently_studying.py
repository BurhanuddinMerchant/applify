# Generated by Django 4.1.1 on 2022-09-10 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("candidate", "0002_rename_company_academic_institute_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="academic",
            old_name="currently_working",
            new_name="currently_studying",
        ),
    ]