CREATE TABLE IF NOT EXISTS subs (
  id TEXT PRIMARY KEY,      -- sha256 of the push endpoint
  sub TEXT NOT NULL,        -- the push subscription (endpoint + keys)
  start TEXT NOT NULL,      -- window start, HH:MM local
  "end" TEXT NOT NULL,      -- window end, HH:MM local
  count INTEGER NOT NULL,   -- beeps per day
  tz TEXT NOT NULL,         -- IANA time zone
  day TEXT NOT NULL,        -- local date the times belong to
  times TEXT NOT NULL,      -- JSON array of remaining beep times (epoch ms)
  next_at INTEGER           -- earliest remaining time, indexed for the minute cron
);
CREATE INDEX IF NOT EXISTS subs_next_at ON subs (next_at);
