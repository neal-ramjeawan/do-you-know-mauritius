# do-you-know-mauritius

This is a small, static trivia app about Mauritius. It serves 150 questions
across eight categories, plays them in fixed 10-question rounds, and ships as
an installable, offline-capable PWA.

The project is intentionally boring in the best way:

- one frontend bundle
- no auth flow
- no database
- no runtime secrets in the browser
- a deploy path that stays close to the happy path on Cloudflare Pages

The UI is branded "Zwazo" (Mauritian Creole for "bird"). The dodo shows up
as the mascot, the progress indicator, and the app icon.

If you want the deployment runbook, start with [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Stack

- React 18 + Vite 5 + Tailwind CSS for the app shell
- `vite-plugin-pwa` for manifest and service-worker generation
- Vitest + React Testing Library for the test suite
- GitHub Actions for CI and deploy
- Cloudflare Pages for static hosting

## Local setup

```bash
npm install
npm run dev
```

That is enough to get the app running locally. There is no env-var wiring to
figure out, and the browser-side state stays local to the device.

Useful commands:

```bash
npm test              # run the test suite once
npm run test:watch    # interactive watch mode
npm run build         # production bundle for deployment
npm run preview       # preview the built site locally
```

The app is designed so the browser does the right thing without needing a
server-backed dependency. That keeps the build simple and the hosting cost very
small.

## Project layout

```text
.github/workflows/
  ci.yml                   runs npm test + npm run build on PRs and non-main branches
  deploy.yml               same checks, then deploys dist/ to Cloudflare Pages on main
public/                    PWA icons and static assets
src/
  data/questions.js        question bank: category, difficulty, options, answer, fact
  lib/
    quiz.js                round building, shuffle logic, difficulty filtering
    dailyChallenge.js      seeded PRNG + date helpers for the daily challenge
    badges.js              badge unlock logic, stored in browser localStorage
  components/              screens + shared UI
  App.jsx                 state-driven screen router
  index.css               Tailwind layers + design tokens
wrangler.jsonc             Pages project config and build output dir
vite.config.js            Vite + PWA + Vitest configuration
```

This is a single-page app with a small state machine in `App.jsx`. No router
library, no backend project, and no extra moving parts beyond the static build
and the deployment pipeline.

## Testing

The test suite is intentionally focused on the parts that are easiest to keep
correct and hardest to regress:

- `src/lib/quiz.js` — round generation, difficulty filtering, deterministic RNG behavior
- `src/lib/dailyChallenge.js` — seeded date logic for the daily challenge
- `src/lib/badges.js` — badge unlocks and streak persistence logic
- `src/components/QuestionCard.jsx` — rendering and answer-state behavior

Both CI and deploy workflows run `npm test` before `npm run build`; if the
suite fails, the pipeline does not continue.

## Architecture notes

- **Round building** uses an injectable RNG. Normal play uses `Math.random`,
  while the daily challenge uses a seeded PRNG so everyone sees the same 10
  questions in the same order for a given date.
- **Badges and streaks** are browser-local, not server-backed. That is a good
  fit for a simple hobby app where the cost of losing local progress is low.
- **Question data is authored in a readable shape** with the correct answer at
  `options[0]`. The round builder shuffles the options at render time, which
  keeps the source data simple and avoids hand-maintained shuffles.

## Feature implementation notes

**Badges** (`src/lib/badges.js`) are stored in the browser via `localStorage`.
That keeps the feature easy to reason about and avoids introducing a backend
just to persist a small amount of per-device state.

Badge IDs are:

| id | condition |
|----|-----------|
| `first-round` | first round finished |
| `perfect-round` | 10/10 in any round |
| `speed-demon` | 10/10 in Speed mode |
| `island-native` | perfect round in all 8 categories (cumulative) |
| `daily-3` / `daily-7` | daily challenge streak, consecutive calendar days |

**Daily challenge** uses a seeded PRNG so every player on the same calendar
date gets the same 10 questions in the same order. That makes the challenge
predictable without needing a server-side coordinator.

**Share card** (`ShareCard.jsx`) is drawn on a `<canvas>` at 1200×630 with no
image library. It reuses the dodo SVG path data from `Marks.jsx` via `Path2D`
so the exported card stays visually aligned with the app design.

**PWA** support is generated at build time by `vite-plugin-pwa`. The app is
intended to work as a normal static site in the browser and also to behave
well as an installed web app when previewed after `npm run build`.

**Accessibility** is handled with the usual web patterns: `radiogroup`/
`radio` semantics, `aria-live` feedback, focus movement after an answer,
keyboard-friendly tabbed navigation, and a skip-to-content link. The work is
implemented with the behaviors in mind, rather than being validated with a
formal audit pass in this repo.

## Deployment

There are two GitHub Actions workflows:

- `ci.yml` runs `npm test` and `npm run build` on pull requests and on
  non-main branches.
- `deploy.yml` does the same checks and then runs `wrangler pages deploy`
  against the built `dist/` output on pushes to `main`.

The important bit is that the Cloudflare Pages project has to exist already.
Once that is in place, the deploy job simply pushes the static site bundle.

## Security notes

- There is no auth layer in the app by design.
- The browser keeps its own local state; the deployment pipeline only needs
  the standard Cloudflare Pages credentials that the workflow can consume.
- The deploy token is intentionally scoped down to the Pages project scope
  that the workflow needs.

## Cost

This repo is set up to stay on the cheap side of the spectrum:

- the frontend is static
- the CI pipeline is the GitHub-hosted workflow cost model
- the deployed app stays in Cloudflare Pages without needing a separate
  runtime service

If you keep the repo public and stay on the free Cloudflare Pages plan, the
layout described here is the intended low-cost path.

## Adding questions

Entries in `src/data/questions.js` follow this shape:

```js
{
  id: 'h21',
  category: 'history',        // must match a CATEGORIES id
  difficulty: 'medium',        // easy | medium | hard
  q: 'Question text?',
  options: ['Correct answer', 'Wrong', 'Wrong', 'Wrong'],
  answer: 0,                    // always index 0; shuffling happens at render time
  fact: 'Optional one-liner shown after answering.',
}
```

## Backlog / known gaps

- **i18n scaffolding exists but is not wired into the runtime UI yet.**
  There is English/French copy in `src/i18n/strings.js` and a provider in
  `src/i18n/LanguageContext.jsx`, but the app is still effectively English-only.
- **No formal accessibility audit** has been run against the deployed build.
  The semantics are in place, but this repo has not yet gone through a real
  screen-reader or axe-style validation pass.
- **Difficulty is selected before the round starts**, not adapted mid-round.
- **No sound or haptic feedback** yet.

## Deploying elsewhere

If Cloudflare Pages is not the target, `dist/` after `npm run build` is a
plain static bundle and will deploy to any static host. The app does not
require a server-side runtime to work.
