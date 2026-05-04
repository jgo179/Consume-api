const FormatNumber = (number: number) => {
  const numberFormated = Math.floor(number * 10) / 10;
  return String(numberFormated);
};

export default FormatNumber;
