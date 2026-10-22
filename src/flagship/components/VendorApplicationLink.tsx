import { ArrowUpRight } from "iconoir-react";
import type { SiteLanguage } from "../data/copy";
import { thailandEvent } from "../thailand/data/event";
import "./vendor-application.css";

const labels: Record<SiteLanguage, string> = {
  "zh-TW": "攤商申請",
  en: "Vendor Application",
  ko: "판매 부스 신청",
  th: "สมัครออกบูธ",
};

export function VendorApplicationLink({ language }: { language: SiteLanguage }) {
  return <a className="vendor-application vendor-application--partners" href={thailandEvent.vendorApplicationUrl} target="_blank" rel="noreferrer">
    <span><strong>{labels[language]}</strong></span>
    <ArrowUpRight aria-hidden="true" />
  </a>;
}
