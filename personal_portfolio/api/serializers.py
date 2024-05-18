from rest_framework import serializers
from .models import Post, Category, Comment, Like
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
    likes_count = serializers.ReadOnlyField()
    liked_by_user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('category', 'id', 'title', 'slug', 'author', 'excerpt', 'content', 'status', 'published', 'likes_count', 'liked_by_user')

    def get_liked_by_user(self, obj):
        request = self.context.get('request', None)
        if request is None:
            return False
        return obj.user_has_liked(request.user)

 
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'post', 'author_name', 'content', 'created_at', 'replies')
        extra_kwargs = {
            'replies': {'required': False},
        }

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'user', 'session_key', 'created_at')



