from django.db import models

# Create your models here.
from user.models import User

class Annotation(models.Model):
    PID = models.UUIDField(max_length=15, primary_key=True, blank=False)
    Name = models.CharField(max_length=255, blank=False)
    Xmin = models.DecimalField(max_digits=10, decimal_places=2)
    Ymin = models.DecimalField(max_digits=10, decimal_places=2)
    Xmax = models.DecimalField(max_digits=10, decimal_places=2)
    Ymax = models.DecimalField(max_digits=10, decimal_places=2)

class Image(models.Model):
    PID = models.UUIDField(max_length=15, primary_key=True, blank=False)
    Name = models.CharField(max_length=255, blank=False)
    Url = models.URLField()
    Width = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Height = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Antt = models.ManyToManyField(Annotation)

class Task(models.Model):
    PID = models.UUIDField(max_length=15, primary_key=True, blank=False)
    Name = models.CharField(max_length=255, blank=False)
    Owner = models.EmailField(max_length=30, blank=False)
    PostTime = models.DateTimeField(auto_now_add=True)
    IsSubmitted = models.BooleanField()
    Submitter = models.ManyToManyField(User)
    IsPassed = models.CharField(max_length=25)
    Img = models.ManyToManyField(Image)