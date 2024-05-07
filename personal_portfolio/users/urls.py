from django.urls import path
from .views import RegisterView, BlacklistTokenView #LoginView not necessary because of token

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),

]
