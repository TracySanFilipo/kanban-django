from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    priority_choices = [("h", 'High'), ("m", 'Moderate'), ("l", 'Low')]
    status_choices = [("b", 'Backlog'), ("r", 'Ready'), ("p", 'In Progress'), ("c", 'Complete')]

    title = models.CharField(max_length=150)
    status = models.CharField(max_length=20)
    priority = models.CharField(max_length=20)
    description = models.TextField(max_length=1250, null=True)
    created = models.DateTimeField(auto_now_add=True)
    person = models.CharField(max_length=10)
    owner = models.OneToOneField(User, null=True)
