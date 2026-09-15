"""
Configuration Django — API de contenu du portfolio BenDev.

Les valeurs sensibles sont lues depuis un fichier .env (voir .env.example).
"""

import os
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


def env_bool(name, default=False):
    return os.getenv(name, str(default)).strip().lower() in {"1", "true", "yes", "on"}


def env_list(name, default=""):
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


def env_origins(name, default=""):
    """
    Origines CORS / CSRF.

    Django exige un schéma explicite. Render, lui, fournit les hôtes nus
    (« bendev-web.onrender.com ») : on complète en https, ou en http pour
    les adresses locales.
    """
    origins = []
    for item in env_list(name, default):
        if "://" in item:
            origins.append(item.rstrip("/"))
            continue
        scheme = "http" if item.startswith(("localhost", "127.0.0.1")) else "https"
        origins.append(f"{scheme}://{item}".rstrip("/"))
    return origins


SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-dev-only-t3!2so-3ewup34#p2j98!pn^lf9q66_h=z^c3-w*n&!cpc#z1v",
)

DEBUG = env_bool("DJANGO_DEBUG", True)

ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")

# Render expose l'URL publique du service ici : on l'autorise sans avoir a
# recopier le domaine a la main dans les variables d'environnement.
_render_host = os.getenv("RENDER_EXTERNAL_HOSTNAME")
if _render_host and _render_host not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(_render_host)
    CSRF_TRUSTED_ORIGINS_EXTRA = [f"https://{_render_host}"]
else:
    CSRF_TRUSTED_ORIGINS_EXTRA = []


# Applications ------------------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Tierces
    "rest_framework",
    "corsheaders",
    # Locales
    "api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    # Sert les fichiers statiques (dont l'admin) sans serveur web dedie.
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"


# Base de données ---------------------------------------------------------

# En local : SQLite. En ligne : DATABASE_URL (Render, Supabase...).
_database = dj_database_url.config(
    default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
    conn_max_age=600,
    conn_health_checks=True,
)

# Le « transaction pooler » de Supabase (port 6543) ne sait pas gerer les
# requetes preparees de psycopg : sans ce reglage Django echoue des la
# premiere requete. Il ne garde pas non plus les connexions ouvertes entre
# deux requetes, d'ou CONN_MAX_AGE a zero.
if "pooler" in str(_database.get("HOST", "")) or str(_database.get("PORT")) == "6543":
    _database["OPTIONS"] = {
        **(_database.get("OPTIONS") or {}),
        "prepare_threshold": None,
    }
    _database["CONN_MAX_AGE"] = 0

DATABASES = {"default": _database}


AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Internationalisation ----------------------------------------------------

LANGUAGE_CODE = "fr-fr"
TIME_ZONE = os.getenv("DJANGO_TIME_ZONE", "Africa/Abidjan")
USE_I18N = True
USE_TZ = True


# Fichiers statiques et médias -------------------------------------------

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# API ---------------------------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.AnonRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {"anon": "60/hour"},
}

# Le formulaire de contact passe par un relais interne à Next.js : le
# navigateur n'appelle jamais Django directement. Ces réglages ne servent
# donc qu'au développement, ou à un appel direct à l'API depuis un autre site.
CORS_ALLOWED_ORIGINS = env_origins(
    "DJANGO_CORS_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
)

CSRF_TRUSTED_ORIGINS = env_origins(
    "DJANGO_CSRF_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
) + CSRF_TRUSTED_ORIGINS_EXTRA


# E-mail ------------------------------------------------------------------

# Aucun envoi d'e-mail dans le code aujourd'hui : le formulaire de contact
# enregistre en base puis bascule sur WhatsApp. On configure quand meme un
# backend valide, sinon Django 6 refuse le demarrage en production.
if os.getenv("DJANGO_EMAIL_HOST"):
    MAILERS = {
        "default": {
            "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
            "HOST": os.getenv("DJANGO_EMAIL_HOST"),
            "PORT": int(os.getenv("DJANGO_EMAIL_PORT", "587")),
            "USER": os.getenv("DJANGO_EMAIL_USER", ""),
            "PASSWORD": os.getenv("DJANGO_EMAIL_PASSWORD", ""),
            "USE_TLS": True,
        },
    }
elif DEBUG:
    MAILERS = {
        "default": {"BACKEND": "django.core.mail.backends.console.EmailBackend"},
    }
else:
    # Rien a envoyer : on jette silencieusement plutot que de faire croire
    # a un envoi. Renseignez DJANGO_EMAIL_HOST le jour ou c'est necessaire.
    MAILERS = {
        "default": {"BACKEND": "django.core.mail.backends.dummy.EmailBackend"},
    }
    # Django signale ce backend comme « developpement seulement ». C'est assume
    # tant qu'aucun code n'envoie d'e-mail ; a retirer en ajoutant un SMTP.
    SILENCED_SYSTEM_CHECKS = ["mail.E001"]


# Production --------------------------------------------------------------

# Render termine le TLS en amont : sans cela Django se croit en HTTP.
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
