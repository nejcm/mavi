# Mavi monorepo

Monorepo for the Mavi web app and API.

## Packages

- **@mavi/web** – Frontend (TanStack Router SPA, React Query, i18n, PostHog, web-vitals)
- **@mavi/server** – Backend API (Bun)

## Development

```bash
bun install
bun run dev          # run all packages in dev
bun run dev:web      # web only (port 3000)
bun run dev:server   # server only (port 3001)
```

## Build

```bash
bun run build
bun run build:web
bun run build:server
```

## Environment (web)

Create `.env` in `packages/web` (or set in CI):

| Variable                   | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `VITE_POSTHOG_KEY`         | PostHog project API key; if unset, analytics are disabled          |
| `VITE_POSTHOG_HOST`        | PostHog host (default: `https://eu.i.posthog.com`)                 |
| `VITE_API_URL`             | API base URL (default: `http://localhost:3001`)                    |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key; if unset the contact map is hidden |

## Tests

```bash
bun run test        # unit tests (Vitest) in packages/web
bun run test:e2e    # E2E tests (Playwright) in packages/web; run `npx playwright install` once to install browsers
```

## Tech stack (web)

- **Routing:** TanStack Router (file-based), SPA mode
- **State:** Zustand (persisted locale)
- **Data:** TanStack React Query
- **Validation:** Zod
- **Forms:** react-hook-form, @hookform/resolvers
- **i18n:** i18next, react-i18next
- **Analytics:** posthog-js, web-vitals
- **Testing:** Vitest, @playwright/test

# Flags

https://flagicons.lipis.dev/
