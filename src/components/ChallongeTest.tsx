import React, { useEffect, useState } from "react";
import type { Participant } from "../types/Participants";

const getTournamentId = () => {
  return "15965818";
};

const ChallongeTest = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `/api/participants?tournamentId=${getTournamentId()}`
      );

      const data = await res.json();

      setParticipants(data);
    };
    loadData();
  }, []);

  return (
    <div className="bg-white mt-56 w-full ">
      {participants.map((participant) => (
        <div key={participant.id} className="text-black font-bold text-xl">
          <p>
            {participant.id} {participant.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChallongeTest;
