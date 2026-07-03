# PINNACLE AI

Marketing site for PINNACLE AI — Vue 3, TypeScript, Tailwind CSS v4, static generation via vite-ssg.

## Stack

- Vue 3 + TypeScript + Vite
- Vue Router (file-based routes in `src/router/routes.ts`)
- Tailwind CSS v4 + shadcn-vue primitives
- Formspree contact submissions
- Deployed on Vercel

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`

## Setup

```sh
npm install
cp .env.example .env
npm run dev
```

Dev server: `http://localhost:5173`

## Environment

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical production URL (no trailing slash) |
| `VITE_FORMSPREE_FORM_ID` | Formspree form ID for contact submissions |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (optional; blank in dev) |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible analytics domain (optional) |
| `VITE_SENTRY_DSN` | Sentry error tracking (optional) |

Server-only vars (`FORMSPREE_FORM_ID`, `TURNSTILE_SECRET_KEY`) are set in Vercel project settings when using `/api/contact`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production SSG build + type-check |
| `npm run preview` | Preview production build |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run lint` | ESLint + oxlint |
| `npm run type-check` | TypeScript validation |

## Project structure

```
src/
  components/   # Shared UI (header, footer, contact form, service blocks)
  composables/  # Reusable Vue logic (contact form, animations)
  constants/    # Content, nav, services, company data
  layouts/      # App shell
  lib/          # Utilities (navigation, analytics, contact API)
  router/       # Route definitions
  sections/     # Home page sections
  views/        # Route-level pages
  types/        # Shared TypeScript types
api/            # Vercel serverless handlers
public/         # Static assets, sitemap, robots.txt
```

## Deploy

1. Set env vars in Vercel (see `.env.example`)
2. Set `VITE_SITE_URL` to your production domain
3. Update `public/sitemap.xml` and `public/robots.txt` if the domain changes from `pinnxai.com`
4. Push to main — Vercel builds via `npm run build`

```sh
npm run build
```

Build output: `dist/` with prerendered HTML for home, get-started, and all service pages.
