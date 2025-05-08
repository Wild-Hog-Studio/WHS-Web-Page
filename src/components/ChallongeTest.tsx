import React, { useEffect, useState } from "react";

const TOURNAMENT_ID = "15965818";

interface Participant {
  id: number;
  name: string;
}

interface Match {
  player1_id: number;
  player2_id: number;
  scores_csv: string;
  round: number;
}

const ChallongeTest = () => {
  const [participants, setParticipants] = useState<Record<number, string>>({});
  const [rounds, setRounds] = useState<Record<number, Match[]>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pRes, mRes] = await Promise.all([
            fetch(`/api/challonge?path=tournaments/15965818/participants.json`),
            fetch(`/api/challonge?path=tournaments/15965818/matches.json`)
        ]);

        const participantsJson = await pRes.json();
        const matchesJson = await mRes.json();

        const pMap: Record<number, string> = {};
        participantsJson.forEach((p: any) => {
          pMap[p.participant.id] = p.participant.name;
        });
        setParticipants(pMap);

        const rMap: Record<number, Match[]> = {};
        matchesJson.forEach((m: any) => {
          const round = m.match.round;
          if (!rMap[round]) rMap[round] = [];
          rMap[round].push(m.match);
        });
        setRounds(rMap);
      } catch (err) {
        setError("Error al cargar datos del torneo");
        console.error(err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Resultados del Torneo</h2>
      {error && <p className="text-red-400">{error}</p>}
      {!error &&
        Object.keys(rounds)
          .sort((a, b) => Number(a) - Number(b))
          .map((round) => (
            <div key={round} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Ronda {round}</h3>
              <ul className="list-disc ml-6">
                {rounds[Number(round)].map((match, i) => (
                  <li key={i}>
                    {participants[match.player1_id] || "???"} vs{" "}
                    {participants[match.player2_id] || "???"} — {match.scores_csv || "Sin resultado"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
  );
};

export default ChallongeTest;
