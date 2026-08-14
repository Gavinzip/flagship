CREATE TABLE early_bird_eligibility (
  email TEXT PRIMARY KEY COLLATE NOCASE,
  ticket_count INTEGER NOT NULL CHECK (ticket_count > 0),
  imported_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

ALTER TABLE early_bird_reservations
  ADD COLUMN ticket_count INTEGER NOT NULL DEFAULT 1 CHECK (ticket_count > 0);
