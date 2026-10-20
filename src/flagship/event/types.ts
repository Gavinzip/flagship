import type { SiteLanguage } from "../data/copy";

type HighlightCopy = {
  number: "01" | "02" | "03" | "04" | "05";
  english: string;
  title: string;
  description: string;
  alt: string;
};

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

export type EventContent = {
  navigation: readonly { label: string; href: string }[];
  highlights: {
    title: string;
    english: string;
    items: readonly HighlightCopy[];
  };
  vendors: {
    title: string;
    english: string;
    organizerLabel: string;
    titleSponsorLabel: string;
    vendorLabel: string;
  };
  venue: {
    title: string;
    english: string;
  };
  faq: {
    categoryLabel: string;
    categories: readonly string[];
    items: readonly FaqItem[];
  };
};


export type EventPageCopy = {
  metaDescription: string;
  event: EventContent;
  preview: string;
  details: { date: string; time: string; venue: string; venueDetail: string; mapTitle: string; directions: string };
  headline: string; intro: string; explore: string; ticketCta: string; officialUpdates: string;
  registration: string; registrationNote: string; menu: string; navigation: string;
  search: string; noResults: string; home: string; date: string; time: string; venue: string;
  pause: string; resume: string; partnersNote: string; partnerDirectoryTitle: string;
  partnerDirectoryBody: string; visitNote: string; close: string; faqTitle: string; back: string; footer: string;
};
export type EventArtwork = { kind: "panorama"; panels: readonly string[]; continuous: boolean; width: number; height: number } | { kind: "halftone" };
export type EventDefinition = {
  id: "korea" | "thailand";
  country: string;
  city: string;
  ticketUrl: string;
  mapQuery: string;
  titleSponsor: boolean;
  captions: { highlights: string; partners: string; venue: string; faq: string };
  artwork: EventArtwork;
  copy: Record<SiteLanguage, EventPageCopy>;
};
