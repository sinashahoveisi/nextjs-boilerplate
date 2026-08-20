# Next.js Boilerplate

Boilerplate and starter for **Next.js 16**, **React 19**, **Tailwind CSS 3.4**, and **TypeScript** — focused on a clean App Router setup, API data layer, and production-ready tooling.

Repository: [sinashahoveisi/nextjs-boilerplate](https://github.com/sinashahoveisi/nextjs-boilerplate)

## Features

- ⚡ [Next.js 16](https://nextjs.org) App Router (Turbopack in `dev`, Webpack for production builds with PWA)
- 🔥 Type checking with [TypeScript](https://www.typescriptlang.org)
- ⚛️ [React 19](https://react.dev)
- 💎 [Tailwind CSS 4](https://tailwindcss.com) (CSS-first `@theme`)
- 🔄 Data fetching with [TanStack Query](https://tanstack.com/query) (query / mutation / pagination / infinite factories)
- 🌐 HTTP client with [Axios](https://axios-http.com) and auth refresh
- 🗂️ Client state with [Zustand](https://zustand-demo.pmnd.rs)
- ⌨️ Forms with [React Hook Form](https://react-hook-form.com) + [Yup](https://github.com/jquense/yup)
- 🔔 Toasts with [react-toastify](https://fkhadra.github.io/react-toastify)
- 📱 PWA-ready via [`@ducanh2912/next-pwa`](https://github.com/DuCanhGH/next-pwa) (disabled by default)
- 🎉 [Storybook 10](https://storybook.js.org) for UI development
- 🧪 Unit tests with [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com)
- 🎭 E2E tests with [Playwright](https://playwright.dev)
- 📏 ESLint 9 flat config + [Prettier](https://prettier.io)
- 🦊 [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged)
- 🚓 Conventional commits with [Commitlint](https://commitlint.js.org)
- 🐳 Docker multi-stage build (`standalone` output)
- 💡 Absolute imports (`@/*` and path aliases under `src/`)
- 🗺️ SEO metadata & viewport config helpers
- 🌍 Translation helpers + `messages/en.json` (default) / `messages/fa.json`

## Requirements

- **Node.js 20.9+** (22 recommended)
- npm

## Getting started

```shell
git clone --depth=1 git@github.com:sinashahoveisi/nextjs-boilerplate.git my-project-name
cd my-project-name
cp .env.template .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.template` and set:

| Variable                 | Description                         |
| ------------------------ | ----------------------------------- |
| `NEXT_PUBLIC_SERVER_URL` | Base URL for the API (`libs/Axios`) |

## Scripts

| Command                    | Description                                         |
| -------------------------- | --------------------------------------------------- |
| `npm run dev`              | Start Next.js development server                    |
| `npm run build`            | Production build (Webpack; required for PWA plugin) |
| `npm run start`            | Serve the production build                          |
| `npm run lint`             | Run ESLint                                          |
| `npm run lint:fix`         | Auto-fix ESLint issues under `src/`                 |
| `npm run format`           | Format files with Prettier                          |
| `npm test`                 | Run Vitest unit tests                               |
| `npm run test:watch`       | Vitest watch mode                                   |
| `npm run test:coverage`    | Unit tests with coverage                            |
| `npm run test-storybook`   | Run Storybook stories as Vitest browser tests       |
| `npm run test:e2e`         | Run Playwright e2e tests (auto-installs browsers)   |
| `npm run test:e2e:install` | Download Playwright browsers only                   |
| `npm run storybook`        | Start Storybook on port `6006`                      |
| `npm run build-storybook`  | Build static Storybook                              |

## Project structure

```shell
.
├── .husky/                 # Git hooks
├── .storybook/             # Storybook config
├── e2e/                    # Playwright e2e specs
├── public/                 # Static assets & PWA manifest
├── src
│   ├── app/                # App Router routes & layouts
│   ├── assets/             # Fonts & styles (CSS)
│   ├── components/         # Shared UI components
│   ├── configs/            # App, routes, metadata, viewport
│   ├── constants/          # Shared constants
│   ├── containers/         # Feature containers
│   ├── hooks/              # API factories, user, common hooks
│   ├── layout/             # Layout shells
│   ├── libs/               # Axios client, etc.
│   ├── messages/           # Translation messages
│   ├── providers/          # React Query, toast, top-loader
│   ├── services/           # API service hooks
│   ├── stores/             # Zustand stores
│   ├── test/               # Test helpers
│   ├── types/              # Shared TypeScript types
│   ├── utils/              # Helpers
│   └── validations/        # Yup schemas
├── Dockerfile              # Node 22 multi-stage image
├── eslint.config.mjs       # ESLint flat config
├── next.config.mjs         # Next.js + PWA config
├── playwright.config.ts    # Playwright config
├── vitest.config.ts        # Vitest config
└── tsconfig.json
```

## Testing

```shell
npm test                 # unit/component tests
npm run test:watch       # watch mode
npm run test:coverage    # coverage report
npm run test:e2e         # Playwright e2e (installs browsers if needed, starts `npm run dev`)
```

Unit tests live next to source files as `*.test.ts(x)`. E2E specs live under `e2e/`.

## Customization checklist

- `src/configs/application.ts` — app name / version
- `src/configs/metadata.ts` / `viewport.ts` — SEO & viewport
- `src/configs/page-routes.ts` / `api-routes.ts` / `public-routes.ts`
- `src/assets/styles/main.css` — Tailwind theme tokens & global styles
- `src/messages/en.json` / `fa.json` — copy / i18n strings (default: English)
- `next.config.mjs` — images, PWA, compiler options
- `public/` — icons, splash, `manifest.json`
- `.env` — `NEXT_PUBLIC_SERVER_URL`

Enable PWA by setting `disable: false` in `next.config.mjs` (and rebuild).

## Data layer

API hooks follow shared factories under `src/hooks/api/`:

- `useQueryFactory` — standard queries
- `useMutationFactory` — mutations with toast / cache helpers
- `usePaginationFactory` — paged lists
- `useInfiniteFactory` — infinite scroll lists

Auth token state lives in `src/stores/user` (Zustand + persist). Axios refresh logic is in `src/hooks/api/use-axios`.

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) via Commitlint. Example:

```text
feat: add profile personal container
fix: handle unauthorized refresh failure
chore: bump dependencies
```

## Docker

```shell
docker build -t next-boilerplate .
docker run -p 3000:3000 next-boilerplate
```

The image uses Next.js `output: 'standalone'` and Node 22 Alpine.

## License

MIT — see repository license details if present.
