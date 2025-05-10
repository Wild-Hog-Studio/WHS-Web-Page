import { useEffect, useState } from "react";
import type { Participant } from "../types/Participants";
import type { Rounds } from "../types/Rounds";

const useGetMatchData = () => {
  const [participantsList, setParticipants] = useState<Participant[]>([]);
  const [matchesList, setMatches] = useState<Rounds[]>([]);

  const getParticipants = async () => {
    const res = await fetch(`/api/participants?tournamentId=${15965818}`);
    const data = await res.json();
    setParticipants(data);
  };

  const getMatches = async () => {
    const res = await fetch(`/api/rounds?tournamentId=${15965818}`);
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    getMatches();
    getParticipants();
  }, []);

  return { participantsList, matchesList };
};

export default useGetMatchData;
