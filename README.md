# BenDev — Portfolio

> L'informatique au service de vos idées.

Portfolio personnel en deux parties :

| Dossier | Rôle | Stack |
| --- | --- | --- |
| `frontend/` | Le site public (6 pages) | Next.js 16 · React 19 · Tailwind 4 |
| `backend/` | L'API de contenu + admin | Django 6 · Django REST Framework · SQLite |

Le contenu du site se remplit depuis l'**admin Django** — aucun besoin de toucher
au code pour mettre à jour un projet, une compétence ou une formation.

---

## Démarrer

Deux terminaux, un pour chaque partie.

### 1 · Backend Django (port 8000)

```bash
cd backend
.venv/Scripts/python.exe manage.py createsuperuser   # à faire une seule fois
.venv/Scripts/python.exe manage.py seed_content      # recharge les infos de base
.venv/Scripts/python.exe manage.py runserver
```

`seed_content` remet en base l'identité, les liens et les champs d'intervention.
La commande est rejouable sans créer de doublons.

- API : http://127.0.0.1:8000/api/site/
- Administration : http://127.0.0.1:8000/admin/

### 2 · Frontend Next.js (port 3000)

```bash
cd frontend
npm run dev
```

Site : http://localhost:3000

---

## Remplir le contenu

Rendez-vous sur http://127.0.0.1:8000/admin/ puis :

1. **Profil du site** — nom, titre, localisation, accroche d'accueil, texte
   « À propos », numéro WhatsApp, portrait.
2. **Chiffres clés** — les 4 statistiques de l'accueil.
3. **Champs d'intervention** — les 3 cartes « Du réseau au produit fini ».
4. **Groupes de compétences** — un groupe par domaine, avec ses technologies.
5. **Projets** — cochez « mis en avant » pour les faire apparaître sur l'accueil.
6. **Formations** et **Certifications** — la page Formation.
7. **Réseaux / liens** — GitHub, LinkedIn…

> Tant qu'un profil n'existe pas, l'API répond `404` et le site affiche les
> valeurs locales de `frontend/src/data/profile.js`. Le portfolio reste donc
> consultable même backend éteint.

---

## Le site en ligne

| | URL |
| --- | --- |
| Site | **https://bendev-web.onrender.com** |
| API | https://bendev-api.onrender.com/api/site/ |
| Admin | https://bendev-api.onrender.com/admin/ |

Les deux services sont hébergés sur **Render** (région Francfort), déployés
automatiquement à chaque `push` sur `main`.

| Service | Rôle | Build | Démarrage |
| --- | --- | --- | --- |
| `bendev-web` | Next.js | `cd frontend && npm ci && npm run build` | `cd frontend && npm start` |
| `bendev-api` | Django | `cd backend && ./build.sh` | `gunicorn config.wsgi:application` |

`build.sh` installe, collecte les statiques, migre, crée le compte admin
(variables `DJANGO_SUPERUSER_*`) puis rejoue `seed_content`. L'offre gratuite
n'ouvre pas de shell : tout doit passer par là.

### Reste à faire : brancher Postgres

Une base `bendev-db` est créée mais **pas encore reliée**. Tant que
`DATABASE_URL` est absente, Django écrit dans un SQLite recréé à chaque
build : le site fonctionne, mais toute saisie faite dans l'admin disparaît
au déploiement suivant.

Dashboard Render → `bendev-api` → *Environment* → *Add Environment Variable*
→ **Add from database** → `bendev-db`, *Internal Connection String*, clé
`DATABASE_URL`.

### Ce qu'il faut savoir

- **Les services gratuits s'endorment** après 15 minutes sans trafic : la
  première visite peut attendre ~50 secondes. Si l'API dort quand le front
  se réveille, `api.js` retombe sur `frontend/src/data/profile.js` et le
  site reste affichable.
- **La base gratuite expire au bout de 30 jours.** Render la supprimera ;
  il faudra passer à l'offre payante ou en recréer une.
- **Les images ajoutées depuis l'admin ne persistent pas** (disque
  éphémère). Celles du portfolio sont versionnées dans `backend/media/`,
  donc toujours présentes. Pour des ajouts durables : Cloudinary ou S3.

### Déployer le front sur Netlify

Le fichier `netlify.toml` à la racine du dépôt configure le déploiement du
portfolio : la commande `npm ci --include=dev && npm run build` installe les
dépendances verrouillées dans `frontend/`, puis compile l'application dans
ce dossier et utilise la sortie `.next`. Cette installation explicite permet
aussi les déploiements via la CLI sans dépendances préinstallées et inclut
Tailwind et PostCSS, nécessaires à la compilation. L'adaptateur
Next.js de Netlify prend en charge les pages et la route `/api/contact`.
Il ne faut pas publier la racine du dépôt ou seulement `frontend/public/` :
ces dossiers ne contiennent pas l'application compilée.

Le backend Django reste hébergé séparément. Pour utiliser son contenu,
configurez `NEXT_PUBLIC_API_URL` dans les variables d'environnement du site
Netlify avec l'adresse publique de votre API, puis redéployez. Sans API
accessible, le portfolio affiche les données locales de secours ; les
messages du formulaire ne sont pas enregistrés dans Django.

### Passer le front sur Vercel

Possible à tout moment, et préférable (pas de mise en veille) :
[vercel.com/new](https://vercel.com/new) → importer le dépôt → *Root
Directory* `frontend` → variable `NEXT_PUBLIC_API_URL` =
`https://bendev-api.onrender.com`. Ajouter ensuite l'URL Vercel dans
`DJANGO_CORS_ORIGINS` et `DJANGO_CSRF_ORIGINS` côté Render.

---

## Structure des pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil — hero portrait + typo géante, chiffres, aperçu compétences et projets |
| `/a-propos` | Parcours, méthode de travail, centres d'intérêt |
| `/competences` | Tous les domaines techniques |
| `/projets` | Le portfolio complet |
| `/formation` | Timeline des diplômes + certifications |
| `/contact` | WhatsApp en direct + formulaire |

---

## Contact WhatsApp

Tous les boutons de contact ouvrent une conversation WhatsApp sur
**+225 07 11 02 57 13**. Le formulaire de la page Contact enregistre d'abord le
message dans Django (visible dans *Messages reçus*), puis bascule sur WhatsApp
avec le message déjà rédigé.

Pour changer le numéro : `frontend/src/data/profile.js` (constante
`WHATSAPP_NUMBER`) et le champ *numéro WhatsApp* dans l'admin.

---

## Charte graphique

| Rôle | Valeur |
| --- | --- |
| Fond | `#04070d` (noir profond) |
| Texte | `#f1f6ff` (blanc) |
| Accent / `<span>` | `#35a7ff` (bleu BenDev) |
| Accent doux | `#7cc8ff` |

Typographies : **Inter** (texte), **IBM Plex Mono** (étiquettes techniques),
**Instrument Serif italique** (accents nostalgiques).

Le logo est reproduit en CSS dans `frontend/src/components/layout/Logo.jsx`.
Pour utiliser l'image d'origine, déposez-la dans `frontend/public/brand/`.
