# Generated by Django 3.2.10 on 2022-06-07 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('votes', '0003_auto_20220606_2159'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='ip_address',
            field=models.CharField(default='None', max_length=50),
        ),
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together={('ip_address', 'choice')},
        ),
    ]
