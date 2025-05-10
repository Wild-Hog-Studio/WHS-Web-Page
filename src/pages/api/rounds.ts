// pages/api/rounds.ts

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tournamentId = searchParams.get("tournamentId");
  const API_KEY = "u1Q3PNnBMbsCANGcjvap76SdLv1Wk1VsJnOWdOKp";

  if (!tournamentId) {
    return new Response(JSON.stringify({ error: "Missing tournamentId" }), {
      status: 400,
    });
  }

  const response = await fetch(
    `https://api.challonge.com/v1/tournaments/${tournamentId}/matches.json?api_key=${API_KEY}`
  );

  const rawMatches = await response.json();

  // Flatten the match data here
  const matches = rawMatches.map((entry: any) => {
    const m = entry.match;
    return {
      player1ID: m.player1_id?.toString() ?? "",
      player2ID: m.player2_id?.toString() ?? "",
      winnerID: m.winner_id?.toString() ?? "",
      score: m.scores_csv ?? "",
      state: m.state,
      completedAt: m.completed_at ?? "",
      round: m.round
    };
  });

  return new Response(JSON.stringify(matches), {
    headers: { "Content-Type": "application/json" },
  });
}