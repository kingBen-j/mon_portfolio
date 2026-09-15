#!/usr/bin/env bash
# Build Render : installe, collecte les statiques, applique les migrations.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# L'offre gratuite Render n'ouvre pas de shell : on cree le compte admin ici,
# a partir des variables DJANGO_SUPERUSER_*. Django ne recree pas un compte
# existant, la commande est donc rejouable a chaque deploiement.
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  python manage.py createsuperuser --noinput || echo "compte admin deja present"
fi

# Remet en base l'identite, les liens et les champs d'intervention.
python manage.py seed_content
