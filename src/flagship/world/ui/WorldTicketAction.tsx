import { StellarActionContent } from "../../home/ui/StellarActionContent";
import "./world-ticket.css";

const ticketUrl = "https://luma.com/5qs2r3xi";

/** Korea's external registration action stays separate from edition navigation. */
export function WorldTicketAction({ label }: { label: string }) {
  return (
    <a
      className="world-ticket-action stellar-action"
      href={ticketUrl}
      target="_blank"
      rel="noreferrer"
    >
      <span className="world-ticket-aura" aria-hidden="true" />
      <StellarActionContent>{label}</StellarActionContent>
    </a>
  );
}
