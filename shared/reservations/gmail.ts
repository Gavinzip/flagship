export function normalizeGmail(value: unknown) {
  if (typeof value !== "string") return null;

  const rawEmail = value.trim().toLowerCase();
  if (!rawEmail || rawEmail.length > 254) return null;

  const parts = rawEmail.split("@");
  if (parts.length !== 2) return null;

  const [localWithTag, domain] = parts;
  if (domain !== "gmail.com" && domain !== "googlemail.com") return null;

  const local = localWithTag.split("+", 1)[0];
  if (
    !local ||
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !/^[a-z0-9.]+$/.test(local)
  ) {
    return null;
  }

  return `${local.replaceAll(".", "")}@gmail.com`;
}
