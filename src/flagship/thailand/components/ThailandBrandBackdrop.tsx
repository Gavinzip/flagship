const campaignWords = ["FLAGSHIP CARD SHOW", "CARD SHOW THAILAND", "THAILAND FLAGSHIP"];

/** One continuous text field covers the whole page; opaque hero and venue artwork sit above it. */
export function ThailandBrandBackdrop() {
  return <div className="th-brand-atmosphere" aria-hidden="true">
    <div className="th-brand-wordmark">
      {Array.from({ length: 96 }, (_, index) => <span key={index}>{campaignWords[index % campaignWords.length]}</span>)}
    </div>
  </div>;
}
