"""
Pré-remplit la base avec les informations déjà connues de BenDev.

Commande idempotente : on peut la relancer sans créer de doublons.
Les compétences, projets et formations restent à saisir dans /admin.

    python manage.py seed_content
"""

from django.core.management.base import BaseCommand

from api.models import (
    Education,
    Project,
    Service,
    SiteProfile,
    Skill,
    SkillGroup,
    Social,
)

PARAGRAPHS = [
    "L'informatique m'accompagne depuis tout petit. Ce qui a commencé par de la "
    "curiosité — comprendre comment les choses fonctionnent derrière l'écran — est "
    "devenu mon métier. Je conçois et développe des sites et des applications web, "
    "du premier échange jusqu'à la mise en ligne.",
    "Le développement web est ma passion principale, mais je m'intéresse de près au "
    "réseau et à la sécurité. Un produit ne tient pas seulement à son interface : il "
    "tient aussi à l'infrastructure qui le porte et à ce qui le protège.",
    "Je me forme en autodidacte depuis 2025. Ce que je sais faire, je l'ai appris "
    "en construisant : "
    "documentation, essais, erreurs, et des projets menés jusqu'au bout. L'université "
    "m'apporte les fondations théoriques depuis 2024, la pratique fait le reste — et "
    "les deux se nourrissent l'une l'autre.",
    "En freelance, je travaille en direct avec vous. Pas d'intermédiaire, pas de "
    "jargon inutile : on parle de votre idée, je vous dis ce qui est faisable, et on "
    "la transforme en réalité.",
]

PROFILE = {
    "brand": "BenDev",
    "baseline": "L'informatique au service de vos idées",
    "full_name": "Coulibaly Israel",
    "role": "Développeur Web · Freelance",
    "location": "Abidjan, Côte d'Ivoire",
    "email": "coulibalyisrael727@gmail.com",
    "availability": "Freelance · Disponible",
    "hero_before": "Je transforme vos",
    "hero_highlight": "idées",
    "hero_after": "en réalité.",
    "hero_intro": (
        "Développeur web freelance basé à Abidjan. Amoureux de l'informatique depuis "
        "l'enfance, je conçois des sites et des applications qui tiennent la route."
    ),
    "about_intro": (
        "Amoureux de l'informatique depuis l'enfance, étudiant en Sciences "
        "Informatiques à Abidjan et développeur web freelance — autodidacte depuis 2025."
    ),
    "about_body": "\n\n".join(PARAGRAPHS),
    "interests": "Musique, Basket, Foi",
    "photo": "portrait/portrait.jpg",
    "photo_about": "portrait/portrait-apropos.jpg",
    "whatsapp": "2250711025713",
}

SOCIALS = [
    {"label": "GitHub", "url": "https://github.com/Kingben-j", "handle": "@Kingben-j", "order": 0},
]

SERVICES = [
    {
        "title": "Développement web",
        "description": (
            "Sites vitrines, plateformes et applications web. De la maquette au "
            "déploiement, avec un code lisible et maintenable."
        ),
        "order": 0,
    },
    {
        "title": "Réseau & infrastructure",
        "description": (
            "Comprendre et maîtriser ce qui se passe sous l'interface : ce qui fait "
            "tenir une application debout une fois en ligne."
        ),
        "order": 1,
    },
    {
        "title": "Sécurité",
        "description": (
            "Penser la protection des données dès la conception plutôt que de la "
            "rajouter après coup."
        ),
        "order": 2,
    },
]


PROJECTS = [
    {
        "title": "HoopCI — le sport de rue ivoirien",
        "category": "PWA · Plateforme sportive",
        "description": (
            "Application web progressive dédiée au sport de rue à Abidjan. Elle "
            "référence les tournois de basket et de football, et surtout : elle permet "
            "aux joueurs qui n'évoluent dans aucun club d'exister officiellement. "
            "Profil, niveau reconnu, visibilité auprès des recruteurs — le talent ne "
            "dépend plus d'une licence."
        ),
        "stack": "",  # À compléter
        "year": "",  # À compléter
        "image": "projets/hoopci.jpg",
        "featured": True,
        "order": 0,
    },
    {
        "title": "The Safe Place — podcasts chrétiens",
        "category": "Plateforme de contenus",
        "description": (
            "Un refuge numérique pour la foi : podcasts, vidéos et méditations "
            "bibliques à écouter quand on veut, et émissions en direct à suivre depuis "
            "la même interface. Pensé pour édifier et fortifier au quotidien, sans "
            "détour par cinq applications différentes."
        ),
        "stack": "",  # À compléter
        "year": "",  # À compléter
        "image": "projets/safe-place.jpg",
        "featured": True,
        "order": 1,
    },
    {
        "title": "Capture de trames — PAP vs CHAP",
        "category": "Réseau & Sécurité",
        "description": (
            "Simulateur interactif qui compare deux protocoles d'authentification PPP : "
            "PAP, qui transmet le mot de passe en clair, et CHAP, qui protège l'échange "
            "par challenge/response. Terminaux client et serveur côte à côte, trames "
            "décortiquées en direct, journal de trafic et matrice de sécurité."
        ),
        "stack": "",  # À compléter
        "year": "",  # À compléter
        "image": "projets/pap-chap.png",
        "featured": True,
        "order": 2,
    },
]


EDUCATION = [
    {
        "period": "2025 — en cours",
        "degree": "Apprentissage en autodidacte",
        "school": "",
        "city": "",
        "description": (
            "Développement web, frameworks et outils appris seul : documentation "
            "officielle, essais répétés, et des projets réels menés jusqu'à la mise en "
            "ligne. C'est de là que vient l'essentiel de mes compétences pratiques."
        ),
        "order": 0,
    },
    {
        "period": "2024 — en cours",
        "degree": "Sciences Informatiques (SI) — 3ᵉ année",
        "school": "UIST",
        "city": "Abidjan, Côte d'Ivoire",
        "description": (
            "Formation universitaire en sciences informatiques : algorithmique, "
            "développement, bases de données, réseaux et sécurité. Actuellement en "
            "troisième année (2026). Les projets menés "
            "en parallèle prolongent directement ce qui est étudié en cours."
        ),
        "order": 1,
    },
    {
        "period": "2024",
        "degree": "Baccalauréat",
        "school": "",  # À compléter : nom du lycée
        "city": "",
        "description": (
            "Obtention du baccalauréat, puis entrée à l'université la même année."
        ),
        "order": 2,
    },
]


SKILL_GROUPS = [
    {
        "title": "Fondations du web",
        "kicker": "STRUCTURE & STYLE",
        "summary": (
            "La base de tout ce que je construis : un balisage propre et une mise en "
            "page qui tient sur tous les écrans."
        ),
        "order": 0,
        "skills": [("HTML & CSS", 60), ("JavaScript", 30)],
    },
    {
        "title": "Interfaces & mobile",
        "kicker": "CÔTÉ UTILISATEUR",
        "summary": (
            "Construire des interfaces réactives, sur le web comme sur mobile, à "
            "partir de composants réutilisables."
        ),
        "order": 1,
        "skills": [("React JS", 35), ("Flutter", 30), ("React Native", 20)],
    },
    {
        "title": "Intelligence artificielle",
        "kicker": "SYSTÈMES INTELLIGENTS",
        "summary": (
            "Concevoir des systèmes qui raisonnent et agissent : intégration de modèles "
            "de langage, agents autonomes et automatisation de tâches complexes."
        ),
        "order": 2,
        "skills": [("IA & développement agentique", 55)],
    },
    {
        "title": "Back-end & logique",
        "kicker": "CÔTÉ SERVEUR",
        "summary": (
            "Modéliser les données, écrire les règles métier et exposer des API que le "
            "front peut consommer sereinement."
        ),
        "order": 3,
        "skills": [("Python", 45), ("Django", 40)],
    },
    {
        "title": "Outils & infrastructure",
        "kicker": "ENVIRONNEMENT",
        "summary": (
            "Versionner, déployer et comprendre ce qui se passe entre le code et la "
            "machine qui le fait tourner."
        ),
        "order": 4,
        "skills": [("Git / GitHub", 50), ("Réseau & architecture", 35), ("Docker", 25)],
    },
]


class Command(BaseCommand):
    help = "Remplit la base avec les informations connues de BenDev."

    def handle(self, *args, **options):
        existing = SiteProfile.objects.first()
        if existing:
            for field, value in PROFILE.items():
                setattr(existing, field, value)
            existing.save()
            self.stdout.write(self.style.SUCCESS("Profil mis à jour."))
        else:
            SiteProfile.objects.create(**PROFILE)
            self.stdout.write(self.style.SUCCESS("Profil créé."))

        for social in SOCIALS:
            Social.objects.update_or_create(
                label=social["label"],
                defaults=social,
            )
        self.stdout.write(self.style.SUCCESS(f"{len(SOCIALS)} lien(s) enregistré(s)."))

        for service in SERVICES:
            Service.objects.update_or_create(
                title=service["title"],
                defaults=service,
            )
        self.stdout.write(
            self.style.SUCCESS(f"{len(SERVICES)} champ(s) d'intervention enregistré(s).")
        )

        # get_or_create (et non update_or_create) : un projet déjà complété
        # dans l'admin ne doit pas être écrasé si la commande est rejouée.
        created = 0
        for project in PROJECTS:
            obj, was_created = Project.objects.get_or_create(
                title=project["title"],
                defaults=project,
            )
            created += int(was_created)
            # Un projet déjà créé sans visuel récupère celui fourni ici.
            if not was_created and not obj.image and project.get("image"):
                obj.image = project["image"]
                obj.order = project["order"]
                obj.save(update_fields=["image", "order"])
        self.stdout.write(
            self.style.SUCCESS(
                f"{created} projet(s) ajouté(s), {len(PROJECTS) - created} déjà présent(s)."
            )
        )

        for group_data in SKILL_GROUPS:
            skills = group_data.pop("skills", [])
            group, _ = SkillGroup.objects.get_or_create(
                title=group_data["title"],
                defaults=group_data,
            )
            for position, (name, level) in enumerate(skills):
                Skill.objects.get_or_create(
                    group=group,
                    name=name,
                    defaults={"level": level, "order": position},
                )
            group_data["skills"] = skills
        self.stdout.write(
            self.style.SUCCESS(f"{len(SKILL_GROUPS)} groupe(s) de compétences enregistré(s).")
        )

        for entry in EDUCATION:
            Education.objects.get_or_create(
                degree=entry["degree"],
                school=entry["school"],
                defaults=entry,
            )
        self.stdout.write(
            self.style.SUCCESS(f"{len(EDUCATION)} formation(s) enregistrée(s).")
        )

        self.stdout.write(
            self.style.WARNING(
                "Restent à saisir dans /admin : certifications, chiffres clés, "
                "les années de formation et les technos/liens des projets."
            )
        )
