from django.db import models

class User(models.Model):
    UID = models.UUIDField(max_length=15, primary_key=True, blank = False)
    Name = models.CharField(max_length=10, blank=False)
    Password = models.CharField(max_length=20, blank=False)
    Email = models.EmailField(max_length=30)
