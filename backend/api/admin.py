"""
Administration : c'est ici que tout le contenu du portfolio se remplit.
"""

from django.contrib import admin

from .models import (
    Certification,
    ContactMessage,
    Education,
    Project,
    Service,
    SiteProfile,
    Skill,
    SkillGroup,
    Social,
    Stat,
)


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Identité", {
            "fields": ("brand", "baseline", "full_name", "role", "location",
                       "email", "availability", "photo", "photo_about"),
        }),
        ("Page d'accueil", {
            "fields": ("hero_before", "hero_highlight", "hero_after", "hero_intro"),
            "description": "Le « mot bleu » est celui mis en avant dans le grand titre.",
        }),
        ("À propos", {
            "fields": ("about_intro", "about_body", "interests"),
        }),
        ("Contact", {
            "fields": ("whatsapp",),
        }),
    )

    def has_add_permission(self, request):
        # Un seul profil : on évite les doublons.
        return not SiteProfile.objects.exists()


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 4
    fields = ("name", "level", "order")


@admin.register(SkillGroup)
class SkillGroupAdmin(admin.ModelAdmin):
    list_display = ("title", "kicker", "order")
    list_editable = ("order",)
    inlines = [SkillInline]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "year", "featured", "order")
    list_editable = ("featured", "order")
    list_filter = ("featured", "category")
    search_fields = ("title", "description", "stack")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "school", "period", "order")
    list_editable = ("order",)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "year", "order")
    list_editable = ("order",)


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ("value", "label", "order")
    list_editable = ("order",)


@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    list_display = ("label", "handle", "url", "order")
    list_editable = ("order",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    list_editable = ("order",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "handled")
    list_filter = ("handled", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "subject", "message", "created_at")
    list_editable = ("handled",)

    def has_add_permission(self, request):
        # Les messages arrivent par le formulaire, pas à la main.
        return False
