from django.db import models
#from django.core.urlresolvers import reverse

class Post(models.Model):
    title = models.CharField(max_length=200)
    source_text = models.TextField()
    target_text = models.TextField()

    def __str__(self):
        return self.title