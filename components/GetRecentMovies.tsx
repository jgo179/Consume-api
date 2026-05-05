export async function GetRecentMovies() {
  const data = await fetch(`/api/recentMovies`);

  return data.json();
}
