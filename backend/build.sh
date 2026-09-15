#!/usr/bin/env bash
# Build Render : installe, collecte les statiques, applique les migrations.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
