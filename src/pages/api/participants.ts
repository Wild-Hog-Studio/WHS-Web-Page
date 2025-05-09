export const prerender = false;

export const GET = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const tournamentId = url.searchParams.get("tournamentId");
  const apiKey = import.meta.env.CHALLONGE_API_KEY;

  const apiUrl = `https://api.challonge.com/v1/tournaments/${tournamentId}/participants.json?api_key=${apiKey}`;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const participants = data.map(
      (element: { participant: { id: any; username: any } }) => {
        return {
          id: element.participant.id,
          username: element.participant.username,
        };
      }
    );

    return new Response(JSON.stringify(participants), {
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
