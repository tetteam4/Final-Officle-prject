from django.contrib import admin

from .models import BlogPost, Category, Portfolio, Section, Technology
from .models import Team
admin.site.register(Portfolio)
admin.site.register(Technology)
admin.site.register(Category)
admin.site.register(Section)
admin.site.register(BlogPost)
admin.site.register(Team)


