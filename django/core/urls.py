
from django.contrib import admin
from django.urls import path

from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt  # Optional for development
from graphql_jwt.decorators import jwt_cookie

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', jwt_cookie(csrf_exempt(GraphQLView.as_view(graphiql=True)))),  # GraphQL endpoint
]
