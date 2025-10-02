import React from "react";
import { useI18nLite } from "../i18n-lite";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, t } = useI18nLite();
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <label className="text-xs uppercase tracking-wide opacity-70">{t("language")}</label>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as "es" | "en")}
        className="bg-transparent border border-white/20 rounded-md px-2 py-1 text-sm"
        aria-label={t("language")}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
