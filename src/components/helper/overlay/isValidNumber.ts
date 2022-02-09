export default function isValidNumber(value: number) {
  return typeof value === "number" && !isNaN(value);
}
