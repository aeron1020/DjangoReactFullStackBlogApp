from rest_framework import serializers
from .models import Post, Category, Comment
from users.models import NewUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('id', 'user_name', 'email')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('category', 'id', 'title', 'slug', 'author', 'excerpt', 'content', 'status', 'published')

 
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author_name', 'content', 'created_at', 'replies')
        extra_kwargs = {
            'author_name': {'required': False},  # Make author_name optional
            'replies': {'required': False},
        }
