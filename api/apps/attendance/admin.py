from django.contrib import admin, messages
from django.utils import timezone

from .models import Attendance


class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("user", "day_of_week", "time", "is_present")
    list_filter = ("day_of_week", "is_present", "user")
    search_fields = ("user__username", "day_of_week", "time")

    def save_model(self, request, obj, form, change):
        now = timezone.localtime(timezone.now()).time()
        nine_thirty_am = timezone.datetime.strptime("09:30", "%H:%M").time()

        if now > nine_thirty_am and obj.is_present:
            messages.error(
                request, "Attendance can only be marked as present before 9:30 AM."
            )
            return

        super().save_model(request, obj, form, change)


admin.site.register(Attendance, AttendanceAdmin)
