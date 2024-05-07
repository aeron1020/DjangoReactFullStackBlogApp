from rest_framework import generics
from .serializers import PostSerializer, UserSerializer, CommentSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissions, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import filters
from rest_framework import permissions
from django.db.models import Q
from .models import Post, Comment
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import NewUser


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method not in SAFE_METHODS:
            return True
        
        return obj.author == request.user
    
class UserDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update user instance.
    """
    queryset = NewUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

   
    def get_object(self):
        print(self.request.user)
        # Return the user associated with the current request
        return self.request.user


class PostList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer
    # queryset = Post.objects.all()

    def get_queryset(self):
        return Post.objects.filter(Q(deleted=False) & Q(status='published'))

    # def get_queryset(self):
    #     user = self.request.user
    #     return Post.objects.filter(author=user)


class PostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer
    lookup_field = 'slug'  # Set the lookup field to 'slug'
    
    def get_queryset(self):
        # slug = self.request.query_params.get('slug', None)
        
        slug = self.kwargs.get('slug', None)

        user = self.request.user

        print(user)

        return Post.objects.filter(slug=slug, deleted=False, status='published')
    

# Rename this view to avoid conflicts
class PostListDetailFilter(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

class UserPostsList(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter posts by the author's ID
        return Post.objects.filter(author=self.request.user, deleted=False, status='published')


class CreatePost(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # Set the author of the post to the current user
        serializer.save(author=self.request.user)
        
class AdminPostDetails(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class EditPost(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, PostUserWritePermission]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated, PostUserWritePermission]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_destroy(self, instance):
        # Override the perform_destroy method to add additional logic
        # For example, you can add a flag to mark the post as deleted instead of actually deleting it from the database
        instance.deleted = True
        instance.save()


class PostCommentsList(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # Get the post ID from the URL parameters
        post_id = self.kwargs.get('pk')
        # Filter comments by the post's ID
        queryset = Comment.objects.filter(post_id=post_id)
        return queryset
    

class CreateComment(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        
