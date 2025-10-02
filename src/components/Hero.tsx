import "../styles/global.css";
import { useEffect, useMemo, useState } from "react";

// offset solo para escritorio (cuando la bandera ocupa espacio a la izquierda)
const HERO_LEFT_OFFSET = 280;

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
    <section className="relative w-full h-[35vh] md:h-[70vh] overflow-hidden bg-[#212529]">
      {/* Capa 1: fondo gris full-bleed */}
      <div className="absolute inset-0 bg-[#212529]" aria-hidden />

      {/* Capa 2: imagen de fondo */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/assets/Background.png')" }}
        aria-hidden
      />

{/* Contenido */}
<div
  className="
    relative h-full flex items-center 
    justify-center lg:justify-start 
    mx-auto w-full max-w-[1440px] 
    px-4 sm:px-6 lg:px-8
    lg:pl-[280px]
  "
>
  <img
    src={src}
    className="w-[80%] sm:w-[70%] max-w-md sm:max-w-lg md:max-w-2xl object-contain"
    alt={lang === "es" ? "Eslogan en español" : "Slogan in English"}
  />
</div>
    </section>
  );
}
