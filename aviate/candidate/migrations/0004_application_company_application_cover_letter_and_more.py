# Generated by Django 4.1.1 on 2022-09-10 10:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("reviewer", "0001_initial"),
        ("candidate", "0003_rename_currently_working_academic_currently_studying"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="company",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name="application",
            name="cover_letter",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="application",
            name="reviewer",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="reviewer.reviewer",
            ),
        ),
    ]