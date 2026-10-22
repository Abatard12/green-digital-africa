# apps/api — NestJS

## Endpoints disponibles

| Méthode | Route | Description |
|---|---|---|
| GET | `/realisations` | Liste des réalisations |
| GET | `/realisations/:slug` | Détail d'une réalisation |
| GET | `/actualites` | Liste des actualités |
| GET | `/actualites/:slug` | Détail d'une actualité |
| POST | `/contact` | Réception d'un message de contact (validation seulement pour l'instant, pas d'envoi d'email réel — voir note ci-dessous) |

## Démarrer l'API

```bash
cd apps/api
npm install
npm run start:dev
```

L'API démarre par défaut sur `http://localhost:3001` (configurable via la variable d'environnement `PORT`). Le CORS est ouvert pour `http://localhost:3000` (le site Next.js en dev local), configurable via `WEB_ORIGIN`.

## État actuel des données

`realisations.data.ts` et `actualites.data.ts` contiennent des tableaux codés en dur — les mêmes contenus de démonstration que ceux utilisés côté Next.js. Prochaine étape : brancher une vraie base de données (PostgreSQL + Prisma, par exemple) à la place de ces tableaux.

## Note sur `/contact`

Cet endpoint valide et journalise les messages reçus, mais n'envoie **pas** encore d'email — l'envoi réel est toujours géré côté Next.js (`apps/web/app/api/contact/route.ts`, via Resend). Il existe ici en prévision d'une centralisation future de cette logique, si on décide de faire pointer le formulaire du site vers cette API plutôt que vers sa propre route interne.

## Prochaine étape : brancher le site dessus

Dans `apps/web/app/realisations/page.tsx` et `apps/web/app/actualites/page.tsx`, remplacer les tableaux `// TODO` codés en dur par un `fetch("http://localhost:3001/realisations")` (ou l'URL de prod une fois déployée). Pas encore fait — à faire dans une prochaine étape, une page à la fois.
