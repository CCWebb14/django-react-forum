
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):

  author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())


  class Meta:

    fields = ('id', 'author', 'title', 'body', 'created_at',)
    model = Post

  def save(self, **kwargs):
        """Include default for read_only `user` field"""
        kwargs["author"] = self.fields["author"].get_default()
        return super().save(**kwargs)

class UserSerializer(serializers.ModelSerializer):

  class Meta: 
    model = get_user_model()
    fields = ('id', 'username',)