export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "2";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=pt-BR`,
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTHORIZATION_TOKEN,
        },
      },
    );

    if (!res.ok) {
      return Response.json(
        { error: `API error: ${res.status}` },
        { status: res.status },
      );
    }

    const data = await res.json();

    return Response.json(data || []);
  } catch (error) {
    console.error("Fetch error:", error);
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
