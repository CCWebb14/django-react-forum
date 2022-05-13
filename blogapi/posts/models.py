from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=50)
  body = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title

class Comment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name='comments')
  parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  body = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return 'Comment {} by {}'.format(self.body, self.author)