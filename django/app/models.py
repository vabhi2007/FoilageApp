from django.contrib.auth.models import AbstractUser
from django.db import models

# User model with multiple account types
class User(AbstractUser):
    USER_TYPES = [
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
        ('admin', 'Admin')
    ]
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='job_seeker')

    connected_jobs = models.ManyToManyField("JobPost", related_name="connected_users", blank=True)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"
    
    def add_connected_job(self, job_id):
        """Adds a job to connected_jobs list if it exists"""
        try:
            job = JobPost.objects.get(id=job_id)
            self.connected_jobs.add(job)
            self.save()
            return True
        except JobPost.DoesNotExist:
            return False

    def remove_connected_job(self, job_id):
        """Removes a job from connected_jobs list if it exists"""
        try:
            job = JobPost.objects.get(id=job_id)
            self.connected_jobs.remove(job)
            self.save()
            return True
        except JobPost.DoesNotExist:
            return False

from django.db import models
from django.conf import settings

class JobPost(models.Model):
    employer = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Links to the custom User model
        on_delete=models.CASCADE,
        related_name="job_posts",
        limit_choices_to={'user_type': 'employer'}  # Only employers can post jobs
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    site = models.CharField(max_length=255)
    salary = models.FloatField(null=True, blank=True)
    experience = models.CharField(max_length=255)
    grade = models.CharField(max_length=10)
    employment = models.CharField(max_length=255)
    posted_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} at {self.company}"


class Application(models.Model):
    job_post = models.ForeignKey(
        JobPost,
        related_name="applications",
        on_delete=models.CASCADE
    )
    job_seeker = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Links to the custom User model
        on_delete=models.CASCADE,
        related_name="applications",
        limit_choices_to={'user_type': 'job_seeker'}  # Only job seekers can apply
    )
    applicant_name = models.CharField(max_length=255)
    applicant_email = models.EmailField()
    resume = models.TextField()  # Storing resume text or link
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant_name} applied for {self.job_post.title}"