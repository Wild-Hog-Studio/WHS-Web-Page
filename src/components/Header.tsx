import { useEffect, useState } from "react";
import "../styles/global.css";
import FlagLogo from "./FlagLogo";

export default function Header() {
  const [logoH, setLogoH] = useState(56);
  const [frame, setFrame] = useState({ left: 0, width: 1180 });

  const FLAG_WIDTH = 260;
  const FLAG_GUTTER = 20;         // separa menú de la bandera
  const FLAG_SLOT = FLAG_WIDTH + FLAG_GUTTER;

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
   // HEADER FIJO (no uses 'relative' aquí)
<div className="fixed inset-x-0 top-0 z-[80]" style={{ height: logoH }}>
  {/* Hijo relativo: sirve de contenedor para la capa gris absoluta */}
  <div className="relative h-full">
    {/* Fondo gris SOLO en la columna */}
    <div
      className="absolute inset-0 flex justify-center pointer-events-none z-0"
      aria-hidden
    >
      <div
        style={{
          width: frame.width,
          height: "100%",
          backgroundColor: "#121418",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      />
    </div>

    {/* Contenido del header (por encima del fondo) */}
    <div
      className="relative z-10 h-full mx-auto flex items-center"
      style={{ width: frame.width, paddingLeft: FLAG_SLOT, paddingRight: 16 }}
    >
      <nav className="flex items-center gap-8 uppercase tracking-wider text-[13px] font-extrabold">
        <a href="/" className="text-white/80 hover:text-white">Home</a>
        <a href="#team" className="text-white/80 hover:text-white">Team</a>
        <a href="#story" className="text-white/80 hover:text-white">Story</a>
      </nav>
      <div className="ml-auto">
        <a className="uppercase tracking-wider text-[12px] font-extrabold text-white/60 hover:text-white">
          English
        </a>
      </div>
    </div>
  </div>
</div>

      {/* Bandera/Logo por ENCIMA del header */}
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
        zIndex={120}      // ⬅️ más alto que el header
      />

      {/* spacer para que el contenido no quede debajo del header fijo */}
      <div style={{ height: logoH }} />
    </>
  );
}
