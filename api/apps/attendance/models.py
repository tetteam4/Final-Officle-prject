import datetime

from bs4 import BeautifulSoup
from ckeditor.fields import RichTextField
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Attendance(models.Model):
    DAYS_OF_WEEK_CHOICES = (
        ("Monday", _("Monday")),
        ("Tuesday", _("Tuesday")),
        ("Wednesday", _("Wednesday")),
        ("Thursday", _("Thursday")),
        ("Friday", _("Friday")),
        ("Saturday", _("Saturday")),
        ("Sunday", _("Sunday")),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day_of_week = models.CharField(
        max_length=9,
        choices=DAYS_OF_WEEK_CHOICES,
        verbose_name=_("Day of the Week"),
        blank=True,
    )

    time = models.TimeField(verbose_name=_("Time"))

    is_present = models.BooleanField(default=False, verbose_name=_("Present"))

    def __str__(self):
        return f"{self.day_of_week} - {self.time} - {'Present' if self.is_present else 'Absent'}"

    def clean(self):
        if Attendance.objects.filter(
            user=self.user, day_of_week=self.day_of_week
        ).exists():
            raise ValidationError(_("A user can only mark attendance once per day."))

        now = timezone.localtime(timezone.now()).time()
        nine_thirty_am = timezone.datetime.strptime("09:30", "%H:%M").time()

        if now > nine_thirty_am:
            if self.is_present:
                raise ValidationError(
                    _("Attendance can only be marked as present before 9:30 AM.")
                )

    def save(self, *args, **kwargs):
        if not self.day_of_week:
            today = datetime.datetime.today().strftime("%A")
            self.day_of_week = today

        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _("Attendance")
        verbose_name_plural = _("Attendances")
        ordering = ["time", "day_of_week"]


class WorkflowModel(models.Model):
    title = models.CharField(max_length=255)
    description = RichTextField()
    image = models.ImageField(upload_to="images/workflow/")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)
        super(WorkflowModel, self).save(*args, **kwargs)
