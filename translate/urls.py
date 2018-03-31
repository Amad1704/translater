from django.conf.urls import url
from django.contrib import admin
from converter import views as converter_views

urlpatterns = [
    url(r'^$', converter_views.index),
    url(r'^admin/', admin.site.urls),
]
