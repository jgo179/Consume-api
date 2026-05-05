export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=pt-BR&page=1&sort_by=vote_average.desc&vote_count.gte=200&sort_by=release_date.desc`,
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
