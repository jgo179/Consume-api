export async function GetDetails({ id }: { id: number }) {
  if (!id) return;
  const data = await fetch(`/api/moviesDetails?id=${id}`);

  return data.json();
}
