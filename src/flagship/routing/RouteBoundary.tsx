import { Component, type ReactNode } from "react";
import { SiteLink } from "./SiteNavigation";
import type { SiteLanguage } from "../data/copy";

const messages = {
  en: ["Opening the event", "The event page could not be loaded.", "Please check your connection and try again.", "Retry", "Back to Flagship"],
  "zh-TW": ["正在開啟活動網站", "活動頁面載入失敗", "請檢查網路連線後重試。", "重新載入", "返回 Flagship"],
  ko: ["행사 페이지를 여는 중", "행사 페이지를 불러오지 못했습니다.", "인터넷 연결을 확인한 후 다시 시도해 주세요.", "다시 시도", "Flagship으로 돌아가기"],
};

export function RouteStatus({ language, error = false }: { language: SiteLanguage; error?: boolean }) {
  const text = messages[language];
  return <main className="brand-route-status" aria-live="polite">
    <p>FLAGSHIP CARD SHOW</p><h1>{text[error ? 1 : 0]}</h1>
    {error && <><p>{text[2]}</p><button onClick={() => window.location.reload()}>{text[3]}</button></>}
    <SiteLink page="home">{text[4]} ↗</SiteLink>
  </main>;
}

export class RouteBoundary extends Component<{ children: ReactNode; language: SiteLanguage }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? <RouteStatus language={this.props.language} error /> : this.props.children; }
}

export function loadWithDeadline<T>(loader: () => Promise<T>, timeout = 20000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Event module timed out after 20 seconds.")), timeout);
    loader().then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); });
  });
}
