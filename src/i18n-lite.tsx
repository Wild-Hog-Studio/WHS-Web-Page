// src/i18n-lite.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "es" | "en";
type Dict = Record<string, string>;

const es: Dict = {
  // ... lo que ya tienes
  "nav.home": "Inicio",
  "nav.team": "Equipo",
  "nav.story": "Historia"
};

const en: Dict = {
  // ... lo que ya tienes
  "nav.home": "Home",
  "nav.team": "Team",
  "nav.story": "Story"
};

const maps: Record<Lang, Dict> = { es, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nLiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = (localStorage.getItem("lang") || "").split("-")[0] as Lang;
    if (saved === "es" || saved === "en") return saved;
    const nav = (navigator.language || "es").split("-")[0] as Lang;
    return nav === "en" ? "en" : "es";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const t = (k: string) => maps[lang][k] ?? k;
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18nLite() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18nLite must be used within I18nLiteProvider");
  return ctx;
}
