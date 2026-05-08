export async function GetSeries({ page }: { page: number }) {
  const data = await fetch(`/api/series/trendingSeries?page=${page}`);
  return data.json();
}

export async function GetRecentSeries() {
  const data = await fetch(`/api/series/recentSeries`);
  return data.json();
}

export async function GetDetails({ id }: { id: number }) {
  if (!id) return;
  const data = await fetch(`/api/series/serieDetails?id=${id}`);
  return data.json();
}
