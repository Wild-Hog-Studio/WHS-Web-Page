import React, { useEffect, useMemo, useRef, useState } from "react";
import { useI18nLite } from "../i18n-lite";
import { FaGamepad } from "react-icons/fa";
import { FiGlobe, FiLayout } from "react-icons/fi";

type Slide = {
  key: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  bullets: string[];
  img: string; // ruta .webp en /public
  altEs: string;
  altEn: string;
};

export default function ServicesSection() {
  const { t, lang } = useI18nLite();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const slides: Slide[] = useMemo(
    () => [
      {
        key: "games",
        icon: <FaGamepad className="text-2xl" />,
        titleKey: "services.games.title",
        descKey: "services.games.desc",
        bullets: ["services.games.b1", "services.games.b2", "services.games.b3"],
        img: "/assets/services/games-bg.webp",
        altEs: "Fondo de videojuegos",
        altEn: "Games background",
      },
      {
        key: "web",
        icon: <FiGlobe className="text-2xl" />,
        titleKey: "services.web.title",
        descKey: "services.web.desc",
        bullets: ["services.web.b1", "services.web.b2", "services.web.b3"],
        img: "/assets/services/web-bg.webp",
        altEs: "Fondo de desarrollo web",
        altEn: "Web development background",
      },
      {
        key: "apps",
        icon: <FiLayout className="text-2xl" />,
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

  // Actualiza el índice según el scroll
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

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const prev = () => scrollToIndex(Math.max(0, index - 1));
  const next = () => scrollToIndex(Math.min(slides.length - 1, index + 1));

  return (
    <section id="services" className="py-12 sm:py-16">
      {/* Título centrado + intro */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center uppercase tracking-wider text-3xl sm:text-4xl font-extrabold mb-2">
          {t("sections.services")}
        </h2>
        <p className="text-center text-white/75 mb-6">
          {lang === "es"
            ? "Creamos experiencias digitales a medida: videojuegos, sitios web y aplicaciones."
            : "We craft custom digital experiences: games, websites, and apps."}
        </p>
      </div>

      {/* Carrusel más pequeño (más angosto y ligeramente más bajo) */}
      <div className="relative mx-auto w-full max-w-[980px] px-2 sm:px-4">
        {/* Scroller */}
        <div
          ref={scrollerRef}
          tabIndex={0}
          className="
            relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth
            focus:outline-none
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          <div className="flex w-full">
            {slides.map((s) => (
              <div key={s.key} className="snap-center shrink-0 w-full">
                <article className="mx-2 sm:mx-3 rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
                  {/* Header visual: más panorámico para bajar altura */}
                  <div className="relative w-full aspect-[21/9]">
                    <img
                      src={s.img}
                      alt={lang === "es" ? s.altEs : s.altEn}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* Contenido compacto */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 grid place-items-center rounded-lg bg-white/10">
                        {s.icon}
                      </div>
                      <h3 className="text-lg font-bold">{t(s.titleKey)}</h3>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed mb-3">
                      {t(s.descKey)}
                    </p>

                    <ul className="space-y-2 text-sm text-white/75 mb-4">
                      {s.bullets.map((k) => (
                        <li key={k} className="flex gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                          <span>{t(k)}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-3 py-2 rounded-lg
                                 border border-white/20 hover:border-white/40
                                 text-sm font-semibold uppercase tracking-wide"
                    >
                      {t("cta.quote")}
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Flechas (opcionales en xs; visibles ≥ sm) */}
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

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
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
