import graphene
from graphene_django.types import DjangoObjectType
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from django.contrib.auth import get_user_model
from .models import JobPost, Application

# User Type
class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "user_type")

# Job Post Type
class JobPostType(DjangoObjectType):
    class Meta:
        model = JobPost
        fields = ("id", "employer", "title", "description", "company", "location", "salary", "posted_at", "is_active")

# Application Type
class ApplicationType(DjangoObjectType):
    class Meta:
        model = Application
        fields = ("id", "job_post", "job_seeker", "applicant_name", "applicant_email", "resume", "applied_at")

# Register User Mutation
class RegisterUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        user_type = graphene.String(required=True)  # 'job_seeker' or 'employer'

    user = graphene.Field(UserType)

    def mutate(self, info, username, email, password, user_type):
        if user_type not in ["job_seeker", "employer", "admin"]:
            raise Exception("Invalid user type. Choose 'job_seeker' or 'employer'.")

        User = get_user_model()
        user = User(username=username, email=email, user_type=user_type)
        user.set_password(password)
        user.save()
        return RegisterUser(user=user)

# Create Job Post (Only Employers)
class CreateJobPost(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        company = graphene.String(required=True)
        location = graphene.String(required=True)
        salary = graphene.Float()

    job_post = graphene.Field(JobPostType)

    def mutate(self, info, title, description, company, location, salary=None):
        user = info.context.user
        if not user.is_authenticated or user.user_type != "employer":
            raise Exception("Only employers can create job posts.")

        job_post = JobPost(
            employer=user,
            title=title,
            description=description,
            company=company,
            location=location,
            salary=salary
        )
        job_post.save()
        return CreateJobPost(job_post=job_post)

# Apply to Job (Only Job Seekers)
class CreateApplication(graphene.Mutation):
    class Arguments:
        job_id = graphene.Int(required=True)
        applicant_name = graphene.String(required=True)
        applicant_email = graphene.String(required=True)
        resume = graphene.String()

    application = graphene.Field(ApplicationType)

    def mutate(self, info, job_id, applicant_name, applicant_email, resume):
        user = info.context.user
        if not user.is_authenticated or user.user_type != "job_seeker":
            raise Exception("Only job seekers can apply for jobs.")

        job_post = JobPost.objects.get(id=job_id)
        application = Application(
            job_post=job_post,
            job_seeker=user,
            applicant_name=applicant_name,
            applicant_email=applicant_email,
            resume=resume
        )
        application.save()
        return CreateApplication(application=application)

# Authentication Mutations
class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()

# Queries
class Query(UserQuery, MeQuery, graphene.ObjectType):
    all_jobs = graphene.List(JobPostType)
    job_by_id = graphene.Field(JobPostType, id=graphene.Int(required=True))
    all_applications = graphene.List(ApplicationType)
    application_by_id = graphene.Field(ApplicationType, id=graphene.Int(required=True))
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        user = info.context.user
        if not user.is_authenticated or user.user_type != "admin":
            raise Exception("Only admins can view all users.")
        return get_user_model().objects.all()

    def resolve_all_jobs(self, info):
        return JobPost.objects.filter(is_active=True)

    def resolve_job_by_id(self, info, id):
        return JobPost.objects.get(id=id)

    def resolve_all_applications(self, info):
        user = info.context.user
        if not user.is_authenticated or user.user_type != "employer":
            raise Exception("Only employers can view applications.")
        return Application.objects.filter(job_post__employer=user)

    def resolve_application_by_id(self, info, id):
        user = info.context.user
        application = Application.objects.get(id=id)
        if application.job_post.employer != user:
            raise Exception("You do not have permission to view this application.")
        return application

# Mutations
class Mutation(AuthMutation, graphene.ObjectType):
    register_user = RegisterUser.Field()
    create_job_post = CreateJobPost.Field()
    create_application = CreateApplication.Field()

# Schema Definition
schema = graphene.Schema(query=Query, mutation=Mutation)
