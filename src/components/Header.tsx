import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const SCROLL_THRESHOLD = 220;
const HYSTERESIS = 24;
const FLAG_WIDTH = 260;
const FALLBACK_MAX_W = 1180; // si no encuentra [data-frame]

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [logoH, setLogoH] = useState(56);
  const [frame, setFrame] = useState({ left: 0, width: FALLBACK_MAX_W });

  const logoRef = useRef<HTMLImageElement | null>(null);

  // mide el frame (columna central con data-frame)
  useEffect(() => {
    const computeFrame = () => {
      const el = document.querySelector("[data-frame]") as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        setFrame({ left: r.left, width: r.width });
      } else {
        const ww = window.innerWidth;
        const w = Math.min(FALLBACK_MAX_W, ww);
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

  // mide altura del logo horizontal para fijar altura del header
  useEffect(() => {
    const updateLogoHeight = () => {
      const img = logoRef.current;
      if (!img) return;
      if (img.naturalWidth && img.naturalHeight) {
        const scale = FLAG_WIDTH / img.naturalWidth;
        const h = Math.round(img.naturalHeight * scale);
        if (h > 0) setLogoH(h);
      } else {
        const rect = img.getBoundingClientRect();
        if (rect.height > 0) setLogoH(Math.round(rect.height));
      }
    };
    updateLogoHeight();
    window.addEventListener("resize", updateLogoHeight);
    logoRef.current?.addEventListener("load", updateLogoHeight);
    return () => {
      window.removeEventListener("resize", updateLogoHeight);
      logoRef.current?.removeEventListener("load", updateLogoHeight);
    };
  }, []);

  // histéresis de scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (visible && y > SCROLL_THRESHOLD + HYSTERESIS) setVisible(false);
      if (!visible && y < SCROLL_THRESHOLD - HYSTERESIS) setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  return (
    <>
      {/* Wrapper del header TRANSPARENTE */}
      <div className="fixed top-0 left-0 right-0 z-40" style={{ height: logoH }}>
        {/* Capa gris centrada SOLO sobre la columna */}
        <div className="absolute inset-0 flex justify-center pointer-events-none" aria-hidden>
          <div
            style={{
              width: frame.width,
              height: "100%",
              backgroundColor: "#121418",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        {/* Contenido del header alineado al frame */}
        <div className="h-full px-4 flex items-center justify-end mx-auto" style={{ width: frame.width }}>
          <Link
            to="/gallery"
            className="px-3 py-1 rounded-lg bg-white text-black text-sm font-semibold hover:opacity-90"
          >
            Galería
          </Link>
        </div>
      </div>

      {/* Bandera anclada al borde IZQ del frame */}
      <div className="fixed z-50 top-0 select-none" style={{ left: frame.left }}>
        <div
          style={{
            width: FLAG_WIDTH,
            transform: `scaleY(${visible ? 1 : 0})`,
            transformOrigin: "top left",
            opacity: visible ? 1 : 0,
            transition: "transform 220ms cubic-bezier(.22,.61,.36,1), opacity 220ms ease",
            pointerEvents: visible ? "auto" : "none",
          }}
        >
          <img
            src="/assets/WHS/Flag White Black BG.png"
            alt="Wild Hog Studio Flag"
            className="block w-[260px] h-auto drop-shadow-xl"
            draggable={false}
          />
        </div>
      </div>

      {/* Logo horizontal en el MISMO lugar */}
      <div className="fixed z-50 top-0 select-none" style={{ left: frame.left }}>
        <div
          style={{
            width: FLAG_WIDTH,
            opacity: visible ? 0 : 1,
            transform: visible ? "translateY(-6px) scale(0.98)" : "translateY(0) scale(1)",
            transition: "opacity 220ms ease, transform 220ms ease",
            pointerEvents: visible ? "none" : "auto",
          }}
          aria-hidden={visible}
        >
          <img
            ref={logoRef}
            src="/assets/WHS/Horizontal%20Logo%20Name%20White.png"
            alt="Wild Hog Studio"
            className="block w-[260px] h-auto"
            draggable={false}
          />
        </div>
      </div>

      {/* Spacer = altura del logo */}
      <div style={{ height: logoH }} />
    </>
  );
}
