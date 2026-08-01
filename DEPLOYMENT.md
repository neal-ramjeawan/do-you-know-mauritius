# Deployment

Runbook for getting this from a local checkout to a live site on
Cloudflare Pages. One-time setup below, then it's just `git push`.

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/do-you-know-mauritius.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `dist`, `.wrangler`, and any
`.env*` — nothing to clean up first.

## 2. Cloudflare one-time setup

Run locally, before relying on CI for anything. Two artifacts this
produces — the D1 `database_id` and the Pages project itself — have to
exist before GitHub Actions has anything to deploy to.

```bash
npm install
npx wrangler login              # browser OAuth, free account, no card needed

npm run d1:create                # prints a database_id
```

Copy that `database_id` into `wrangler.jsonc`, replacing
`REPLACE_WITH_YOUR_D1_DATABASE_ID`. It's an identifier, not a credential —
fine to commit.

```bash
npm run d1:migrate                                          # creates the D1 tables
npx wrangler pages project create do-you-know-mauritius --production-branch=main
npm run deploy                                               # first deploy, from this machine
```

That last command builds and pushes the site live — a working
`*.pages.dev` URL comes back immediately, independent of GitHub Actions.
Commit the `wrangler.jsonc` change (the real `database_id`) and push it.

## 3. GitHub repo secrets

**Settings → Secrets and variables → Actions → New repository secret**,
two of them:

- `CLOUDFLARE_API_TOKEN` — Cloudflare dashboard → My Profile → API
  Tokens → Create Token → Custom Token → one permission:
  **Account → Cloudflare Pages → Edit**, restricted to the specific
  account.
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare dashboard sidebar, or
  `npx wrangler whoami`.

## 4. Confirm

From here, every push to `main` runs `.github/workflows/deploy.yml`:
tests → build → `wrangler pages deploy`. Watch it under the repo's
**Actions** tab. Green build = live at the `*.pages.dev` URL from step 2
(also visible under the Pages project in the Cloudflare dashboard).

## Skipping the leaderboard

If the shared leaderboard doesn't matter yet, skip all of step 2 and the
D1 parts. The static build still needs somewhere to live — GitHub Pages,
Netlify, Vercel, whatever — but without `/api/scores` deployed anywhere,
the app just runs on the `localStorage` fallback automatically. Nothing
else to configure either way; there's no env var gating this.

## Local development

Covered in more detail in `README.md` ("Local setup" and "Leaderboard
backend"), summarized here:

```bash
npm install
npm run dev            # Vite dev server, hot reload — leaderboard falls
                        # back to localStorage since /functions isn't served
npm test                # vitest, single run
npm run build && npm run preview   # production build, local preview
```

To exercise the real API locally (D1 included, not just the fallback):

```bash
npm run d1:migrate:local    # local SQLite copy of the schema
npm run pages:dev            # builds, then wrangler pages dev dist
```

`wrangler pages dev` serves the static build and `/functions` from one
local server — `/api/scores` behaves exactly like production, no proxying
or CORS to think about. No hot reload though; re-run it after changes.
