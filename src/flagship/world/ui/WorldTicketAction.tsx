import { StellarActionContent } from "../../home/ui/StellarActionContent";
import "./world-ticket.css";

/** Each edition supplies its own confirmed ticket or explicitly labelled updates URL. */
export function WorldTicketAction({ label, href }: { label: string; href: string }) {
  return (
    <a
      className="world-ticket-action stellar-action"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="world-ticket-aura" aria-hidden="true" />
      <StellarActionContent>{label}</StellarActionContent>
    </a>
  );
}
