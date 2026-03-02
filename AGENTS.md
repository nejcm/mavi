# Mavi Agent Guide

## Project Summary

Mavi is a Bun workspaces monorepo with two packages: `@mavi/web` (Vite + React SPA) and `@mavi/server` (Bun API).  
Use Bun commands for install, scripts, and local workflows.  
Target runtime constraints come from `package.json` engines (`bun` 1.3.9, Node >=24).

## Commands

Run commands from the repository root unless noted otherwise.

| Purpose                     | Command                |
| --------------------------- | ---------------------- |
| Install dependencies        | `bun install`          |
| Run all apps in dev         | `bun run dev`          |
| Run web only (port 3000)    | `bun run dev:web`      |
| Run server only (port 3001) | `bun run dev:server`   |
| Build all                   | `bun run build`        |
| Build web only              | `bun run build:web`    |
| Build server only           | `bun run build:server` |
| Lint                        | `bun run lint`         |
| Format                      | `bun run format`       |
| Format check                | `bun run format:check` |
| TypeScript check            | `bun run lint:ts`      |
| Unit tests                  | `bun run test`         |
| E2E tests                   | `bun run test:e2e`     |
| Dead-code check             | `bun run knip`         |

If E2E browsers are missing, install once from repo root with `bunx playwright install --with-deps chromium`.

## Guardrails

- Ask before adding or changing dependencies.
- Prefer existing libraries and patterns already used in this repo.
- Keep edits focused and minimal; avoid broad refactors unless explicitly requested.
- Run relevant validation after changes (`lint`, `format:check`, `lint:ts`, and applicable tests).
- Update docs when behavior, scripts, or environment variables change.
- Never commit secrets or `.env` files.

## Code and Repo Conventions

- Use `oxfmt` and `oxlint` via project scripts, not ad hoc alternatives.
- Pre-commit runs `lint-staged` (`oxfmt` + `oxlint --deny-warnings`) through Husky.
- For TypeScript changes, run `bun run lint:ts`.
- In `packages/web`, follow established patterns around TanStack Router, React Query, Zustand, Zod, react-hook-form, i18next, and Tailwind.
- In `packages/server`, keep Bun-first APIs and startup behavior consistent with existing code and docs.

## Extended Docs

- Environment variable setup and web env details: `README.md`.
- Package architecture and stack overview: `README.md`.
- CI pipeline details and required checks: `.github/workflows/ci.yml`.

Use this file for concise rules and commands; keep deep reference material in canonical docs.
