# Generated by Django 2.0.3 on 2018-03-28 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source_text', models.TextField(max_length=1000)),
                ('target_text', models.TextField(max_length=1000)),
            ],
        ),
    ]
