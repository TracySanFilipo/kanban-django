from django.conf.urls import include, url
from kanban_app.views import *
from django.contrib import admin
from . import views
import kanban_app

urlpatterns = [
    url(r'^main/$', views.view_main, name='main'),
    url('^', include('django.contrib.auth.urls')),
]
