ALTER TABLE early_bird_eligibility
  RENAME COLUMN ticket_count TO source_ticket_count;

CREATE TRIGGER early_bird_reservations_single_entry_insert
BEFORE INSERT ON early_bird_reservations
WHEN NEW.ticket_count <> 1
BEGIN
  SELECT RAISE(ABORT, 'each Gmail registration must consume exactly one place');
END;

CREATE TRIGGER early_bird_reservations_single_entry_update
BEFORE UPDATE OF ticket_count ON early_bird_reservations
WHEN NEW.ticket_count <> 1
BEGIN
  SELECT RAISE(ABORT, 'each Gmail registration must consume exactly one place');
END;
