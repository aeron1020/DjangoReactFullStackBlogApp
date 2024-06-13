# from django.contrib import admin
# from django.utils.text import slugify
# from .models import Post, Category, Comment, Like, Project


# @admin.register(Post)
# class AuthorAdmin(admin.ModelAdmin):
#     list_display = ('title', 'id', 'status', 'slug', 'author')
#     prepopulated_fields = {'slug': ('title',),}

# admin.site.register(Category)
# admin.site.register(Comment)
# admin.site.register(Like)
# admin.site.register(Project)


from django.contrib import admin
from .models import Post, Category, Comment, Like, Project, Technology

# Inline for Comments in the Post admin view
class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1
    fields = ('author_name', 'content', 'created_at')
    readonly_fields = ('created_at',)

# Inline for Likes in the Post admin view
class LikeInline(admin.TabularInline):
    model = Like
    extra = 1
    fields = ('user', 'session_key', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author', 'published', 'likes_count')
    list_filter = ('status', 'category', 'published', 'author')
    search_fields = ('title', 'content', 'author__username', 'category__name')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published'
    ordering = ('-published',)
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'author', 'category', 'status', 'content', 'excerpt', 'head_image', 'published', 'likes_count', 'deleted')
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': ('tech_stack',)
        }),
    )
    inlines = [CommentInline, LikeInline]

# Registering Category with search functionality if not already registered
if not admin.site.is_registered(Category):
    @admin.register(Category)
    class CategoryAdmin(admin.ModelAdmin):
        list_display = ('name',)
        search_fields = ('name',)

# Registering Technology with search functionality if not already registered
if not admin.site.is_registered(Technology):
    @admin.register(Technology)
    class TechnologyAdmin(admin.ModelAdmin):
        list_display = ('name',)
        search_fields = ('name',)

# Registering Comment with search and filter functionality
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'post', 'created_at', 'parent')
    list_filter = ('created_at', 'post')
    search_fields = ('author_name', 'content', 'post__title')

# Registering Like with search and filter functionality
@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'session_key', 'created_at')
    list_filter = ('created_at', 'post')
    search_fields = ('user__username', 'post__title', 'session_key')

# Registering Project with search and filter functionality
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_title', 'author', 'created_at', 'updated_at')
    list_filter = ('created_at', 'author', 'tech_stack')
    search_fields = ('project_title', 'description', 'author__username', 'tech_stack__name')
    prepopulated_fields = {'slug': ('project_title',)}
    filter_horizontal = ('tech_stack',)  # This line adds a better UI for managing many-to-many fields


