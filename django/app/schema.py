import graphene
from graphene_django.types import DjangoObjectType
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from django.contrib.auth import get_user_model
from .models import JobPost, Application

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email", "bio", "first_name", "last_name", "school", "grade", "user_type")
    def resolve_userType(self, info):
        return self.user_type

class UpdateUserInfo(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        bio = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        school = graphene.String()
        grade = graphene.String()

    user = graphene.Field(UserType)

    def mutate(self, info, username=None, email=None, bio=None, first_name=None, last_name=None, school=None, grade=None):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        # Update fields if provided
        if username is not None:
            user.username = username
        if email is not None:
            user.email = email
        if bio is not None:
            user.bio = bio
        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        if school is not None:
            user.school = school
        if grade is not None:
            user.grade = grade

        user.save()
        return UpdateUserInfo(user=user)

    

# Job Post Type
class JobPostType(DjangoObjectType):
    class Meta:
        model = JobPost
        fields = ("id", "employer", "title", "description", "location", "site", "salary", "experience", "grade", "employment", "posted_at", "is_active")


class UpdateJobPost(graphene.Mutation):
    class Arguments:
        job_id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        location = graphene.String()
        site = graphene.String()
        salary = graphene.Float()
        experience = graphene.String()
        grade = graphene.String()
        employment = graphene.String()
        is_active = graphene.Boolean()

    job_post = graphene.Field(JobPostType)

    def mutate(self, info, job_id, title=None, description=None, location=None, site=None, salary=None, experience=None, grade=None, employment=None, is_active=None):
        job = JobPost.objects.get(id=job_id)

        if title is not None:
            job.title = title
        if description is not None:
            job.description = description
        if location is not None:
            job.location = location
        if site is not None:
            job.site = site
        if salary is not None:
            job.salary = salary
        if experience is not None:
            job.experience = experience
        if grade is not None:
            job.grade = grade
        if employment is not None:
            job.employment = employment
        if is_active is not None:
            job.is_active = is_active

        job.save()
        return UpdateJobPost(job_post=job)




# Application Type
class ApplicationType(DjangoObjectType):
    class Meta:
        model = Application
        fields = ("id", "job_post", "job_seeker", "applicant_name", "applicant_email", "resume", "applied_at", "applicant_bio")




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
        location = graphene.String(required=True)
        site = graphene.String(required=True)
        salary = graphene.Float(required=True)
        experience = graphene.String(required=True)
        grade = graphene.String(required=True)
        employment = graphene.String(required=True)

    job_post = graphene.Field(JobPostType)

    def mutate(self, info, title, description, location, salary, site, experience, grade, employment):
        user = info.context.user
        if not user.is_authenticated or not (user.user_type == "employer" or user.user_type == "admin"):
            raise Exception("Only employers can create job posts.")

        job_post = JobPost(
            employer=user,
            title=title,
            description=description,
            location=location,
            salary=salary,
            site=site,
            experience=experience,
            grade=grade,
            employment=employment,
            is_active = False
    
        )
        job_post.save()

        user.connected_jobs.add(job_post)
        user.save()


        return CreateJobPost(job_post=job_post)

class DeleteJobPost(graphene.Mutation):
    class Arguments:
        job_post_id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, job_post_id):
        user = info.context.user
        if not user.is_authenticated or not (user.user_type == "employer" or user.user_type == "admin"):
            raise Exception("Only employers and admins can delete job posts.")

        try:
            # Admins should be able to delete any job post
            if user.user_type == "admin":
                job_post = JobPost.objects.get(id=job_post_id)
            else:
                job_post = JobPost.objects.get(id=job_post_id, employer=user)

            job_post.delete()
            return DeleteJobPost(success=True)
        except JobPost.DoesNotExist:
            raise Exception("Job post not found or unauthorized to delete.")


# Apply to Job (Only Job Seekers)
class CreateApplication(graphene.Mutation):
    class Arguments:
        job_id = graphene.Int(required=True)
        applicant_name = graphene.String(required=True)
        applicant_email = graphene.String(required=True)
        resume = graphene.String()
        applicant_bio = graphene.String(required=True)

    application = graphene.Field(ApplicationType)

    def mutate(self, info, job_id, applicant_name, applicant_email, resume, applicant_bio):
        user = info.context.user
        if not user.is_authenticated or user.user_type != "job_seeker":
            raise Exception("Only job seekers can apply for jobs.")

        job_post = JobPost.objects.get(id=job_id)
        application = Application(
            job_post=job_post,
            job_seeker=user,
            applicant_name=applicant_name,
            applicant_email=applicant_email,
            resume=resume,
            applicant_bio=applicant_bio
        )
        application.save()

        user.connected_jobs.add(job_post)
        user.save()

        return CreateApplication(application=application)

class DeleteApplication(graphene.Mutation):
    class Arguments:
        application_id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, application_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        try:
            application = Application.objects.get(id=application_id)

            # Employers can delete applications for their job posts
            if user.user_type == "employer" and application.job_post.employer == user:
                application.delete()
                return DeleteApplication(success=True)

            # Job seekers can delete their own applications
            elif user.user_type == "job_seeker" and application.job_seeker == user:
                application.delete()
                return DeleteApplication(success=True)

            else:
                raise Exception("You do not have permission to delete this application.")

        except Application.DoesNotExist:
            raise Exception("Application not found or unauthorized to delete.")


# Authentication Mutations
class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()

#connected job removing and adding
class AddConnectedJob(graphene.Mutation):
    class Arguments:
        job_id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, job_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        success = user.add_connected_job(job_id)
        if not success:
            raise Exception("Job ID not found.")

        return AddConnectedJob(success=True)

class RemoveConnectedJob(graphene.Mutation):
    class Arguments:
        job_id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, job_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required.")

        success = user.remove_connected_job(job_id)
        if not success:
            raise Exception("Job ID not found.")

        return RemoveConnectedJob(success=True)

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
        return JobPost.objects.all()

    def resolve_job_by_id(self, info, id):
        return JobPost.objects.get(id=id)

    def resolve_all_applications(self, info):
        user = info.context.user
        if not user.is_authenticated: # or user.user_type != "employer"
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
    delete_job_post = DeleteJobPost.Field()
    delete_application = DeleteApplication.Field()
    add_connected_job = AddConnectedJob.Field()
    remove_connected_job = RemoveConnectedJob.Field()
    update_job_post = UpdateJobPost.Field()
    update_user_info = UpdateUserInfo.Field()

# Schema Definition
schema = graphene.Schema(query=Query, mutation=Mutation)
