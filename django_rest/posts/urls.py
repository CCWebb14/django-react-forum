from django.urls import path
from .views import UserList, UserDetail, PostList, PostDetail, MyObtainTokenPair, MyTokenRefresh, CommentList

urlpatterns = [
    path('', PostList.as_view()), 
    path('users/', UserList.as_view()), 
    path('users/<int:pk>/', UserDetail.as_view()), 
    path('<int:pk>/', PostDetail.as_view()), 
    path('token/', MyObtainTokenPair.as_view()), 
    path('refresh/', MyTokenRefresh.as_view()), 
    path('comments/', CommentList.as_view())
    
]