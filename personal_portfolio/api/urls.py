from django.urls import path
from .views import PostList, PostDetail, CreatePost, AdminPostDetails, EditPost, DeletePost, PostListDetailFilter, UserPostsList, CreateComment, PostCommentsList, UserDetailView, CreateCommentForGuest

app_name = 'personal_portfolio'

urlpatterns = [
    path('', PostList.as_view(), name='post-list'),
    path('posts/<slug>/', PostDetail.as_view(), name='post-detail'),
    # path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('search/', PostListDetailFilter.as_view(), name='postsearch'),
    path('user/posts/', UserPostsList.as_view(), name='user-post-list'),

    path('admin/create/', CreatePost.as_view(), name='create-post'),
    path('admin/edit/post-detail/<int:pk>/', AdminPostDetails.as_view(), name='admin-post-detail'),
    path('admin/edit-post/<int:pk>/', EditPost.as_view(), name='edit-post'),
    path('admin/delete-post/<int:pk>/', DeletePost.as_view(), name='delete-post'),

    path('posts/<int:pk>/comments/create/', CreateComment.as_view(), name='create-comment'),
    path('posts/<int:pk>/comments/create/guest/', CreateCommentForGuest.as_view(), name='create-comment-guest'),
    path('posts/<int:pk>/comments/', PostCommentsList.as_view(), name='post-comments-list'),

    path('user/', UserDetailView.as_view(), name='user-detail'),
]

    

