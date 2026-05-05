export async function GetTop10() {
  const data = await fetch(`/api/top10movies`);

  return data.json();
}
