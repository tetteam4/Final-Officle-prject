import datetime
import logging
from io import BytesIO

import requests
from core.celery import app
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.models import Site
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.timezone import now
from PIL import Image

logger = logging.getLogger(__name__)


@app.task
def send_email_notification_task(user_id, email_subject, email_template, link=None):
    from django.contrib.auth import get_user_model

    User = get_user_model()
    user = User.objects.get(id=user_id)

    current_site = Site.objects.get_current()
    domain = current_site.domain
    protocol = "https"
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    if link is None:
        activation_link = f"{protocol}://{domain}/users/activate/{uid}/{token}/"
        email_message = render_to_string(
            email_template,
            {
                "user": user,
                "domain": domain,
                "uid": uid,
                "token": token,
                "activation_link": activation_link,
                "current_year": datetime.datetime.now().year,
            },
        )
    else:

        email_message = render_to_string(
            email_template,
            {
                "user": user,
                "domain": domain,
                "uid": uid,
                "token": token,
                "link": link,
            },
        )

    email = EmailMessage(
        subject=email_subject,
        body=email_message,
        to=[user.email],
    )
    email.content_subtype = "html"
    email.send()
    