# do-you-know-mauritius

A trivia site, single subject: Mauritius. 150 questions across 8 categories
(history, geography, wildlife, culture, food, people, sports, misc),
difficulty-tagged, served in fixed 10-question rounds. Frontend is React +
Vite + Tailwind, ships as an installable/offline-capable PWA. Leaderboard
is optional, same-origin, backed by Cloudflare Pages Functions + D1 — no
accounts anywhere, not for players, not for me running it.

UI is branded "Zwazo" (Mauritian Creole for "bird") — the dodo shows up as
the mascot, the progress indicator, and the app icon.

Pushing this to GitHub and getting it live on Cloudflare Pages: see
[`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Stack

- React 18, Vite 5, Tailwind CSS
- `vite-plugin-pwa` — manifest + service worker, generated at build time
- Vitest + React Testing Library — unit and component tests
- Cloudflare Pages + Pages Functions + D1 — static hosting and the
  optional leaderboard API, one project, one deploy
- GitHub Actions — CI (build + test) and deploy, two workflows total

## Local setup

```bash
npm install
npm run dev
```

Zero configuration needed — there's no env var to set. The leaderboard
client always calls `/api/scores`; when that route isn't reachable (which
is the case under plain `npm run dev`, since Vite alone doesn't serve
`/functions`) it falls back to `localStorage` automatically.

```bash
npm test              # vitest, single run
npm run test:watch    # vitest, watch mode
npm run build
npm run preview
```

To exercise the real API locally (D1 included), see "Leaderboard backend"
below — `npm run pages:dev` builds and runs the whole stack through
Wrangler instead of Vite's dev server.

## Project layout

```
.github/workflows/
  ci.yml                   npm test + npm run build, on PRs / non-main branches
  deploy.yml                 same, then wrangler pages deploy, on push to main
functions/
  api/
    scores.js                GET/POST /api/scores — the leaderboard endpoint
    _validate.js               pure validation helpers (underscore = not a route)
    _validate.test.js           unit tests for the above
public/                    PWA icons (svg + rasterized png set)
src/
  data/questions.js        question bank: id, category, difficulty, options, answer, fact
  lib/
    quiz.js                 round building — shuffle, difficulty filter, pluggable rng
    dailyChallenge.js         seeded PRNG + date helpers, backs the daily challenge
    badges.js                  badge unlock logic, localStorage-persisted
    leaderboard.js               fetch client for /api/scores + localStorage fallback
  components/               screens + shared UI, one state machine in App.jsx
  App.jsx                  screen router (home/category/quiz/results/leaderboard/badges)
  index.css                Tailwind layers + design tokens
schema.sql                 D1 schema (scores, submissions)
wrangler.jsonc              Pages project config — D1 binding, build output dir
vite.config.js              base path ('./') + PWA plugin + vitest config
```

No router library — it's a single page with five screens, a plain
`useState` switch in `App.jsx` covers it. No separate backend project
either — the leaderboard API lives in `/functions` inside this same repo
and deploys together with the site as one Cloudflare Pages project.

## Testing

Vitest, `jsdom` environment, React Testing Library for the one component
test. Covers the pure logic that's actually worth covering:

- `src/lib/quiz.js` — round building, difficulty filtering, seeded-rng
  determinism
- `src/lib/dailyChallenge.js` — PRNG determinism, date-key/day-diff helpers
- `src/lib/badges.js` — unlock conditions, streak bookkeeping
- `functions/api/_validate.js` — every rule the API enforces on a
  submission, tested without mocking D1 or the Pages runtime
- `src/components/QuestionCard.jsx` — renders, locks in an answer, shows
  correct/incorrect state

Both `ci.yml` and `deploy.yml` run `npm test` before `npm run build`; a
failing test blocks the deploy.

## Architecture notes

- **Round building** (`src/lib/quiz.js`) takes an injectable RNG. Normal
  play uses `Math.random`; the daily challenge passes a seeded PRNG
  (`dailyChallenge.js`, mulberry32) so every player gets the same 10
  questions in the same order on a given calendar date, with no server
  coordinating it.
- **Leaderboard client** (`src/lib/leaderboard.js`) is a thin `fetch`
  wrapper around `/api/scores`, same origin as the site, with
  `localStorage` as the automatic fallback if that call fails for any
  reason (route not deployed, offline, D1 down). No flag to configure,
  no URL to get wrong.
- **Leaderboard API** (`functions/api/scores.js`) is a Cloudflare Pages
  Function — same deploy as the static site, same domain, so there's no
  CORS to configure at all. Validation logic lives in `_validate.js`,
  split out specifically so it's testable as plain functions.
- **Badges/streaks** are `localStorage`-only, no server round-trip. Fine
  for this use case — losing badge state on a cleared browser isn't a
  real cost.
- **Questions are authored with the correct answer at `options[0]`** —
  `buildRound` shuffles options and remaps the answer index at render
  time. Keeps the data file readable; don't hand-shuffle when adding
  questions.

## Feature implementation notes

**Badges** (`src/lib/badges.js`, `localStorage`, no server round-trip):

| id | condition |
|----|-----------|
| `first-round` | first round finished |
| `perfect-round` | 10/10 in any round |
| `speed-demon` | 10/10 in Speed mode |
| `island-native` | perfect round in all 8 categories (cumulative) |
| `daily-3` / `daily-7` | daily challenge streak, consecutive calendar days |

**Daily challenge** — `buildRound('all', 10, { rng: rngForDate(todayKey()) })`.
Same seed → same shuffle → same 10 questions for every player on a given
date. Leaderboard entries use `daily-YYYY-MM-DD` as the category id, so
each day gets its own board without any extra schema.

**Share card** (`ShareCard.jsx`) — drawn on a `<canvas>` at 1200×630, no
image library. Reuses the dodo SVG path data (`Marks.jsx`) via `Path2D` so
the raster output matches the SVG mascot. Share flow falls back in order:
`navigator.share` with a file attachment → `navigator.share` text-only →
clipboard copy. Download button just calls `canvas.toDataURL`.

**PWA** — `vite-plugin-pwa` handles manifest + service worker generation
at build time, nothing manual to register. It's disabled in `npm run dev`
by design (Vite plugin default); test the installed-app path with
`npm run build && npm run preview`.

**Accessibility** — answer options use the `radiogroup`/`radio` pattern
with `aria-checked`; answer feedback goes through an `aria-live="polite"`
region; focus moves to "Next question" programmatically after an answer
locks in; the footprint progress trail is `aria-hidden` (the same "Question
X of Y" info exists as real text on the question card); leaderboard
category tabs follow the ARIA `tablist`/`tab` pattern with Left/Right
arrow-key navigation; skip-to-content link on every screen. Not run
against a real screen reader or an automated audit (axe/Lighthouse) — see
Backlog.

## Leaderboard backend

Cloudflare Pages Functions + D1, folded into the same project as the
static site — not a separate service. Reasoning for Cloudflare specifically
(over something like Firebase):

- Free plan takes no payment method at signup — nothing to accidentally
  leave enabled.
- Free tier fails closed: hit a daily cap and the API returns errors
  until reset, it doesn't bill. Getting charged requires deliberately
  opening the dashboard and upgrading.
- It's real server-side code, not declarative rules — `scores.js`
  validates category/score/round-size/mode itself and rate-limits by
  hashed IP, which is a step up from what something like Firestore
  security rules can express.

### One-time setup

```bash
npx wrangler login                 # authorizes the CLI, browser OAuth
npm run d1:create                  # prints a database_id
# → paste it into wrangler.jsonc, replacing REPLACE_WITH_YOUR_D1_DATABASE_ID
npm run d1:migrate                 # applies schema.sql to the remote D1 db
npx wrangler pages project create do-you-know-mauritius --production-branch=main
npm run deploy                     # builds + wrangler pages deploy dist
```

`database_id` is an identifier, not a credential — fine to commit.

### Local development against the real API

```bash
npm run d1:migrate:local           # local SQLite copy of the schema
npm run pages:dev                  # builds, then wrangler pages dev dist
```

`wrangler pages dev` serves the static build and `/functions` from one
local server, so `/api/scores` works exactly like production — no proxying,
no separate process, no CORS to think about locally either.

### CI deploy

`deploy.yml` runs `npm test`, `npm run build`, then `wrangler pages
deploy` on every push to `main`. Needs two repo secrets:

- `CLOUDFLARE_API_TOKEN` — custom token, one permission: **Account →
  Cloudflare Pages → Edit**, restricted to the specific account. Not the
  personal login from `wrangler login` above — that stays on the laptop
  and never touches GitHub.
- `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard sidebar, or
  `npx wrangler whoami`.

Blast radius if the token leaks: someone can redeploy this one Pages
project with different code. It can't touch D1 data directly, DNS, or
billing.

### What gets validated

Every submission is checked server-side in `functions/api/_validate.js`,
not trusted from the client — see the tests there for the exact rules
(category shape, round size, score bounds, mode, IP-hash rate limit).
Doesn't stop a scripted client from posting a plausible-looking fake
score — there's no server-held answer key to check the submitted score
against. Flagged in Backlog.

## Deployment

Two GitHub Actions pipelines:

- `ci.yml` — `npm test` + `npm run build` on PRs and branches other than
  `main`.
- `deploy.yml` — same checks, then `wrangler pages deploy` on push to
  `main`. The Cloudflare Pages project has to exist first (one-time
  `wrangler pages project create`, see above) — the workflow deploys to
  it, it doesn't create it.

## Security notes

- No auth, anywhere, by design. Trade-off: leaderboard integrity is
  best-effort, not guaranteed. Mitigated via server-side validation +
  per-IP rate limiting, not eliminated. Acceptable for a hobby
  leaderboard; wouldn't be for anything where score integrity matters.
- Same-origin API means there's no CORS surface to misconfigure — no
  wildcard origin, no allowlist to keep in sync.
- The Cloudflare API token used by `deploy.yml` is scoped to Pages:Edit
  on one account only — no D1, DNS, or billing access.
- D1's `database_id` lives in `wrangler.jsonc`, committed to the repo.
  It's an identifier, not a credential — knowing it grants no access on
  its own.

## Cost

$0 as configured, indefinitely, assuming:

- The GitHub repo stays public (Actions is free, unlimited, for public
  repos — this only affects CI, since Cloudflare Pages handles hosting
  now, not GitHub Pages).
- The Cloudflare account stays on the free plan (no card on file, so
  there's no path to an unexpected bill — Pages/Functions/D1 just stop
  serving once a daily cap is hit, which for this traffic profile won't
  happen).

## Adding questions

Entries in `src/data/questions.js`:

```js
{
  id: 'h21',
  category: 'history',        // must match a CATEGORIES id
  difficulty: 'medium',        // easy | medium | hard
  q: 'Question text?',
  options: ['Correct answer', 'Wrong', 'Wrong', 'Wrong'],
  answer: 0,                    // always index 0 — shuffled at render time
  fact: 'Optional one-liner shown after answering.',
}
```

## Backlog / known gaps

- **i18n scaffolding exists but isn't wired up.** `src/i18n/strings.js`
  (English + French UI copy) and `src/i18n/LanguageContext.jsx` (a
  `t()`-based context provider, localStorage-persisted) are written and
  tested-by-hand but no component actually imports them yet — the app is
  English-only right now. `src/data/questions.fr.js` has French
  translations for all 150 questions, also not yet wired into
  `buildRound`. Next step: wrap `App.jsx` in `LanguageProvider`, add a
  toggle in `Header.jsx`, and swap components over to `t('key')`
  one at a time. Deliberately left Mauritian Creole out of scope —
  translating 150 factual quiz questions in a language I don't have
  strong, reliable training data on is a real accuracy risk, not
  something to guess at.
- Score validation checks shape and range, not the actual question set —
  no server-held answer key to check submissions against. Would need to
  port question data into the Function to close that gap; not done
  because the payoff doesn't justify it for this traffic profile.
- No screen-reader / axe audit run against the deployed build — the
  accessibility work (radiogroup pattern, live regions, focus management,
  tablist keyboard nav) is done by pattern, not verified against a real
  AT session.
- Difficulty filter is a pre-round pick, not adaptive mid-round.
- No sound/haptic feedback.

## Deploying elsewhere

If Cloudflare Pages isn't the target: `dist/` after `npm run build` is a
static bundle and deploys as-is to any static host, but note that without
the Cloudflare deploy, `/api/scores` doesn't exist anywhere — you'd need
to either stand the Functions up as a separate Worker again (see git
history before the Pages consolidation) or accept a localStorage-only
leaderboard.
