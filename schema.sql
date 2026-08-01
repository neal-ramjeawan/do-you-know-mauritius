-- Run once:
--   npm run d1:migrate

CREATE TABLE IF NOT EXISTS scores (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  score       INTEGER NOT NULL,
  total       INTEGER NOT NULL,
  mode        TEXT    NOT NULL DEFAULT 'classic',
  created_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scores_category
  ON scores (category_id, score DESC, created_at ASC);

-- Rate-limit bookkeeping only — hashed IP + timestamp, no score data.
-- Pruned on every write (functions/api/scores.js), stays small.
CREATE TABLE IF NOT EXISTS submissions (
  ip_hash TEXT    NOT NULL,
  ts      INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submissions_ip_ts
  ON submissions (ip_hash, ts);
