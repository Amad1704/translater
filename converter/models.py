from django.db import models

class TextField(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.title