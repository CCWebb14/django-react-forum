# Generated by Django 4.0.3 on 2022-06-08 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_alter_comment_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='url',
            field=models.CharField(blank=True, max_length=2000),
        ),
    ]