import { useState, useEffect } from "react";
import type { FC } from "react";
import useGetMatchData from "../hooks/useGetMatchData";
import type { Rounds } from "../types/Rounds";
import MatchCard from "./MatchCard";

const MatchesSection: FC = () => {
  const { matchesList } = useGetMatchData();

  const groupedByRound = matchesList.reduce((acc: Record<string, Rounds[]>, match: Rounds) => {
    const roundKey = match.round.toString();
    if (!acc[roundKey]) acc[roundKey] = [];
    acc[roundKey].push(match);
    return acc;
  }, {});

  const sortedRounds = Object.keys(groupedByRound).sort((a, b) => Number(a) - Number(b)); // menor → mayor

  const [selectedRound, setSelectedRound] = useState<string>("");

  // Mostramos por default la ronda más alta (última)
  useEffect(() => {
    if (sortedRounds.length > 0) {
      setSelectedRound(sortedRounds[sortedRounds.length - 1]); // última ronda
    }
  }, [matchesList]);

  if (!selectedRound) return null;

  return (
    <section className="flex flex-col items-center mt-32 pb-60 text-white">
      {/* Pestañas */}
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {sortedRounds.map((round) => (
          <button
            key={round}
            onClick={() => setSelectedRound(round)}
            className={`px-6 py-3 text-lg rounded-full font-bold transition ${
              selectedRound === round
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            Ronda {round}
          </button>
        ))}
      </div>

      {/* Título */}
      <h2 className="text-4xl font-extrabold mb-8">Ronda {selectedRound}</h2>

      {/* Matches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15">
        {groupedByRound[selectedRound].map((match, index) => (
          <MatchCard key={index} round={match} />
        ))}
      </div>
    </section>
  );
};

export default MatchesSection;
