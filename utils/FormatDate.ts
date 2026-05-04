export function FormatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const [year, month, day] = dateString.split("-");
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  ).toLocaleDateString("pt-BR", options);
}
