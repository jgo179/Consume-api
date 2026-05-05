export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?page=${page}&language=pt-BR`,
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
