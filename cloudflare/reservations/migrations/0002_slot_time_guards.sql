CREATE TRIGGER reservation_slots_validate_insert
BEFORE INSERT ON reservation_slots
WHEN
  unixepoch(NEW.start_at) IS NULL OR
  unixepoch(NEW.end_at) IS NULL OR
  unixepoch(NEW.cutoff_at) IS NULL OR
  unixepoch(NEW.start_at) >= unixepoch(NEW.end_at) OR
  unixepoch(NEW.cutoff_at) > unixepoch(NEW.start_at) OR
  NEW.capacity <= 0
BEGIN
  SELECT RAISE(ABORT, 'invalid reservation slot timing or capacity');
END;

CREATE TRIGGER reservation_slots_validate_update
BEFORE UPDATE OF start_at, end_at, cutoff_at, capacity ON reservation_slots
WHEN
  unixepoch(NEW.start_at) IS NULL OR
  unixepoch(NEW.end_at) IS NULL OR
  unixepoch(NEW.cutoff_at) IS NULL OR
  unixepoch(NEW.start_at) >= unixepoch(NEW.end_at) OR
  unixepoch(NEW.cutoff_at) > unixepoch(NEW.start_at) OR
  NEW.capacity <= 0
BEGIN
  SELECT RAISE(ABORT, 'invalid reservation slot timing or capacity');
END;
