# Generated by Django 3.2.10 on 2022-01-06 11:30

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CurrentIssues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('businessoperator', models.CharField(blank=True, max_length=255, null=True)),
                ('detailurl', models.CharField(max_length=255, null=True)),
                ('streetnumber', models.IntegerField(null=True)),
                ('street', models.CharField(max_length=255, null=True)),
                ('totaloutstanding', models.IntegerField(null=True)),
                ('totalunits', models.IntegerField(null=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('geo_local_area', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'current_issues',
            },
        ),
    ]
