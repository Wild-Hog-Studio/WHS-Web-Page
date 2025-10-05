// components/Header.tsx
import { useEffect, useState } from "react";
import "../styles/global.css";
import FlagLogo from "./FlagLogo";
import TargetLangToggle from "./TargetLangToggle";
import { useI18nLite } from "../i18n-lite";

const MOBILE_BAR_H = 50; // altura del topbar mobile (debe coincidir con el style del topbar)

export default function Header() {
  const [logoH, setLogoH] = useState(56);                 // alto del logo (desktop)
  const [frame, setFrame] = useState({ left: 0, width: 1180 });
  const [open, setOpen] = useState(false);                // menú mobile

  const { t } = useI18nLite();
  const label = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const FLAG_WIDTH = 260;   // ancho bandera/logo (desktop)
  const FLAG_GUTTER = 20;   // separación entre bandera y menú
  const FLAG_SLOT = FLAG_WIDTH + FLAG_GUTTER;

  // Mide la columna central para respetar rieles
  useEffect(() => {
    const computeFrame = () => {
      const el = document.querySelector("[data-frame]") as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        setFrame({ left: r.left, width: r.width });
      } else {
        const ww = window.innerWidth;
        const w = Math.min(1180, ww);
        const left = Math.max(0, (ww - w) / 2);
        setFrame({ left, width: w });
      }
    };
    computeFrame();
    window.addEventListener("resize", computeFrame);
    window.addEventListener("load", computeFrame);
    return () => {
      window.removeEventListener("resize", computeFrame);
      window.removeEventListener("load", computeFrame);
    };
  }, []);

  return (
    <>
      {/* HEADER FIJO */}
      <div className="fixed inset-x-0 top-0 z-[80]">
        {/* ───────── MOBILE TOPBAR (<= lg) ───────── */}
        <div
          className="lg:hidden bg-[#0e1114] border-b border-white/10"
          style={{ height: MOBILE_BAR_H }}  // asegura 50px
        >
          <div className="h-full grid grid-cols-[auto_1fr_auto] items-center px-3 gap-2">
            {/* Hamburguesa */}
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="w-10 h-10 grid place-items-center rounded-md border border-white/10 hover:border-white/30 active:scale-95 transition"
            >
              <span className="relative block w-6 h-3.5">
                <span className="absolute left-0 right-0 top-0 h-[2px] bg-white/90 rounded-sm" />
                <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/90 rounded-sm" />
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/90 rounded-sm" />
              </span>
            </button>

            {/* Logo centrado */}
            <div className="flex justify-center">
              <img
                src="/assets/WHS/Horizontal%20Logo%20Name%20White.png"
                alt="Wild Hog Studio"
                className="h-5 object-contain"
              />
            </div>

            {/* Idioma a la derecha */}
            <div className="flex justify-end">
              <TargetLangToggle />
            </div>
          </div>
        </div>

        {/* ───────── DESKTOP BAR (>= lg) ───────── */}
        <div className="hidden lg:block" style={{ height: logoH }}>
          <div className="relative h-full">
            {/* Fondo gris SOLO en la columna */}
            <div className="absolute inset-0 flex justify-center pointer-events-none z-0" aria-hidden>
              <div
                style={{
                  width: frame.width,
                  height: "100%",
                  backgroundColor: "#121418",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            {/* Contenido del header */}
            <div
              className="relative z-10 h-full mx-auto flex items-center"
              style={{ width: frame.width, paddingLeft: FLAG_SLOT, paddingRight: 16 }}
            >
              <nav className="flex items-center gap-8 uppercase tracking-wider text-[13px] font-extrabold">
                <a href="/" className="text-white/80 hover:text-white">
                  {label("nav.home", "Home")}
                </a>
                <a href="#team" className="text-white/80 hover:text-white">
                  {label("nav.team", "Team")}
                </a>
                <a href="#story" className="text-white/80 hover:text-white">
                  {label("nav.story", "Story")}
                </a>
              </nav>

              <div className="ml-auto">
                <TargetLangToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bandera/Logo por ENCIMA del header (solo desktop) */}
      <div className="hidden lg:block">
        <FlagLogo
          flagSrc="/assets/WHS/Flag White Black BG.png"
          logoSrc="/assets/WHS/Horizontal%20Logo%20Name%20White.png"
          width={FLAG_WIDTH}
          threshold={220}
          hysteresis={24}
          durationMs={600}
          frameSelector="[data-frame]"
          fallbackMaxW={1180}
          onHeightChange={setLogoH}
          zIndex={120}   // por encima del header
        />
      </div>

      {/* Spacer para que el contenido NO quede debajo del header */}
      <div className="lg:hidden" style={{ height: MOBILE_BAR_H }} />
      <div className="hidden lg:block" style={{ height: logoH }} />

      {/* ───────── MOBILE DRAWER ───────── */}
      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-[95] bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* panel */}
          <div className="fixed top-0 left-0 bottom-0 z-[96] w-[78%] max-w-[320px] bg-[#0e1114] border-r border-white/10 p-4">
            <div className="flex items-center justify-between mb-4">
              <img
                src="/assets/WHS/Horizontal%20Logo%20Name%20White.png"
                alt="Wild Hog Studio"
                className="h-6 object-contain"
              />
              <button
                aria-label="Close menu"
                className="w-9 h-9 grid place-items-center rounded-md border border-white/10 hover:border-white/30"
                onClick={() => setOpen(false)}
              >
                <span className="block h-[2px] w-5 bg-white rotate-45 translate-y-[1px]" />
                <span className="block h-[2px] w-5 bg-white -rotate-45 -translate-y-[1px]" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 uppercase tracking-wider text-[13px] font-extrabold">
              <a href="/" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                {label("nav.home", "Home")}
              </a>
              <a href="#team" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                {label("nav.team", "Team")}
              </a>
              <a href="#story" className="text-white/90 hover:text-white" onClick={() => setOpen(false)}>
                {label("nav.story", "Story")}
              </a>
              <div className="pt-2">
                <TargetLangToggle />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
