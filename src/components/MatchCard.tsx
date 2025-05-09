import React from "react";
import type { FC } from "react";
import type { Rounds } from "../types/Rounds";
import useGetMatchData from "../hooks/useGetMatchData";
import type { Participant } from "../types/Participants";

/* interface MatchCardProps {
  playerA: string;
  playerB: string;
  scoreA: number;
  scoreB: number;
  date: string;
  energiesA: string[];
  energiesB: string[];
} */

interface MatchCardProps {
  round: Rounds
}

const energyColors: Record<string, string> = {
  fuego: "bg-red-500",
  agua: "bg-blue-400",
  tierra: "bg-amber-800",
  aire: "bg-gray-300",
  sombra: "bg-gray-700",
  luz: "bg-yellow-300",
  hoja: "bg-green-500",
  veneno: "bg-purple-500",
};

const MatchCard: FC<MatchCardProps> = ({
  round
}) => {
  const { participantsList } = useGetMatchData()
  

  const mapUserName = (id: string) => {
 
    const participant:Participant =  participantsList.filter((elem: Participant) => elem.id == id)[0]
   
    if(participant) return participant.username
    return 'no existe'
  }

  

  return (
    <div className="bg-zinc-900 rounded-3xl px-6 py-4 w-80 text-white text-base flex flex-col items-center shadow-lg gap-2">
      {/* Nombres de jugadores centrados y más juntos */}
      <div className="flex justify-center gap-4 w-full font-bold text-xl">
        <span className="text-cyan-300">{mapUserName(round.player1ID)}</span>
        <span className="text-rose-400">{mapUserName(round.player2ID)}</span>
      </div>

      {/* Energías */}
{/*      <div className="flex gap-2 items-center">
        {energiesA.map((e, i) => (
          <div key={`a-${i}`} className={`w-5 h-5 rounded-full ${energyColors[e]}`} />
        ))}
        <span className="mx-1 text-xl font-black">vs</span>
        {energiesB.map((e, i) => (
          <div key={`b-${i}`} className={`w-5 h-5 rounded-full ${energyColors[e]}`} />
        ))}
      </div> */}

      {/* Resultado */}
      <div className="text-3xl font-extrabold">
        {round.score}
      </div>

      {/* Fecha */}
{/*       <div className="text-base text-gray-400">{date}</div> */}
    </div>
  );
};

export default MatchCard;
