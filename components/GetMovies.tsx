export async function GetMovies({ page }: { page: number }) {
  const data = await fetch(`/api/movies?page=${page}`);
  return data.json();
}
