# Green Digital Africa — Monorepo

## Structure

- `apps/web` — site Next.js (App Router + Tailwind), multi-pages
- `apps/api` — API NestJS (à venir : réalisations, actualités, contact)

## Démarrage

```bash
npm install
npm run dev:web    # démarre le site sur http://localhost:3000
```

L'API NestJS (`apps/api`) sera initialisée dans une prochaine étape ;
pour l'instant tout le contenu (réalisations, actualités, services)
est codé en dur dans `apps/web/app/i18n/translations.ts`, exactement
comme sur l'ancien projet. L'idée est de migrer ce contenu vers l'API
progressivement, page par page, sans bloquer le développement du site
en attendant.

## Pages prévues

| Route | Statut |
|---|---|
| `/` | Accueil |
| `/a-propos` | À propos |
| `/services` | Nos métiers |
| `/secteurs` | Secteurs d'intervention |
| `/realisations` + `/realisations/[slug]` | Réalisations |
| `/actualites` + `/actualites/[slug]` | Actualités |
| `/partenaires` | Partenaires |
| `/contact` | Contact |
