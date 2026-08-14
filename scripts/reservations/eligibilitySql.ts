export function buildEligibilityReplaceSql(
  sourceTicketCounts: Map<string, number>,
) {
  const inserts = [...sourceTicketCounts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(
      ([email, count]) =>
        `INSERT INTO early_bird_eligibility_import (email, source_ticket_count) VALUES ('${email}', ${count});`,
    )
    .join("\n");

  return `DROP TABLE IF EXISTS early_bird_eligibility_import;
CREATE TABLE early_bird_eligibility_import (
  email TEXT PRIMARY KEY COLLATE NOCASE,
  source_ticket_count INTEGER NOT NULL CHECK (source_ticket_count > 0)
);
${inserts}
DELETE FROM early_bird_eligibility;
INSERT INTO early_bird_eligibility (email, source_ticket_count)
SELECT email, source_ticket_count FROM early_bird_eligibility_import;
DROP TABLE early_bird_eligibility_import;
`;
}
