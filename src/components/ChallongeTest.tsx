import React, { useEffect, useState } from "react";
import MatchCardGS from "./MatchCardGS";

interface Match {
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
  date: string;
}


const ChallongeTest = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRP4iJUzd4VCEzHTYBLbgMeIaalCheHOopp7NtUObTx2675mVYy_wz6TTuwWVKgcOjaGbixI7RzimLF/pub?gid=1475515281&single=true&output=csv";

      try {
        const res = await fetch(url);
        const text = await res.text();
        const lines = text.split("\n");

        const parsed: Match[] = lines
          .slice(1) // omitir encabezado
          .map((line, idx) => {
            const cols = line.split(",");

            // Seguridad por si faltan columnas
            if (cols.length < 11) return null;

            return {
              player1: cols[0]?.trim(),
              energy1A: cols[1]?.trim(),
              energy2A: cols[2]?.trim(),
              player2: cols[3]?.trim(),
              energy1B: cols[4]?.trim(),
              energy2B: cols[5]?.trim(),
              date: `${cols[7]?.trim()} ${cols[8]?.trim()}`,
              score1: cols[10]?.split("-")[0]?.trim() || "-",
              score2: cols[10]?.split("-")[1]?.trim() || "-"
            };
          })
          .filter((match): match is Match => match !== null);

        setMatches(parsed);
      } catch (err) {
        console.error("Error al cargar el CSV:", err);
      }
    };

    fetchCSV();
  }, []);

  return (
    <section className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-6">Partidas de la Ronda 1</h2>

      {matches.length === 0 && (
        <p className="text-yellow-400">Cargando partidas...</p>
      )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {matches.map((match, idx) => (
    <MatchCardGS
      key={idx}
      player1={match.player1}
      player2={match.player2}
      score1={match.score1}
      score2={match.score2}
      energy1A={match.energy1A}
      energy2A={match.energy2A}
      energy3A={match.energy3A}
      energy4A={match.energy4A}
      energy5A={match.energy5A}
      energy6A={match.energy6A}
      energy1B={match.energy1B}
      energy2B={match.energy2B}
      energy3B={match.energy3B}
      energy4B={match.energy4B}
      energy5B={match.energy5B}
      energy6B={match.energy6B}
      date={match.date}
    />
  ))}
</div>

    </section>
  );
};

export default ChallongeTest;
