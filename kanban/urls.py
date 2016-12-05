
from django.conf.urls import url, include
from rest_framework import routers
from kanban_app import views
from django.contrib import admin
# import kanban_app

router = routers.SimpleRouter()
router.register(r'task', views.TaskViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    url(r'^kanban_app/', include('kanban_app.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^register/$', views.register, name="register"),
]
