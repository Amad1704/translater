from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
    url(r'^post/(?P<pk>\d+)/$', views.post_detail, name='post_detail'),
    url(r'^post/bad/translator/$', views.bad_translator, name='bad_translator'),
    url(r'^post/good/translator/$', views.index, name='index'),
    url(r'api/translate/$', views.api, name='api')
#    url(r'bad/translate/$', views.bad, name='bad'),
]