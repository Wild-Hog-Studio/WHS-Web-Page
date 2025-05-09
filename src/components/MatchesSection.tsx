import type { FC } from "react";
import useGetMatchData from "../hooks/useGetMatchData";
import type { Rounds } from "../types/Rounds";
import MatchCard from "./MatchCard";

const dummyMatches = [
  {
    playerA: "JUGADORA",
    playerB: "JUGADORB",
    scoreA: 0,
    scoreB: 10,
    date: "05 MAY 2025",
    energiesA: ["agua", "fuego"],
    energiesB: ["fuego", "fuego"],
  },
  {
    playerA: "ERIKA",
    playerB: "PABLO",
    scoreA: 5,
    scoreB: 7,
    date: "05 MAY 2025",
    energiesA: ["tierra", "fuego"],
    energiesB: ["luz", "aire"],
  },
  {
    playerA: "JAZ",
    playerB: "RAMIRO",
    scoreA: 10,
    scoreB: 4,
    date: "05 MAY 2025",
    energiesA: ["hoja", "veneno"],
    energiesB: ["sombra", "fuego"],
  },
  {
    playerA: "LUIS",
    playerB: "FER",
    scoreA: 8,
    scoreB: 10,
    date: "05 MAY 2025",
    energiesA: ["agua", "hoja"],
    energiesB: ["fuego", "fuego"],
  },
  {
    playerA: "NADIA",
    playerB: "OMAR",
    scoreA: 6,
    scoreB: 6,
    date: "05 MAY 2025",
    energiesA: ["sombra", "agua"],
    energiesB: ["veneno", "fuego"],
  },
  {
    playerA: "ALAN",
    playerB: "VAL",
    scoreA: 9,
    scoreB: 3,
    date: "05 MAY 2025",
    energiesA: ["hoja", "luz"],
    energiesB: ["fuego", "tierra"],
  },
  {
    playerA: "LORE",
    playerB: "IVÁN",
    scoreA: 4,
    scoreB: 4,
    date: "05 MAY 2025",
    energiesA: ["aire", "sombra"],
    energiesB: ["agua", "veneno"],
  },
  {
    playerA: "MIA",
    playerB: "ROD",
    scoreA: 7,
    scoreB: 10,
    date: "05 MAY 2025",
    energiesA: ["fuego", "fuego"],
    energiesB: ["luz", "hoja"],
  },
];

interface MatchesSectionProps {
  round: string
}

const MatchesSection:FC<MatchesSectionProps> = ({ round }) => {
  const { matchesList} = useGetMatchData()

  const getMatchesPerRound = (roundNumber: string) => matchesList.filter((match: Rounds) => match.round == roundNumber)

  return (
    <section className="flex flex-col items-center gap0 mt-32 pb-60">
      <h2 className="text-white text-6xl font-extrabold">Ronda {round}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15">
        {getMatchesPerRound(round).map((match, index) => (
          <MatchCard key={index} round={match} />
        ))}
      </div>
    </section>
  );
};

export default MatchesSection;
