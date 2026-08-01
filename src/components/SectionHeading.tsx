type SectionHeadingProps = {
  title: string;
  english: string;
  description?: string;
};

export function SectionHeading({
  title,
  english,
  description,
}: SectionHeadingProps) {
  return (
    <header className="section-heading" data-reveal>
      <div>
        <h2>{title}</h2>
        <p className="section-heading__english">{english}</p>
      </div>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </header>
  );
}
