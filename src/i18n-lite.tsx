// src/i18n-lite.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "es" | "en";
type Dict = Record<string, string>;

// Diccionario ES
const es: Dict = {
  // NAV
  "nav.home": "Inicio",
  "nav.team": "Equipo",
  "nav.story": "Historia",

  // SECCIONES
  "sections.services": "Servicios",
  "cta.quote": "Solicitar cotización",

  // SERVICIOS
  "services.games.title": "Videojuegos Indie",
  "services.games.desc": "Prototipos, vertical slice y lanzamientos para PC y mobile.",
  "services.games.b1": "Unity, C#, pipelines de build",
  "services.games.b2": "Integración con tiendas y analytics",
  "services.games.b3": "Arte/UX colaborativo",

  "services.web.title": "Sitios Web",
  "services.web.desc": "Landings y sitios rápidos con métricas Core Web Vitals en verde.",
  "services.web.b1": "Astro + React + Tailwind",
  "services.web.b2": "SEO técnico y accesibilidad",
  "services.web.b3": "Deploy en Vercel",

  "services.apps.title": "Web Apps",
  "services.apps.desc": "Dashboards, paneles admin y flujos transaccionales.",
  "services.apps.b1": "React + Vite",
  "services.apps.b2": "Auth y roles (Supabase/Appwrite)",
  "services.apps.b3": "Automatizaciones e integraciones",
};

// Diccionario EN
const en: Dict = {
  // NAV
  "nav.home": "Home",
  "nav.team": "Team",
  "nav.story": "Story",

  // SECTIONS
  "sections.services": "Services",
  "cta.quote": "Get a quote",

  // SERVICES
  "services.games.title": "Indie Games",
  "services.games.desc": "Prototypes, vertical slices, and launches for PC & mobile.",
  "services.games.b1": "Unity, C#, build pipelines",
  "services.games.b2": "Store integrations & analytics",
  "services.games.b3": "Art/UX collaboration",

  "services.web.title": "Websites",
  "services.web.desc": "Fast landing pages with green Core Web Vitals.",
  "services.web.b1": "Astro + React + Tailwind",
  "services.web.b2": "Technical SEO & accessibility",
  "services.web.b3": "Vercel deployments",

  "services.apps.title": "Web Apps",
  "services.apps.desc": "Dashboards, admin panels, and transactional flows.",
  "services.apps.b1": "React + Vite",
  "services.apps.b2": "Auth & roles (Supabase/Appwrite)",
  "services.apps.b3": "Automations & integrations",
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
