import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { buildEligibilityReplaceSql } from "./reservations/eligibilitySql.ts";
import { buildLumaGuestSnapshot } from "./reservations/lumaGuestSnapshot.ts";

const args = process.argv.slice(2);
const sourceArg = args.find((arg) => !arg.startsWith("--"));
const applyLocal = args.includes("--apply-local");
const applyRemote = args.includes("--apply-remote");
const replace = args.includes("--replace");
const excludeNonGmail = args.includes("--exclude-non-gmail");
const selectedTicketTypes = args
  .filter((arg) => arg.startsWith("--ticket-type="))
  .map((arg) => arg.slice("--ticket-type=".length).trim().toLowerCase())
  .filter(Boolean);
const remoteConfirmation = args.includes(
  "--confirm-remote=IMPORT-EARLY-BIRD-GUESTS",
);

function readExpectedInteger(name: string) {
  const prefix = `--${name}=`;
  const value = args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  if (value === undefined) return null;
  if (!/^\d+$/.test(value)) {
    throw new Error(`${prefix} must be a non-negative integer.`);
  }
  return Number(value);
}

if (!sourceArg) {
  throw new Error(
    "Usage: pnpm reservation:eligibility:import -- <luma-guests.csv|-> [--apply-local|--apply-remote --replace]",
  );
}
if (applyLocal && applyRemote) throw new Error("Choose one apply target.");
if ((applyLocal || applyRemote) && !replace) {
  throw new Error("Applying an eligibility snapshot requires --replace.");
}
if (applyRemote && !remoteConfirmation) {
  throw new Error(
    "Remote import requires --confirm-remote=IMPORT-EARLY-BIRD-GUESTS after deployment approval.",
  );
}

const source =
  sourceArg === "-"
    ? readFileSync(0, "utf8")
    : readFileSync(resolve(sourceArg), "utf8");
const { sourceTicketCounts, summary } = buildLumaGuestSnapshot(
  source,
  selectedTicketTypes,
);
console.log(JSON.stringify(summary, null, 2));

if (!applyLocal && !applyRemote) {
  console.log("Dry run only. No database changes were made.");
} else {
  const expectedCsvRows = readExpectedInteger("expect-csv-rows");
  const expectedApprovedTickets = readExpectedInteger("expect-approved-tickets");
  const expectedSelectedTickets = readExpectedInteger("expect-selected-tickets");
  if (!selectedTicketTypes.length) {
    throw new Error("Applying requires --ticket-type=<exact name>.");
  }
  if (
    expectedCsvRows === null ||
    expectedApprovedTickets === null ||
    expectedSelectedTickets === null
  ) {
    throw new Error(
      "Applying requires all three --expect-* values from a reviewed dry run.",
    );
  }
  if (
    expectedCsvRows !== summary.csvRows ||
    expectedApprovedTickets !== summary.approvedTickets ||
    expectedSelectedTickets !== summary.selectedTickets
  ) {
    throw new Error("Eligibility snapshot reconciliation failed.");
  }
  if (summary.nonGmailTickets > 0 && !excludeNonGmail) {
    throw new Error(
      "Selected non-Gmail tickets were found; review policy before --exclude-non-gmail.",
    );
  }
  if (!sourceTicketCounts.size) {
    throw new Error("No eligible Gmail records remain.");
  }

  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "flagship-eligibility-import-"),
  );
  const sqlPath = join(temporaryDirectory, "eligibility.sql");
  try {
    writeFileSync(sqlPath, buildEligibilityReplaceSql(sourceTicketCounts), {
      mode: 0o600,
    });
    const wranglerArgs = [
      "exec",
      "wrangler",
      "d1",
      "execute",
      "flagship-early-bird-reservations",
      applyRemote ? "--remote" : "--local",
      "--config",
      "cloudflare/reservations/wrangler.jsonc",
      "--file",
      sqlPath,
    ];
    if (applyLocal) wranglerArgs.push("--persist-to", ".wrangler/state");
    const result = spawnSync("pnpm", wranglerArgs, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
    if (result.status !== 0) throw new Error("Eligibility import failed.");
    console.log(
      `Imported ${sourceTicketCounts.size} eligible Gmail records covering ${summary.importedGmailSourceTickets} source tickets for reconciliation.`,
    );
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}
