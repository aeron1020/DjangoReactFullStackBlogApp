# Generated by Django 5.0.1 on 2024-07-05 08:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_newuser_address_newuser_date_of_birth_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='newuser',
            old_name='user_name',
            new_name='username',
        ),
    ]
