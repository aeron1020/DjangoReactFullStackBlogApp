from rest_framework import serializers
from .models import NewUser
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance