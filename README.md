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
