# PINNACLE AI Website

Production-ready Vue 3 + TypeScript + shadcn-vue + Tailwind website implementation for PINNACLE AI.

## Stack

- Vue 3 + TypeScript + Vite
- Vue Router + Pinia
- Tailwind CSS v4 + shadcn-vue
- ESLint + Prettier + vue-tsc

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

Create env file from template:

```sh
cp .env.example .env
```

Required env values:

- `VITE_APP_NAME` (default: PINNACLE AI)
- `VITE_CONTACT_API_URL` (public API endpoint for the contact form)
- `VITE_CONTACT_API_TOKEN` (optional bearer token if your endpoint expects it)

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment

### Vercel

- `vercel.json` is included for SPA rewrite support.
- Set environment variables in Vercel Project Settings -> Environment Variables:
  - `VITE_APP_NAME`
  - `VITE_CONTACT_API_URL`
  - `VITE_CONTACT_API_TOKEN`

### Netlify

- `netlify.toml` is included with build and SPA redirect rules.
- Set the same environment variables in Netlify Site Settings -> Environment Variables.

### Contact API Security Note

`VITE_*` variables are exposed to the browser bundle. If your contact provider requires a private secret,
use a server-side API route or serverless function as a secure proxy and set `VITE_CONTACT_API_URL`
to that public proxy endpoint.
