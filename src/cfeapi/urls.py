from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from rest_framework.documentation import include_docs_urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^api/$', TemplateView.as_view(template_name='api-home.html'), name='home'),
    url(r'^api/', include_docs_urls(title='Dj Ionic APIs')),
    url(r'^api/auth/', include('accounts.api.urls', namespace='api-auth')),
    url(r'^api/user/', include('accounts.api.user.urls', namespace='api-user')),
    url(r'^api/status/', include('status.api.urls', namespace='api-status')),
    # url(r'^api/updates/', include('updates.api.urls')), 
]


if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    
urlpatterns += [
    url(r'^(?P<path>.*)', TemplateView.as_view(template_name='ng.html'), name='home'),
]


# Angular Handles 404
# Angular Handle 500 errors