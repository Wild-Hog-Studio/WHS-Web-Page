import React, { useEffect, useState } from "react";

const TOURNAMENT_ID = "15965818";

interface Round1Match {
  p1: string;
  p2: string;
  score: string;
}

const ChallongeTest = () => {
  const [round1Matches, setRound1Matches] = useState<Round1Match[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        // fetch participants from proxy
        const pRes = await fetch(`/api/challonge/proxy?path=tournaments/${TOURNAMENT_ID}/participants.json`);
        const pData = await pRes.json();

        const participants = pData.map((p: any) => ({
          id: p.participant.id,
          name: p.participant.name?.startsWith("Participant") ? "???" : p.participant.name
        }));

        const idToName = Object.fromEntries(participants.map((p: { id: number, name: string }) => [p.id, p.name]));

        // fetch matches from proxy
        const mRes = await fetch(`/api/challonge/proxy?path=tournaments/${TOURNAMENT_ID}/matches.json`);
        const mData = await mRes.json();

        const round1 = mData
          .filter((m: any) => m.match.round === 1)
          .map((m: any) => ({
            p1: idToName[m.match.player1_id] || "???",
            p2: idToName[m.match.player2_id] || "???",
            score: m.match.scores_csv || "Sin resultado"
          }));

        setRound1Matches(round1);
      } catch (err) {
        console.error("Error al cargar los datos del torneo:", err);
      }
    };

    loadMatches();
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Matches Ronda 1</h2>
      <ul className="space-y-2">
        {round1Matches.map((m, i) => (
          <li key={i} className="bg-gray-800 p-3 rounded-md shadow-md">
            <span className="font-semibold">{m.p1}</span> vs <span className="font-semibold">{m.p2}</span> →{" "}
            <span className="font-mono text-cyan-300">{m.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallongeTest;
