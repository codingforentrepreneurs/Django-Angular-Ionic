import datetime
from django.conf import settings
from django.utils import timezone

from rest_framework_jwt.settings import api_settings
from rest_framework.reverse import reverse as api_reverse

expire_delta             = api_settings.JWT_REFRESH_EXPIRATION_DELTA


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'id': user.id,
        'token': token,
        'username': user.username,
        'displayName': user.username,
        'expires': timezone.now() + expire_delta - datetime.timedelta(seconds=200),
        'uri': api_reverse("api-user:detail", kwargs={"username": user.username}, request=request)
    }