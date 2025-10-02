import { useEffect, useRef, useState } from "react";

type Props = {
  /** Imagen de la bandera (cuando la página inicia) */
  flagSrc: string;
  /** Imagen del logo horizontal (cuando la bandera se oculta) */
  logoSrc: string;

  /** Ancho visual (px) para bandera y logo. Default: 260 */
  width?: number;

  /** Scroll donde cambia de bandera→logo. Default: 220 */
  threshold?: number;
  /** Margen anti-parpadeo alrededor del threshold. Default: 24 */
  hysteresis?: number;

  /** Selector del contenedor central (para respetar rieles). Default: "[data-frame]" */
  frameSelector?: string;
  /** Ancho de fallback si no se encuentra frameSelector. Default: 1180 */
  fallbackMaxW?: number;

  /** Recibe el alto del logo calculado (para que el Header use esa altura) */
  onHeightChange?: (h: number) => void;

  /** Duración de las animaciones en ms. Default: 420 */
  durationMs?: number;

  /** Z-index de este bloque (para que no lo tape el header). Default: 120 */
  zIndex?: number;
};

export default function FlagLogo({
  flagSrc,
  logoSrc,
  width = 260,
  threshold = 220,
  hysteresis = 24,
  frameSelector = "[data-frame]",
  fallbackMaxW = 1180,
  onHeightChange,
  durationMs = 420,
  zIndex = 120, // ⬅️ por defecto por encima del header
}: Props) {
  // visible = muestra bandera (true) o logo (false)
  const [visible, setVisible] = useState(true);
  const [frame, setFrame] = useState({ left: 0, width: fallbackMaxW });
  const logoRef = useRef<HTMLImageElement | null>(null);

  // ====== Animación
  const LOGO_SCALE_OUT = 0.86; // tamaño al salir (zoom-out)
  const EASE = "cubic-bezier(.16,1,.3,1)";

  // ====== Alinear al contenedor central (respeta rieles)
  useEffect(() => {
    const computeFrame = () => {
      const el = document.querySelector(frameSelector) as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        setFrame({ left: r.left, width: r.width });
      } else {
        const ww = window.innerWidth;
        const w = Math.min(fallbackMaxW, ww);
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
  }, [frameSelector, fallbackMaxW]);

  // ====== Umbral con histéresis (binario: se ve o no se ve)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (visible && y > threshold + hysteresis) setVisible(false);
      if (!visible && y < threshold - hysteresis) setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible, threshold, hysteresis]);

  // ====== Medir alto del logo horizontal y reportar al Header
  useEffect(() => {
    const updateLogoHeight = () => {
      const img = logoRef.current;
      if (!img) return;

      if (img.naturalWidth && img.naturalHeight) {
        const scale = width / img.naturalWidth;
        const h = Math.round(img.naturalHeight * scale);
        if (h > 0) onHeightChange?.(h);
      } else {
        const rect = img.getBoundingClientRect();
        if (rect.height > 0) onHeightChange?.(Math.round(rect.height));
      }
    };

    updateLogoHeight();
    window.addEventListener("resize", updateLogoHeight);
    logoRef.current?.addEventListener("load", updateLogoHeight);
    return () => {
      window.removeEventListener("resize", updateLogoHeight);
      logoRef.current?.removeEventListener("load", updateLogoHeight);
    };
  }, [width, onHeightChange]);

  const logoVisible = !visible; // cuando la bandera desaparece

  return (
    <>
      {/* Bandera */}
      <div
        className="fixed top-0 select-none"
        style={{ left: frame.left, zIndex }}   // ⬅️ manda el z-index por style
      >
        <div
          style={{
            width,
            transform: `scaleY(${visible ? 1 : 0})`,
            transformOrigin: "top left",
            opacity: visible ? 1 : 0,
            transition: `transform ${durationMs}ms ${EASE}, opacity ${durationMs}ms ease`,
            pointerEvents: visible ? "auto" : "none",
            willChange: "transform,opacity",
          }}
        >
          <img
            src={flagSrc}
            alt="Flag"
            className="block h-auto drop-shadow-xl"
            style={{ width }}
            draggable={false}
          />
        </div>
      </div>

      {/* Logo horizontal — zoom in (al entrar) / zoom out (al salir) */}
      <div
        className="fixed top-0 select-none"
        style={{ left: frame.left, zIndex }}   // ⬅️ igual aquí
      >
        <div
          style={{
            width,
            opacity: logoVisible ? 1 : 0,
            transform: `scale(${logoVisible ? 1 : LOGO_SCALE_OUT})`,
            transformOrigin: "top left", // usa "center" si prefieres escalar desde el centro
            transition: `transform ${durationMs}ms ${EASE}, opacity ${durationMs}ms ease`,
            pointerEvents: logoVisible ? "auto" : "none",
            willChange: "transform,opacity",
          }}
          aria-hidden={!logoVisible}
        >
          <img
            ref={logoRef}
            src={logoSrc}
            alt="Logo"
            className="block h-auto"
            style={{ width }}
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
