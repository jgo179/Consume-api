export async function GetDetails({ id }: { id: number }) {
  const data = await fetch(`/api/moviesDetails?id=${id}`);

  return data.json();
}
