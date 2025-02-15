from apps.common.models import TimeStampedUUIDModel
from bs4 import BeautifulSoup
from ckeditor.fields import RichTextField
from django.db import models
from django.utils.translation import gettext_lazy as _
from taggit.managers import TaggableManager


class Category(TimeStampedUUIDModel):
    name = models.CharField(max_length=100, verbose_name=_("Category Name"))

    def __str__(self):
        return f"Categories: {self.name}"

    class Meta:
        verbose_name = _("Port Category")
        verbose_name_plural = _("Port Categories")


class Technology(TimeStampedUUIDModel):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="portfolio/")
    tags = TaggableManager()

    def __str__(self):
        return f"Technology: {self.name}"

    class Meta:
        verbose_name = _("Technology")
        verbose_name_plural = _("Technologies")


class Portfolio(TimeStampedUUIDModel):
    PORTFOLIO_CHOICES_TOP = "T"
    PORTFOLIO_CHOICES_NORMAL = "N"

    PORTFOLIO_CHOICES = (
        (PORTFOLIO_CHOICES_TOP, "Top"),
        (PORTFOLIO_CHOICES_NORMAL, "Normal"),
    )

    name = models.CharField(max_length=100, verbose_name=_("Project Name"))
    client = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    rating = models.CharField(
        choices=PORTFOLIO_CHOICES, default=PORTFOLIO_CHOICES_TOP, max_length=1
    )
    web_url = models.URLField(blank=True, null=True)
    images = models.ImageField(upload_to="portfolio/")
    log_images = models.ImageField(upload_to="portfolio/", null=True, blank=True)
    top_images = models.ImageField(upload_to="portfolio/", null=True, blank=True)
    dashboard_images = models.ImageField(upload_to="portfolio/", null=True, blank=True)
    nav_images = models.ImageField(upload_to="portfolio/", null=True, blank=True)
    description = RichTextField()
    deployment = models.CharField(blank=True, null=True, max_length=255)
    echnologies = TaggableManager()

    class Meta:
        verbose_name = _("Portfolio")
        verbose_name_plural = _("Portfolios")
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)

        super(Portfolio, self).save(*args, **kwargs)


class BlogPost(TimeStampedUUIDModel):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    hero_image = models.ImageField(upload_to="blogs/heroes/")
    section = models.ManyToManyField("Section")
    general_info = models.TextField()
    conclusion = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Blog Post")
        verbose_name_plural = _("Blog Posts")
        ordering = ["-created_at"]


class Section(TimeStampedUUIDModel):
    subtitle = models.CharField(max_length=200)
    image = models.ImageField(upload_to="blogs/sections/")
    description = RichTextField()

    def __str__(self):
        return self.subtitle

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)

        super(Section, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _("Block Section")
        verbose_name_plural = _("Block Sections")


class Team(TimeStampedUUIDModel):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    designation = RichTextField()
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/")
    whatsapp = models.URLField(max_length=100)
    twitter_link = models.URLField(max_length=100)
    linkedin = models.URLField(max_length=100)
    github = models.URLField(max_length=100)

    def __str__(self):
        return self.first_name

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.designation, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.designation = str(soup)

        super(Team, self).save(*args, **kwargs)


class Experiences(TimeStampedUUIDModel):
    title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="images/experiences")
    points = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Experience")
        verbose_name_plural = _("Experiences")
        ordering = ["-created_at"]


class HoerImagesModel(TimeStampedUUIDModel):
    video = models.FileField(upload_to="videos/hero", null=True, blank=True)
    image = models.ImageField(upload_to="images/hero")
    head = models.CharField(max_length=255)
    description = RichTextField()

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)

        super(HoerImagesModel, self).save(*args, **kwargs)


class Benefits(TimeStampedUUIDModel):
    title = models.CharField(max_length=200)
    description = RichTextField()

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)

        super(Benefits, self).save(*args, **kwargs)


class ServicesCategoryModel(TimeStampedUUIDModel):
    icon = models.ImageField(upload_to="service/icon/")
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Services Category")
        verbose_name_plural = _("Services Categories")


class Services(TimeStampedUUIDModel):
    category = models.ForeignKey(ServicesCategoryModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)
    description = RichTextField()
    image = models.ImageField(upload_to="services/", null=True, blank=True)
    icon = models.ImageField(upload_to="services/icon/")
    video = models.FileField(upload_to="videos/services", null=True, blank=True)
    benefit = models.ManyToManyField(Benefits)

    def __str__(self):
        return f"{self.category.title} - {self.description[:30]}"

    class Meta:
        verbose_name = _("Service")
        verbose_name_plural = _("Services")

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)

        super(Services, self).save(*args, **kwargs)


class webCategory(TimeStampedUUIDModel):
    icon = models.ImageField(upload_to="web/icon/")
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Web Category")
        verbose_name_plural = _("Web Categories")


class WebModelImage(models.Model):
    image = models.ImageField(upload_to="web/multi_images/")

    def __str__(self):
        return f"Image for {self.id}"

    class Meta:
        verbose_name = _("Web image")
        verbose_name_plural = _("Web Images")


class WebModel(models.Model):
    category = models.ForeignKey(webCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)

    description = RichTextField()
    workflow = RichTextField(blank=True)

    images = models.ManyToManyField(WebModelImage, related_name="web_models")

    def __str__(self):
        return self.description[:40]

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.description, "html.parser")
        for tag in soup.find_all(["h1", "p"]):
            tag.unwrap()
        self.description = str(soup)
        super(WebModel, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _("Web Model")
        verbose_name_plural = _("Web Models")

