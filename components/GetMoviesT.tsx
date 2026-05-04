export async function GetMoviesT({ page }: { page: number }) {
  const data = await fetch(`/api/movies?page=${page}`);
  return data.json();
}
