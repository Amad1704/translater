from django.conf.urls import include, url
from converter.views import index, api
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'', include('converter.urls')),
    url(r'^$', index),
    url(r'api/translate/$', api)
]