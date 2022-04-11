from django.contrib.auth import get_user_model
from rest_framework import viewsets
from posts.permissions import IsAuthorOrReadOnly
from .models import Post
from .serializers import PostSerializer, UserSerializer

class PostViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthorOrReadOnly,)
  queryset = Post.objects.all()
  serializer_class = PostSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = get_user_model().objects.all()
  serializer_class = UserSerializer

