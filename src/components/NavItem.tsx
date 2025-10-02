import { Link } from "react-router-dom";
import { type ReactNode } from "react";

type Props = {
  to?: string;                 // para rutas SPA
  href?: string;               // para anclas externas (#team)
  children: ReactNode;
};

export default function NavItem({ to, href, children }: Props) {
  const Inner = (
    <span className="relative group inline-flex items-center justify-center select-none">
      {/* Fondo que aparece con zoom */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-md bg-black/70
                   opacity-0 scale-90
                   transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
                   group-hover:opacity-100 group-hover:scale-100"
      />
      {/* Borde blanco */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-md border border-white
                   opacity-0 scale-90
                   transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
                   group-hover:opacity-100 group-hover:scale-100"
      />
      {/* Texto */}
      <span
        className="relative z-10 px-3 py-2 uppercase tracking-wider text-[13px]
                   font-extrabold text-white/80 group-hover:text-white
                   transition-colors"
      >
        {children}
      </span>
    </span>
  );

  // Puedes usar Link o <a> según necesites
  if (to) return <Link to={to} className="inline-block">{Inner}</Link>;
  return (
    <a href={href} className="inline-block">
      {Inner}
    </a>
  );
}
