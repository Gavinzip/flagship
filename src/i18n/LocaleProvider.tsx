import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { siteContent, type Locale } from "./siteContent";

type LocaleContextValue = {
  content: (typeof siteContent)[Locale];
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh-TW");
  const content = siteContent[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", content.metaDescription);
  }, [content.metaDescription, locale]);

  const value = useMemo(
    () => ({ content, locale, setLocale }),
    [content, locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
