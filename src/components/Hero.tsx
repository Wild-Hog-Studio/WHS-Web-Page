import "../styles/global.css";
import { useEffect, useMemo, useState } from "react";

function getInitialLang(): "es" | "en" {
  const htmlLang = document?.documentElement?.getAttribute("lang") || "";
  const saved = localStorage.getItem("lang") || "";
  const guess = (htmlLang || saved || navigator.language || "es")
    .split("-")[0]
    .toLowerCase();
  return guess === "en" ? "en" : "es";
}

export default function Hero() {
  const [lang, setLang] = useState<"es" | "en">(getInitialLang);

  useEffect(() => {
    const target = document.documentElement;
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "attributes" && m.attributeName === "lang") {
          const v = target.getAttribute("lang") || "es";
          setLang(v.startsWith("en") ? "en" : "es");
        }
      }
    });
    obs.observe(target, { attributes: true });
    return () => obs.disconnect();
  }, []);

  const src = useMemo(
    () => (lang === "es" ? "/assets/Eslogan-es.png" : "/assets/Eslogan-en.png"),
    [lang]
  );

  return (
    <section
      className="
        relative w-full
        h-[32vh]           /* MOBILE como antes */
        md:h-[29.77vh]     /* DESKTOP como el último (−10%) */
        overflow-hidden bg-[#212529]
      "
    >
      {/* fondo */}
      <div className="absolute inset-0 bg-[#212529]" aria-hidden />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/assets/Background.png')" }}
        aria-hidden
      />

      {/* contenido centrado */}
<div
  className="
    relative h-full
    grid place-items-center        /* ⬅️ mobile: centra en ambos ejes */
    md:flex md:items-center md:justify-center
    mx-auto w-full max-w-[1440px]
    px-4 sm:px-6 lg:px-8 text-center
  "
>
<img
  src={src}
  className="
    block                           /* ⬅️ evita el pequeño desajuste vertical */
    w-[72%] sm:w-[63%] md:w-[37.8%]
    max-w-md sm:max-w-lg md:max-w-[22.05rem]
    object-contain
  "
  alt={lang === "es" ? "Eslogan en español" : "Slogan in English"}
/>
      </div>
    </section>
  );
}
