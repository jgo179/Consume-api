export async function GetMovies({ page }: { page: number }) {
  const data = await fetch(`/api/movies/trendingMovies?page=${page}`);
  return data.json();
}

export async function GetRecentMovies() {
  const data = await fetch(`/api/movies/recentMovies`);
  return data.json();
}

export async function GetDetails({ id }: { id: number }) {
  if (!id) return;
  const data = await fetch(`/api/movies/moviesDetails?id=${id}`);
  return data.json();
}
