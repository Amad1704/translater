from django.conf.urls import url
from converter.views import index, api

urlpatterns = [
    url(r'^$', index),
    url(r'api/translate/$', api)
]
