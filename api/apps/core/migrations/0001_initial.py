# Generated by Django 5.1.5 on 2025-02-16 10:48

import ckeditor.fields
import django.db.models.deletion
import taggit.managers
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('taggit', '0006_rename_taggeditem_content_type_object_id_taggit_tagg_content_8fc721_idx'),
    ]

    operations = [
        migrations.CreateModel(
            name='Benefits',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('description', ckeditor.fields.RichTextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='Category Name')),
            ],
            options={
                'verbose_name': 'Port Category',
                'verbose_name_plural': 'Port Categories',
            },
        ),
        migrations.CreateModel(
            name='Experiences',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('company_name', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='images/experiences')),
                ('points', models.TextField()),
            ],
            options={
                'verbose_name': 'Experience',
                'verbose_name_plural': 'Experiences',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='HoerImagesModel',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('video', models.FileField(blank=True, null=True, upload_to='videos/hero')),
                ('image', models.ImageField(upload_to='images/hero')),
                ('head', models.CharField(max_length=255)),
                ('description', ckeditor.fields.RichTextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('subtitle', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='blogs/sections/')),
                ('description', ckeditor.fields.RichTextField()),
            ],
            options={
                'verbose_name': 'Block Section',
                'verbose_name_plural': 'Block Sections',
            },
        ),
        migrations.CreateModel(
            name='ServicesCategoryModel',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('icon', models.ImageField(upload_to='service/icon/')),
                ('title', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Services Category',
                'verbose_name_plural': 'Services Categories',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('designation', ckeditor.fields.RichTextField()),
                ('photo', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('whatsapp', models.URLField(max_length=100)),
                ('twitter_link', models.URLField(max_length=100)),
                ('linkedin', models.URLField(max_length=100)),
                ('github', models.URLField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='webCategory',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('icon', models.ImageField(upload_to='web/icon/')),
                ('title', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Web Category',
                'verbose_name_plural': 'Web Categories',
            },
        ),
        migrations.CreateModel(
            name='WebModelImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='web/multi_images/')),
            ],
            options={
                'verbose_name': 'Web image',
                'verbose_name_plural': 'Web Images',
            },
        ),
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='Project Name')),
                ('client', models.CharField(max_length=255)),
                ('rating', models.CharField(choices=[('T', 'Top'), ('N', 'Normal')], default='T', max_length=1)),
                ('web_url', models.URLField(blank=True, null=True)),
                ('images', models.ImageField(upload_to='portfolio/')),
                ('log_images', models.ImageField(blank=True, null=True, upload_to='portfolio/')),
                ('top_images', models.ImageField(blank=True, null=True, upload_to='portfolio/')),
                ('dashboard_images', models.ImageField(blank=True, null=True, upload_to='portfolio/')),
                ('nav_images', models.ImageField(blank=True, null=True, upload_to='portfolio/')),
                ('description', ckeditor.fields.RichTextField()),
                ('deployment', models.CharField(blank=True, max_length=255, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.category')),
                ('echnologies', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'verbose_name': 'Portfolio',
                'verbose_name_plural': 'Portfolios',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('hero_image', models.ImageField(upload_to='blogs/heroes/')),
                ('general_info', models.TextField()),
                ('conclusion', models.TextField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.category')),
                ('section', models.ManyToManyField(to='core.section')),
            ],
            options={
                'verbose_name': 'Blog Post',
                'verbose_name_plural': 'Blog Posts',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('description', ckeditor.fields.RichTextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='services/')),
                ('icon', models.ImageField(upload_to='services/icon/')),
                ('video', models.FileField(blank=True, null=True, upload_to='videos/services')),
                ('benefit', models.ManyToManyField(to='core.benefits')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.servicescategorymodel')),
            ],
            options={
                'verbose_name': 'Service',
                'verbose_name_plural': 'Services',
            },
        ),
        migrations.CreateModel(
            name='Technology',
            fields=[
                ('pkid', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100)),
                ('icon', models.ImageField(upload_to='portfolio/')),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'verbose_name': 'Technology',
                'verbose_name_plural': 'Technologies',
            },
        ),
        migrations.CreateModel(
            name='WebModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255)),
                ('description', ckeditor.fields.RichTextField()),
                ('workflow', ckeditor.fields.RichTextField(blank=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.webcategory')),
                ('images', models.ManyToManyField(related_name='web_models', to='core.webmodelimage')),
            ],
            options={
                'verbose_name': 'Web Model',
                'verbose_name_plural': 'Web Models',
            },
        ),
    ]
