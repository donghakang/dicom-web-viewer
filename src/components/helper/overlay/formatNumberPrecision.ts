export default function formatNumberPrecision(
  number: number,
  precision: number
): number {
  console.log(number, precision);
  if (!isNaN(number)) {
    return parseFloat(number.toFixed(precision));
  } else {
    return 0;
  }
}
