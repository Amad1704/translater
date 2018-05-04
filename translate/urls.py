from django.conf.urls import include, url
from converter.views import index, api, bad_translator, bad
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'', include('converter.urls')),
    url(r'^good/translator/$', index),
    url(r'^bad/translator/$', bad_translator),
    url(r'api/translate/$', api),
    url(r'bad/translate/$', bad),
]