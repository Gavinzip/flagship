UPDATE early_bird_reservations
SET ticket_count = 1
WHERE ticket_count <> 1;
