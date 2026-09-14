import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "./siteContent";
import { taiwanArchiveContent as siteContent } from "./taiwanArchiveContent";

type LocaleContextValue = {
  content: (typeof siteContent)[Locale];
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = { children: ReactNode } & (
  | { locale: Locale; onLocaleChange: (locale: Locale) => void }
  | { locale?: never; onLocaleChange?: never }
);

export function LocaleProvider({
  children,
  locale: selectedLocale,
  onLocaleChange,
}: LocaleProviderProps) {
  const [internalLocale, setInternalLocale] = useState<Locale>("zh-TW");
  const locale = selectedLocale ?? internalLocale;
  const setLocale = onLocaleChange ?? setInternalLocale;
  const content = siteContent[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", content.metaDescription);
  }, [content.metaDescription, locale]);

  const value = useMemo(
    () => ({ content, locale, setLocale }),
    [content, locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
