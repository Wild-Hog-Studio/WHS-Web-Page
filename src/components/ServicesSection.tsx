// components/ServicesSection.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useI18nLite } from "../i18n-lite";
import { FaGamepad } from "react-icons/fa";
import { FiGlobe, FiLayout } from "react-icons/fi";

// ───────────────────────────────────────────────────────────
// [CONFIG / TIPOS]
// ───────────────────────────────────────────────────────────
type Slide = {
  key: "games" | "web" | "apps";
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  bullets: string[];
  img: string;   // ruta .webp en /public
  altEs: string;
  altEn: string;
};

// ───────────────────────────────────────────────────────────
// [COMPONENTE PRINCIPAL]
// ───────────────────────────────────────────────────────────
export default function ServicesSection() {
  // ─────────────────────────────────────────────────────────
  // [STATE / CONTEXTO]
  // ─────────────────────────────────────────────────────────
  const { t, lang } = useI18nLite();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  // ─────────────────────────────────────────────────────────
// [SLIDES / CONTENIDO]
const slides: Slide[] = useMemo(
  () => [
    {
      key: "web",
      icon: <FiGlobe className="text-2xl text-white" />,
      titleKey: "services.web.title",
      descKey: "services.web.desc",
      bullets: ["services.web.b1", "services.web.b2", "services.web.b3"],
      img: "/assets/services/web-bg.webp",
      altEs: "Fondo de desarrollo web",
      altEn: "Web development background",
    },
    {
      key: "games",
      icon: <FaGamepad className="text-2xl text-white" />,
      titleKey: "services.games.title",
      descKey: "services.games.desc",
      bullets: ["services.games.b1", "services.games.b2", "services.games.b3"],
      img: "/assets/services/games-bg.webp",
      altEs: "Fondo de videojuegos",
      altEn: "Games background",
    },
    {
      key: "apps",
      icon: <FiLayout className="text-2xl text-white" />,
      titleKey: "services.apps.title",
      descKey: "services.apps.desc",
      bullets: ["services.apps.b1", "services.apps.b2", "services.apps.b3"],
      img: "/assets/services/apps-bg.webp",
      altEs: "Fondo de aplicaciones",
      altEn: "Apps background",
    },
  ],
  [lang]
);

  // ─────────────────────────────────────────────────────────
  // [EFECTOS: ACTUALIZA ÍNDICE SEGÚN SCROLL]
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(Math.max(0, Math.min(i, slides.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  // ─────────────────────────────────────────────────────────
  // [HELPERS DE NAVEGACIÓN]
const scrollToIndex = (i: number) => {
  const el = scrollerRef.current;
  if (!el) return;
  el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
};

const prev = () => scrollToIndex((index - 1 + slides.length) % slides.length);
const next = () => scrollToIndex((index + 1) % slides.length);

  // ─────────────────────────────────────────────────────────
  // [RENDER]
  // ─────────────────────────────────────────────────────────
  return (
    <section id="services" className="py-12 sm:py-16">
      {/* ─────────────────────────────────────────────────────
          [TÍTULO + INTRO]
          ─────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center uppercase tracking-wider text-white text-3xl sm:text-4xl font-extrabold mb-2">
          {t("sections.services")} {/* SERVICIOS */}
        </h2>
        <p className="text-center text-white/75 mb-8">
          {lang === "es"
            ? "Creamos experiencias digitales a medida: videojuegos, sitios web y aplicaciones."
            : "We craft custom digital experiences: games, websites, and apps."}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────
          [CARRUSEL EN DOS COLUMNAS]
          ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-[1180px] px-2 sm:px-4">
        {/* [SCROLLER] */}
        <div
          ref={scrollerRef}
          tabIndex={0}
          className="
            relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth
            focus:outline-none
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
        >
          <style>{`.hide-scroll::-webkit-scrollbar{display:none;}`}</style>

          <div className="flex w-full hide-scroll">
            {slides.map((s) => (
              <div key={s.key} className="snap-center shrink-0 w-full">
                {/* [SLIDE ITEM] */}
                <article
                  className="
                    mx-2 sm:mx-3 rounded-2xl border border-white/10 overflow-hidden
                    bg-white/5 backdrop-blur-sm
                    grid grid-cols-1 md:grid-cols-2
                  "
                >
                  {/* Columna izquierda: info */}
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                    {/* Icono + título (dorado en 'games') */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 grid place-items-center rounded-lg bg-white/10">
                        {s.icon}
                      </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide text-[#d4af37]">
  {t(s.titleKey)}   {/* Videojuegos Indie / Sitios Web / Web Apps */}
</h3>
                    </div>

                    {/* Descripción */}
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                      {t(s.descKey)}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2 text-sm sm:text-base text-white/75 mb-6">
                      {s.bullets.map((k) => (
                        <li key={k} className="flex gap-2">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                          <span>{t(k)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA centrado (solo texto “Solicitar cotización”, sin flecha) */}
                    <div className="mt-2 flex justify-center">
                      <a
                        href="#contact"
                        className="relative inline-flex items-center justify-center
                                   px-5 py-2.5 rounded-xl
                                   font-semibold uppercase tracking-wide text-black
                                   bg-gradient-to-b from-[#e6c14b] to-[#d4af37]
                                   shadow-[0_8px_24px_rgba(212,175,55,0.25)]
                                   hover:shadow-[0_12px_32px_rgba(212,175,55,0.35)]
                                   transition-transform duration-200 will-change-transform
                                   hover:scale-[1.03] active:scale-[0.98] focus:outline-none
                                   focus-visible:ring-2 focus-visible:ring-[#d4af37]/60"
                        aria-label="Solicitar cotización"
                      >
                        Solicitar cotización
                      </a>
                    </div>
                  </div>

                  {/* Columna derecha: imagen */}
                  <div className="relative min-h-[220px] md:min-h-[360px]">
                    <img
                      src={s.img}
                      alt={lang === "es" ? s.altEs : s.altEn}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────
            [FLECHAS]
            ─────────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1 sm:px-2">
          <button
            onClick={prev}
            className="pointer-events-auto hidden sm:grid place-items-center w-8 h-8 rounded-full border border-white/20 bg-black/30 hover:bg-black/50"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="pointer-events-auto hidden sm:grid place-items-center w-8 h-8 rounded-full border border-white/20 bg-black/30 hover:bg-black/50"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────
            [DOTS]
            ─────────────────────────────────────────────────── */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition ${
                index === i ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
