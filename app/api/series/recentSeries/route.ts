export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=pt-BR&page=1&vote_count.gte=200&sort_by=first_air_date.desc`,
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
    return Response.json(data.results || []);
  } catch (error) {
    console.error("Fetch error:", error);
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
