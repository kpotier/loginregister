export default function isJSON(headers: { [key: string]: string }): boolean {
  return headers["content-type"] == "application/json";
}
