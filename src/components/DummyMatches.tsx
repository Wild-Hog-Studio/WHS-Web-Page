import React from "react";
import MatchCardGS from "./MatchCardGS";

const DummyMatches = () => {
const dummyData = [
  {
    player1: "Yeriko",
    player2: "EmiVZO",
    score1: "10",
    score2: "7",
    energy1A: "Pírico",
    energy2A: "Feral",
    energy3A: "Gelido",
    energy4A: "Litico",
    energy5A: "Chaaktico",
    energy6A: "Huumico",
    energy1B: "Atlico",
    energy2B: "Gelido",
    energy3B: "Pírico",
    energy4B: "Chaaktico",
    energy5B: "Demotico",
    energy6B: "Feral",
    date: "08 MAY 2025",
    banPlayer1: 2,
    banPlayer2: 3
  },
  {
    player1: "KERVEROZ",
    player2: "FJVR",
    score1: "5",
    score2: "10",
    energy1A: "Gelido",
    energy2A: "Litico",
    energy3A: "Pírico",
    energy4A: "Chaaktico",
    energy5A: "Demotico",
    energy6A: "Feral",
    energy1B: "Chaaktico",
    energy2B: "Demotico",
    energy3B: "Gelido",
    energy4B: "Litico",
    energy5B: "Huumico",
    energy6B: "Pírico",
    date: "09 MAY 2025",
    banPlayer1: 3,
    banPlayer2: 1
  },
  {
    player1: "L_G2",
    player2: "Miguelsnam",
    score1: "9",
    score2: "10",
    energy1A: "Chaaktico",
    energy2A: "Litico",
    energy3A: "Feral",
    energy4A: "Demotico",
    energy5A: "Gelido",
    energy6A: "Pírico",
    energy1B: "Feral",
    energy2B: "Litico",
    energy3B: "Chaaktico",
    energy4B: "Huumico",
    energy5B: "Atlico",
    energy6B: "Gelido",
    date: "09 MAY 2025",
    banPlayer1: 1,
    banPlayer2: 2
  },
  {
    player1: "Blitzer21",
    player2: "Karusso",
    score1: "6",
    score2: "8",
    energy1A: "Litico",
    energy2A: "Demotico",
    energy3A: "Atlico",
    energy4A: "Feral",
    energy5A: "Gelido",
    energy6A: "Huumico",
    energy1B: "Chaaktico",
    energy2B: "Litico",
    energy3B: "Demotico",
    energy4B: "Pírico",
    energy5B: "Gelido",
    energy6B: "Feral",
    date: "10 MAY 2025",
    banPlayer1: 2,
    banPlayer2: 1
  },
  {
    player1: "Avalon_Tcg",
    player2: "AMBIRUS",
    score1: "7",
    score2: "10",
    energy1A: "Atlico",
    energy2A: "Chaaktico",
    energy3A: "Demotico",
    energy4A: "Gelido",
    energy5A: "Litico",
    energy6A: "Feral",
    energy1B: "Feral",
    energy2B: "Chaaktico",
    energy3B: "Huumico",
    energy4B: "Demotico",
    energy5B: "Gelido",
    energy6B: "Pírico",
    date: "10 MAY 2025",
    banPlayer1: 3,
    banPlayer2: 2
  },
  {
    player1: "HannanBaal",
    player2: "Kingboar",
    score1: "10",
    score2: "5",
    energy1A: "Demotico",
    energy2A: "Gelido",
    energy3A: "Feral",
    energy4A: "Pírico",
    energy5A: "Atlico",
    energy6A: "Chaaktico",
    energy1B: "Gelido",
    energy2B: "Huumico",
    energy3B: "Litico",
    energy4B: "Demotico",
    energy5B: "Feral",
    energy6B: "Atlico",
    date: "11 MAY 2025",
    banPlayer1: 1,
    banPlayer2: 2
  },
  {
    player1: "Emmageek78",
    player2: "Nokaramu",
    score1: "4",
    score2: "10",
    energy1A: "Feral",
    energy2A: "Pírico",
    energy3A: "Chaaktico",
    energy4A: "Litico",
    energy5A: "Demotico",
    energy6A: "Gelido",
    energy1B: "Chaaktico",
    energy2B: "Gelido",
    energy3B: "Litico",
    energy4B: "Feral",
    energy5B: "Pírico",
    energy6B: "Atlico",
    date: "11 MAY 2025",
    banPlayer1: 2,
    banPlayer2: 3
  },
  {
    player1: "Blasterjaxx132",
    player2: "neimv",
    score1: "7",
    score2: "7",
    energy1A: "Atlico",
    energy2A: "Gelido",
    energy3A: "Litico",
    energy4A: "Demotico",
    energy5A: "Feral",
    energy6A: "Huumico",
    energy1B: "Chaaktico",
    energy2B: "Litico",
    energy3B: "Gelido",
    energy4B: "Demotico",
    energy5B: "Pírico",
    energy6B: "Feral",
    date: "12 MAY 2025",
    banPlayer1: 3,
    banPlayer2: 1
  }
];


  return (
    <section className="p-4 text-white max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dummy Matches</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-65 gap-y-20">
        {dummyData.map((match, idx) => (
          <MatchCardGS key={idx} {...match} />
        ))}
      </div>
    </section>
  );
};

export default DummyMatches;
