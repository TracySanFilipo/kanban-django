from django.db import models

# Create your models here.
class Tasks(models.Model):
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    priority = models.CharField(max_length=255)
