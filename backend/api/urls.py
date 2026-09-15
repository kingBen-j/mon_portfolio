from django.urls import path

from . import views

urlpatterns = [
    path("site/", views.site_content, name="site-content"),
    path("projects/", views.projects_list, name="projects"),
    path("skills/", views.skills_list, name="skills"),
    path("education/", views.education_list, name="education"),
    path("contact/", views.contact, name="contact"),
]
