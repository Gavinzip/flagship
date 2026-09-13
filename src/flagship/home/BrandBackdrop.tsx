/** Original geometric accents extend the emblem's rising ribbons and edge lights. */
export function BrandBackdrop() {
  return <div className="brand-backdrop" aria-hidden="true">
    <svg className="brand-facets" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="brand-red-facet" x1="0" y1="570" x2="520" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#b41e3a" stopOpacity=".16"/><stop offset="1" stopColor="#b41e3a" stopOpacity="0"/></linearGradient>
        <linearGradient id="brand-blue-facet" x1="1440" y1="420" x2="950" y2="540" gradientUnits="userSpaceOnUse"><stop stopColor="#255fce" stopOpacity=".19"/><stop offset="1" stopColor="#255fce" stopOpacity="0"/></linearGradient>
        <linearGradient id="brand-silver-facet" x1="70" y1="700" x2="700" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#90a0b7" stopOpacity=".12"/><stop offset=".47" stopColor="#fff" stopOpacity=".65"/><stop offset=".5" stopColor="#fff" stopOpacity=".12"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
      </defs>
      <path d="M-160 682 500 305 237 596-160 824Z" fill="url(#brand-silver-facet)"/>
      <path d="M-80 604 495 342 325 474-80 707Z" fill="url(#brand-red-facet)"/>
      <path d="M950 554 1530 210 1530 384Z" fill="url(#brand-blue-facet)"/>
      <path d="M-100 630 448 377M-60 674 350 477" stroke="#b6324c" strokeOpacity=".24"/>
      <path d="M1007 489 1500 262M1090 510 1490 334" stroke="#396dc8" strokeOpacity=".3"/>
      <path d="M-100 632 448 379M1007 491 1500 264" stroke="white" strokeOpacity=".9"/>
    </svg>
  </div>;
}
