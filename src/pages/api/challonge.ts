export async function GET({ url }: { url: URL }) {
    const path = url.searchParams.get("path");
    const apiKey = import.meta.env.CHALLONGE_API_KEY;
  
    if (!path || !apiKey) {
      return new Response(JSON.stringify({ error: "Missing path or API key" }), { status: 400 });
    }
  
    const apiUrl = `https://api.challonge.com/v1/${path}.json?api_key=${apiKey}`;
  
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        const errText = await res.text();
        return new Response(JSON.stringify({ error: `Failed to fetch: ${res.status}`, body: errText }), {
          status: res.status,
          headers: { "Content-Type": "application/json" }
        });
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: "Exception", message: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  