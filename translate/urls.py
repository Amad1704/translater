from django.conf.urls import url
from converter.views import index

urlpatterns = [
    url(r'^$', index),
]
