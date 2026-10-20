const campaignWords = ["FLAGSHIP CARD SHOW", "CARD SHOW THAILAND", "THAILAND FLAGSHIP"];

/** One quiet campaign backdrop connects the introduction and highlights. */
export function ThailandOpeningBackdrop() {
  return <div className="th-opening-atmosphere" aria-hidden="true">
    <div className="th-opening-wordmark">
      {campaignWords.map(word => <span key={word}>{word}</span>)}
    </div>
    <div className="th-opening-continuation">
      {Array.from({ length: 9 }, (_, index) => <span key={index}>{campaignWords[index % campaignWords.length]}</span>)}
    </div>
  </div>;
}
