export const formatDate = (uglyDate: string) => {
  const date = new Date(uglyDate);
  const readableDate = date.getUTCFullYear();
  return readableDate;
};
export const formatDuration = (movieDuration: number) => {
  const hours = Math.floor(movieDuration / 60);
  const minutes = movieDuration % 60;
  return `${hours}h ${minutes}m`;
};

export const formatPrice = (uglyPrice) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return USDollar.format(uglyPrice);
};
