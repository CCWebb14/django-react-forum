from django.contrib.auth import get_user_model
from rest_framework import generics
from posts.permissions import IsAuthorOrReadOnly
from .models import Post
from .serializers import PostSerializer, UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

class MyObtainTokenPair(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # instantiate the serializer with the request data
        serializer = self.get_serializer(data=request.data)
        # call .is_valid() before accessing validated_data
        serializer.is_valid(raise_exception=True)  

        access = serializer.validated_data.get('access', None)
        refresh = serializer.validated_data.get('refresh', None)
        email = serializer.validated_data.get('email', None)

        if access is not None:
            response = Response({'access_token': access}, status=200)
            # response.set_cookie('access-token', access, httponly=True)
            response.set_cookie('refresh-token', refresh, httponly=True)
            return response

        return Response({"Error": "Something went wrong"}, status_code=400)


class PostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class UserList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
