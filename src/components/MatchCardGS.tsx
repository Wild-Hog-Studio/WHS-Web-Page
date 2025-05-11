import React from "react";

interface MatchCardGSProps {
  player1: string;
  player2: string;
  score1: string;
  score2: string;
  energy1A: string;
  energy2A: string;
  energy3A: string;
  energy4A: string;
  energy5A: string;
  energy6A: string;
  energy1B: string;
  energy2B: string;
  energy3B: string;
  energy4B: string;
  energy5B: string;
  energy6B: string;
  banPlayer1?: number;
  banPlayer2?: number;
  date: string;
}

const energyImages: Record<string, string> = {
  Atlico: "/assets/01 Atlico.webp",
  Chaaktico: "/assets/02 Chaaktiko.webp",
  Demotico: "/assets/03 Demotico.webp",
  Feral: "/assets/04 Feral.webp",
  Gelido: "/assets/05 Gelido.webp",
  Huumico: "/assets/06 Huumico.webp",
  Litico: "/assets/07 Litico.webp",
  Pírico: "/assets/08 Pirico.webp",
};

const getEnergyImg = (type: string) => energyImages[type] || "/assets/placeholder.webp";

const MatchCardGS: React.FC<MatchCardGSProps> = ({
  player1,
  player2,
  score1,
  score2,
  energy1A,
  energy2A,
  energy3A,
  energy4A,
  energy5A,
  energy6A,
  energy1B,
  energy2B,
  energy3B,
  energy4B,
  energy5B,
  energy6B,
  banPlayer1,
  banPlayer2,
  date
}) => {
  const s1 = parseInt(score1);
  const s2 = parseInt(score2);
  const winner = isNaN(s1) || isNaN(s2) ? null : s1 > s2 ? "p1" : s2 > s1 ? "p2" : "draw";

const renderEnergyPair = (
  a: string,
  b: string,
  idx: number,
  banned: boolean
) => (
  <div key={idx} className="relative w-fit">
    {/* Capa 1: Imágenes (afectadas por filtro) */}
    <div
      className={`flex gap-2 items-center transition-all duration-300 ${
        banned ? "opacity-40 grayscale scale-90" : ""
      }`}
      title={banned ? "Baneado" : ""}
    >
      <img
        src={getEnergyImg(a)}
        alt={a}
        title={a}
        className="w-10 h-10 rounded-md"
      />
      <img
        src={getEnergyImg(b)}
        alt={b}
        title={b}
        className="w-10 h-10 rounded-md"
      />
    </div>

    {/* Capa 2: Texto (no afectado por filtros) */}
    {banned && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs  text-white-600  pointer-events-none z-10">
        BANEADO
      </div>
    )}
  </div>
);


  return (
    <div className="bg-zinc-900 rounded-3xl px-6 py-4 w-80 text-white text-base flex flex-col items-center shadow-lg gap-4">
      {/* Nombres */}
<div className="grid grid-cols-2 w-full font-bold text-2xl text-center gap-2">
  <span className="text-cyan-300 truncate max-w-[145px] mx-auto" title={player1}>{player1}</span>
  <span className="text-rose-400 truncate max-w-[145px] mx-auto" title={player2}>{player2}</span>
</div>

      {/* Energías */}
 <div className="grid grid-cols-2 w-full justify-items-center gap-y-2">
  <div className="flex flex-col gap-2">
    {renderEnergyPair(energy1A, energy2A, 1, banPlayer1 === 1)}
    {renderEnergyPair(energy3A, energy4A, 2, banPlayer1 === 2)}
    {renderEnergyPair(energy5A, energy6A, 3, banPlayer1 === 3)}
  </div>
  <div className="flex flex-col gap-2">
    {renderEnergyPair(energy1B, energy2B, 4, banPlayer2 === 1)}
    {renderEnergyPair(energy3B, energy4B, 5, banPlayer2 === 2)}
    {renderEnergyPair(energy5B, energy6B, 6, banPlayer2 === 3)}
  </div>
</div>

      {/* Resultado */}
      {score1 && score2 ? (
        <div className="grid grid-cols-2 w-full text-3xl font-extrabold mt-2">
          <div className={`text-center ${winner === "p1" ? "text-green-400" : ""}`}>{score1}</div>
          <div className={`text-center ${winner === "p2" ? "text-green-400" : ""}`}>{score2}</div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 mt-1 font-semibold">Partida pendiente</div>
      )}

      {/* Fecha */}
      <div className="text-sm text-gray-400 mt-2 uppercase tracking-wider">{date}</div>
    </div>
  );
};

export default MatchCardGS;
