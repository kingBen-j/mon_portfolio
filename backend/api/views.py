"""
Endpoints de l'API.

Le front Next.js n'appelle qu'un seul endpoint (/api/site/) pour construire
toutes les pages, et poste les messages sur /api/contact/.
Les endpoints unitaires restent disponibles pour un usage ponctuel.
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Certification,
    Education,
    Project,
    Service,
    SiteProfile,
    SkillGroup,
    Social,
    Stat,
)
from .serializers import ContactMessageSerializer


def absolute(request, file_field):
    """URL complète d'un média, ou None si le champ est vide."""
    if not file_field:
        return None
    return request.build_absolute_uri(file_field.url)


def build_profile(request):
    profile = SiteProfile.objects.first()
    if profile is None:
        return None

    return {
        "brand": profile.brand,
        "brandPrefix": profile.brand[:3],
        "brandSuffix": profile.brand[3:],
        "baseline": profile.baseline,
        "fullName": profile.full_name,
        "role": profile.role,
        "location": profile.location,
        "email": profile.email,
        "availability": profile.availability,
        "whatsapp": profile.whatsapp,
        "photo": absolute(request, profile.photo),
        "photoAbout": (
            absolute(request, profile.photo_about)
            or absolute(request, profile.photo)
        ),
        "heroLine": [profile.hero_before, profile.hero_highlight, profile.hero_after],
        "heroIntro": profile.hero_intro,
        "about": {
            "intro": profile.about_intro,
            "paragraphs": profile.paragraphs,
            "interests": profile.interest_list,
        },
        "stats": [
            {"value": s.value, "label": s.label, "note": s.note}
            for s in Stat.objects.all()
        ],
        "socials": [
            {"label": s.label, "url": s.url, "handle": s.handle or s.label}
            for s in Social.objects.all()
        ],
    }


def build_skill_groups():
    groups = SkillGroup.objects.prefetch_related("skills")
    return [
        {
            "title": g.title,
            "kicker": g.kicker,
            "summary": g.summary,
            "items": [{"name": s.name, "level": s.level} for s in g.skills.all()],
        }
        for g in groups
    ]


def build_projects(request):
    return [
        {
            "title": p.title,
            "category": p.category,
            "description": p.description,
            "stack": p.stack_list,
            "year": p.year,
            "repo_url": p.repo_url,
            "demo_url": p.demo_url,
            "image": absolute(request, p.image),
            "featured": p.featured,
        }
        for p in Project.objects.all()
    ]


def build_education():
    return [
        {
            "period": e.period,
            "degree": e.degree,
            "school": e.school,
            "city": e.city,
            "description": e.description,
            "highlights": e.highlight_list,
        }
        for e in Education.objects.all()
    ]


def build_certifications():
    return [
        {"title": c.title, "issuer": c.issuer, "year": c.year, "url": c.url}
        for c in Certification.objects.all()
    ]


def build_services():
    return [
        {"title": s.title, "description": s.description} for s in Service.objects.all()
    ]


@api_view(["GET"])
def site_content(request):
    """Tout le contenu du portfolio en une seule requête."""
    profile = build_profile(request)

    # Tant que l'admin n'a pas été rempli, on laisse le front utiliser
    # ses données locales plutôt que de renvoyer une coquille vide.
    if profile is None:
        return Response(
            {"detail": "Aucun profil enregistré. Renseignez-le dans /admin."},
            status=status.HTTP_404_NOT_FOUND,
        )

    collections = {
        "skillGroups": build_skill_groups(),
        "projects": build_projects(request),
        "education": build_education(),
        "certifications": build_certifications(),
        "services": build_services(),
    }

    # Une collection vide n'est pas renvoyée : le front garde alors sa
    # valeur locale au lieu d'afficher une section vidée par erreur.
    payload = {"profile": profile}
    payload.update({key: value for key, value in collections.items() if value})

    return Response(payload)


@api_view(["GET"])
def projects_list(request):
    return Response(build_projects(request))


@api_view(["GET"])
def skills_list(request):
    return Response(build_skill_groups())


@api_view(["GET"])
def education_list(request):
    return Response({"education": build_education(), "certifications": build_certifications()})


@api_view(["POST"])
def contact(request):
    """Enregistre le message ; le front enchaîne ensuite sur WhatsApp."""
    serializer = ContactMessageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(
        {"detail": "Message enregistré.", "data": serializer.data},
        status=status.HTTP_201_CREATED,
    )
