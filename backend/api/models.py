"""
Modèles de contenu du portfolio.

Tout le texte affiché sur le site est éditable depuis l'admin Django :
/admin — aucun besoin de toucher au code pour mettre à jour le portfolio.
"""

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Ordered(models.Model):
    """Base commune : un ordre d'affichage explicite."""

    order = models.PositiveIntegerField("ordre d'affichage", default=0)

    class Meta:
        abstract = True
        ordering = ["order", "id"]


class SiteProfile(models.Model):
    """Identité du site. Une seule instance est utilisée (la première)."""

    # Identité
    brand = models.CharField("marque", max_length=60, default="BenDev")
    baseline = models.CharField(
        "baseline", max_length=160, default="L'informatique au service de vos idées"
    )
    full_name = models.CharField("nom complet", max_length=120)
    role = models.CharField("titre professionnel", max_length=160)
    location = models.CharField("localisation", max_length=120, blank=True)
    email = models.EmailField("e-mail", blank=True)
    availability = models.CharField("disponibilité", max_length=120, blank=True)
    photo = models.ImageField(
        "portrait — accueil", upload_to="portrait/", blank=True, null=True
    )
    photo_about = models.ImageField(
        "portrait — page À propos",
        upload_to="portrait/",
        blank=True,
        null=True,
        help_text="Facultatif : si vide, le portrait d'accueil est réutilisé.",
    )

    # Accueil
    hero_before = models.CharField("titre — début", max_length=80, default="Je construis des")
    hero_highlight = models.CharField("titre — mot bleu", max_length=80, default="systèmes")
    hero_after = models.CharField("titre — fin", max_length=80, default="qui durent.")
    hero_intro = models.TextField("accroche d'accueil", blank=True)

    # À propos
    about_intro = models.TextField("à propos — introduction", blank=True)
    about_body = models.TextField(
        "à propos — paragraphes",
        blank=True,
        help_text="Un paragraphe par ligne vide séparée.",
    )
    interests = models.CharField(
        "centres d'intérêt",
        max_length=400,
        blank=True,
        help_text="Séparés par des virgules.",
    )

    # Contact
    whatsapp = models.CharField(
        "numéro WhatsApp",
        max_length=20,
        default="2250711025713",
        help_text="Format international sans « + » ni espace.",
    )

    class Meta:
        verbose_name = "profil du site"
        verbose_name_plural = "profil du site"

    def __str__(self):
        return f"{self.brand} — {self.full_name}"

    @property
    def paragraphs(self):
        return [p.strip() for p in self.about_body.split("\n\n") if p.strip()]

    @property
    def interest_list(self):
        return [i.strip() for i in self.interests.split(",") if i.strip()]


class Stat(Ordered):
    """Chiffre clé affiché sur l'accueil et la page À propos."""

    value = models.CharField("valeur", max_length=20)
    label = models.CharField("libellé", max_length=60)
    note = models.CharField("précision", max_length=160, blank=True)

    class Meta(Ordered.Meta):
        verbose_name = "chiffre clé"
        verbose_name_plural = "chiffres clés"

    def __str__(self):
        return f"{self.value} — {self.label}"


class Social(Ordered):
    label = models.CharField("plateforme", max_length=40)
    url = models.URLField("lien")
    handle = models.CharField("pseudo affiché", max_length=80, blank=True)

    class Meta(Ordered.Meta):
        verbose_name = "réseau / lien"
        verbose_name_plural = "réseaux / liens"

    def __str__(self):
        return self.label


class Service(Ordered):
    title = models.CharField("titre", max_length=80)
    description = models.TextField("description")

    class Meta(Ordered.Meta):
        verbose_name = "champ d'intervention"
        verbose_name_plural = "champs d'intervention"

    def __str__(self):
        return self.title


class SkillGroup(Ordered):
    title = models.CharField("domaine", max_length=80)
    kicker = models.CharField("étiquette", max_length=60, blank=True)
    summary = models.TextField("résumé", blank=True)

    class Meta(Ordered.Meta):
        verbose_name = "groupe de compétences"
        verbose_name_plural = "groupes de compétences"

    def __str__(self):
        return self.title


class Skill(Ordered):
    group = models.ForeignKey(
        SkillGroup, related_name="skills", on_delete=models.CASCADE, verbose_name="groupe"
    )
    name = models.CharField("technologie", max_length=60)
    level = models.PositiveSmallIntegerField(
        "niveau",
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Pourcentage de 0 à 100. Laisser 0 pour n'afficher aucune barre.",
    )

    class Meta(Ordered.Meta):
        verbose_name = "compétence"
        verbose_name_plural = "compétences"

    def __str__(self):
        return self.name


class Project(Ordered):
    title = models.CharField("nom du projet", max_length=120)
    category = models.CharField("catégorie", max_length=60, blank=True)
    description = models.TextField("description")
    stack = models.CharField(
        "technologies", max_length=300, blank=True, help_text="Séparées par des virgules."
    )
    year = models.CharField("année", max_length=20, blank=True)
    repo_url = models.URLField("lien du code", blank=True)
    demo_url = models.URLField("lien de démonstration", blank=True)
    image = models.ImageField("visuel", upload_to="projets/", blank=True, null=True)
    featured = models.BooleanField("mis en avant sur l'accueil", default=False)

    class Meta(Ordered.Meta):
        ordering = ["-featured", "order", "-id"]
        verbose_name = "projet"
        verbose_name_plural = "projets"

    def __str__(self):
        return self.title

    @property
    def stack_list(self):
        return [t.strip() for t in self.stack.split(",") if t.strip()]


class Education(Ordered):
    period = models.CharField("période", max_length=40, help_text="ex : 2021 — 2024")
    degree = models.CharField("diplôme / intitulé", max_length=160)
    school = models.CharField("établissement", max_length=160)
    city = models.CharField("ville", max_length=80, blank=True)
    description = models.TextField("description", blank=True)
    highlights = models.CharField(
        "points clés", max_length=300, blank=True, help_text="Séparés par des virgules."
    )

    class Meta(Ordered.Meta):
        verbose_name = "formation"
        verbose_name_plural = "formations"

    def __str__(self):
        return f"{self.degree} — {self.school}"

    @property
    def highlight_list(self):
        return [h.strip() for h in self.highlights.split(",") if h.strip()]


class Certification(Ordered):
    title = models.CharField("intitulé", max_length=160)
    issuer = models.CharField("organisme", max_length=120)
    year = models.CharField("année", max_length=20, blank=True)
    url = models.URLField("lien", blank=True)

    class Meta(Ordered.Meta):
        verbose_name = "certification"
        verbose_name_plural = "certifications"

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Message envoyé depuis le formulaire, avant bascule vers WhatsApp."""

    name = models.CharField("nom", max_length=120)
    email = models.EmailField("e-mail")
    subject = models.CharField("sujet", max_length=160, blank=True)
    message = models.TextField("message")
    created_at = models.DateTimeField("reçu le", auto_now_add=True)
    handled = models.BooleanField("traité", default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "message reçu"
        verbose_name_plural = "messages reçus"

    def __str__(self):
        return f"{self.name} — {self.created_at:%d/%m/%Y %H:%M}"
