export const formatDate = (uglyDate: string | undefined) => {
  if (!uglyDate) {
    return ""; // Return an empty string or handle the case when the date is undefined
  }
  const date = new Date(uglyDate);
  const readableDate = date.getUTCFullYear();
  return readableDate;
};
export const formatDuration = (movieDuration: number) => {
  const hours = Math.floor(movieDuration / 60);
  const minutes = movieDuration % 60;
  return `${hours}h ${minutes}m`;
};

export const formatPrice = (uglyPrice: number) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return USDollar.format(uglyPrice);
};

export const formatRatings = (uglyRating: number) => {
  // Only 1 number after comma
  const roundedRating = uglyRating.toFixed(1);
  const rounded = Number(roundedRating);
  return rounded;
};
