from django.contrib import admin

from .models import (
    BlogPost,
    Category,
    Experiences,
    Portfolio,
    Section,
    Team,
    Technology,
    HoerImagesModel
)

admin.site.register(Portfolio)
admin.site.register(Technology)
admin.site.register(Category)
admin.site.register(Section)
admin.site.register(BlogPost)
admin.site.register(Experiences)
admin.site.register(Team)
admin.site.register(HoerImagesModel)




