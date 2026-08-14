import { normalizeGmail } from "../../shared/reservations/gmail.ts";

function parseCsv(source: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  let closedQuote = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
        closedQuote = true;
      } else {
        field += character;
      }
      continue;
    }

    if (closedQuote && character === "\r" && source[index + 1] === "\n") {
      continue;
    }
    if (character === '"') {
      if (field.length > 0 || closedQuote) {
        throw new Error(`CSV has an invalid quote at character ${index + 1}.`);
      }
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
      closedQuote = false;
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
      closedQuote = false;
    } else {
      if (closedQuote) {
        throw new Error(
          `CSV has content after a closing quote at character ${index + 1}.`,
        );
      }
      field += character;
    }
  }

  if (quoted) throw new Error("CSV contains an unterminated quoted field.");
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows.filter((values) => values.some((value) => value.trim()));
}

function normalizeHeader(value: string) {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, " ");
}

function findColumn(headers: string[], candidates: string[]) {
  for (const candidate of candidates) {
    const index = headers.indexOf(candidate);
    if (index >= 0) return index;
  }
  return -1;
}

export function buildLumaGuestSnapshot(
  source: string,
  selectedTicketTypes: string[],
) {
  const rows = parseCsv(source);
  if (rows.length < 2) throw new Error("CSV has no guest rows.");

  const headers = rows[0].map(normalizeHeader);
  const emailIndex = findColumn(headers, [
    "email",
    "email address",
    "guest email",
  ]);
  const statusIndex = findColumn(headers, [
    "approval status",
    "guest status",
    "status",
  ]);
  const ticketTypeIndex = findColumn(headers, [
    "ticket type",
    "ticket name",
    "ticket",
  ]);
  const quantityIndex = findColumn(headers, [
    "ticket quantity",
    "number of tickets",
    "ticket count",
    "quantity",
  ]);

  if (emailIndex < 0) throw new Error("Could not find the Luma email column.");
  if (statusIndex < 0) {
    throw new Error(
      "Could not find approval status; use the complete Luma guest CSV export.",
    );
  }
  if (ticketTypeIndex < 0) {
    throw new Error(
      "Could not find ticket type; use the complete Luma guest CSV export.",
    );
  }
  if (new Set(headers).size !== headers.length) {
    throw new Error(
      "CSV contains duplicate column headers and cannot be imported safely.",
    );
  }

  const approvedStatuses = new Set(["approved", "going", "checked in"]);
  const sourceTicketCounts = new Map<string, number>();
  const ticketTypes = new Map<string, number>();
  let approvedTickets = 0;
  let selectedTickets = 0;
  let excludedByStatus = 0;
  let nonGmailTickets = 0;

  for (const [index, row] of rows.slice(1).entries()) {
    if (row.length !== headers.length) {
      throw new Error(
        `CSV row ${index + 2} has ${row.length} columns; expected ${headers.length}.`,
      );
    }
    const quantityRaw = quantityIndex >= 0 ? row[quantityIndex].trim() : "1";
    if (!/^\d+$/.test(quantityRaw) || Number(quantityRaw) < 1) {
      throw new Error(`CSV row ${index + 2} has an invalid ticket quantity.`);
    }
    const quantity = Number(quantityRaw);
    const status = row[statusIndex].trim().toLowerCase();
    if (!approvedStatuses.has(status)) {
      excludedByStatus += quantity;
      continue;
    }

    approvedTickets += quantity;
    const ticketType = row[ticketTypeIndex].trim();
    if (!ticketType) throw new Error(`CSV row ${index + 2} has no ticket type.`);
    ticketTypes.set(ticketType, (ticketTypes.get(ticketType) || 0) + quantity);
    if (
      selectedTicketTypes.length > 0 &&
      !selectedTicketTypes.includes(ticketType.toLowerCase())
    ) {
      continue;
    }
    selectedTickets += quantity;

    const email = normalizeGmail(row[emailIndex]);
    if (!email) {
      nonGmailTickets += quantity;
      continue;
    }
    sourceTicketCounts.set(
      email,
      (sourceTicketCounts.get(email) || 0) + quantity,
    );
  }

  const importedSourceTickets = [...sourceTicketCounts.values()].reduce(
    (total, count) => total + count,
    0,
  );
  return {
    sourceTicketCounts,
    summary: {
      csvRows: rows.length - 1,
      approvedTickets,
      selectedTicketTypes:
        selectedTicketTypes.length > 0
          ? selectedTicketTypes
          : "all (dry run only)",
      selectedTickets,
      importedGmailSourceTickets: importedSourceTickets,
      uniqueEligibleGmails: sourceTicketCounts.size,
      additionalSourceTicketsUnderSharedGmails:
        importedSourceTickets - sourceTicketCounts.size,
      maxSourceTicketsPerGmail: sourceTicketCounts.size
        ? Math.max(...sourceTicketCounts.values())
        : 0,
      excludedByStatus,
      nonGmailTickets,
      ticketTypes: Object.fromEntries(
        [...ticketTypes.entries()].sort(([left], [right]) =>
          left.localeCompare(right),
        ),
      ),
    },
  };
}
