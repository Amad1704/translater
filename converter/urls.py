from django.conf.urls import url
from . import views, views_bad


urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
    url(r'^post/(?P<pk>\d+)/$', views.post_detail, name='post_detail'),
    url(r'^bad/translator/$', views_bad.bad_translator, name='bad_translator'),
    url(r'^good/translator/$', views.index, name='index'),
    url(r'api/translate/$', views.api, name='api'),
    url(r'bad/translate/$', views_bad.bad, name='bad'),
    url(r'^memes/$', views.memes, name='memes'),
]