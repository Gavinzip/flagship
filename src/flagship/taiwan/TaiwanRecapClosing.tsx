import { ActionLink } from "../../components/ActionLink";
import { useLocale } from "../../i18n/LocaleProvider";
import { officialLinks } from "../data/editions";

export function TaiwanRecapClosing() {
  const { content } = useLocale();
  return (
    <section className="section taiwan-recap-closing" id="recap-closing">
      <div className="site-shell" data-reveal>
        <p className="taiwan-recap-closing__eyebrow">FLAGSHIP · TAIWAN 2026</p>
        <h2>{content.archive.thanks}</h2>
        <p>{content.archive.description}</p>
        <ActionLink href={officialLinks.updates} target="_blank" rel="noreferrer">
          {content.archive.updates}
        </ActionLink>
      </div>
    </section>
  );
}
