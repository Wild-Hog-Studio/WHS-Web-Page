import React from "react";
import { useI18nLite } from "../i18n-lite";

export default function TargetLangToggle({
  className = "",
}: { className?: string }) {
  const { lang, setLang } = useI18nLite();
  const target = lang === "es" ? "en" : "es";

  // Mostrar el nombre del idioma en su propio idioma (como en tu referencia)
  const label = target === "en" ? "ENGLISH" : "ESPAÑOL";

  return (
    <button
      type="button"
      onClick={() => setLang(target)}
      aria-label={`Switch to ${label}`}
      className={
        "uppercase tracking-wider text-[12px] font-extrabold text-white/70 hover:text-white " +
        "transition-colors " + className
      }
    >
      {label}
    </button>
  );
}
