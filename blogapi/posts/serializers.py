
from email.policy import default
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post, Comment
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

  def validate(self, attrs):
    data = super().validate(attrs)
    refresh = self.get_token(self.user)
    # data["refresh"] = str(refresh)   
    data["access"] = str(refresh.access_token)
    data["email"] = self.user.email

    return data

class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(parent_id__isnull=True)
        return super(FilteredListSerializer, self).to_representation(data)

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class CommentSerializer(serializers.ModelSerializer):

  author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
  username = serializers.SerializerMethodField()
  replies = RecursiveField(required=False, read_only=True, allow_null=True, many=True)

  class Meta:
    # Custom filtered list to only show parent_id=null comments
    # Otherwise will display duplicate nested comments
    list_serializer_class = FilteredListSerializer
    fields = ('id', 'parent', 'post', 'author', 'username', 'body', 'created_at', 'replies')
    model = Comment
    
  def save(self, **kwargs):
        # Include default for read_only `user` field
        kwargs["author"] = self.fields["author"].get_default()
        return super().save(**kwargs)

  def get_username(self, obj):
    return obj.author.username

class PostSerializer(serializers.ModelSerializer):

  author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
  username = serializers.SerializerMethodField()
  comments = CommentSerializer(required=False, read_only=True, allow_null=True, many=True)
  comment_amt = serializers.SerializerMethodField()

  class Meta:
    fields = ('id', 'author', 'username', 'title', 'body', 'created_at', 'comment_amt', 'comments')
    model = Post

  def save(self, **kwargs):
        # Include default for read_only `user` field
        kwargs["author"] = self.fields["author"].get_default()
        return super().save(**kwargs)

  def get_comment_amt(self, obj):
    return obj.comments.all().count()

  def get_username(self, obj):
    return obj.author.username

class PostListSerializer(serializers.ModelSerializer):

  author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
  username = serializers.SerializerMethodField()
  comment_amt = serializers.SerializerMethodField()

  class Meta:
    fields = ('id', 'author', 'username', 'title', 'body', 'created_at', 'comment_amt')
    model = Post

  def save(self, **kwargs):
        # Include default for read_only `user` field
        kwargs["author"] = self.fields["author"].get_default()
        return super().save(**kwargs)

  def get_comment_amt(self, obj):
    return obj.comments.all().count()

  def get_username(self, obj):
    return obj.author.username



class UserSerializer(serializers.ModelSerializer):

  class Meta: 
    model = get_user_model()
    fields = ('id', 'username',)