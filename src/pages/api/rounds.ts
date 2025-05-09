export const prerender = false;

export const GET = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const tournamentId = url.searchParams.get("tournamentId");
  const apiKey = import.meta.env.PUBLIC_CHALLONGE_API_KEY;

  const apiUrl = `https://api.challonge.com/v1/tournaments/${tournamentId}/matches.json?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const matches = data.map(
      (element: { match: { player1_id: { toString: () => any; }; player2_id: { toString: () => any; }; winner_id: { toString: () => any; }; round: { toString: () => any; }; scores_csv: { toString: () => any; }; }; }) => {
        return {
        player1ID: element.match.player1_id.toString(),
        player2ID: element.match.player2_id.toString(),
        winnerID: element.match.winner_id.toString(),
        round: element.match.round.toString(),
        score:element.match.scores_csv.toString()
        };
      }
    );

    return new Response(JSON.stringify(matches), {
      status: 200,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e }), { status: 500 });
  }
};
