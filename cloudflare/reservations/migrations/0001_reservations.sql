PRAGMA foreign_keys = ON;

CREATE TABLE reservation_slots (
  id TEXT PRIMARY KEY,
  label_zh TEXT NOT NULL,
  label_en TEXT NOT NULL,
  start_at TEXT NOT NULL,
  end_at TEXT NOT NULL,
  cutoff_at TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  display_order INTEGER NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
  CHECK (unixepoch(start_at) IS NOT NULL),
  CHECK (unixepoch(end_at) IS NOT NULL),
  CHECK (unixepoch(cutoff_at) IS NOT NULL),
  CHECK (unixepoch(start_at) < unixepoch(end_at)),
  CHECK (unixepoch(cutoff_at) <= unixepoch(start_at))
);

CREATE TABLE early_bird_reservations (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  slot_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (slot_id) REFERENCES reservation_slots(id)
);

CREATE INDEX early_bird_reservations_slot_id_idx
  ON early_bird_reservations (slot_id);
