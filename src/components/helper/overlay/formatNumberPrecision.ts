export default function formatNumberPrecision(
  number: number,
  precision: number
): number {
  if (number !== null) {
    return parseFloat(number.toFixed(precision))
  } else {
    return 0
  }
}
