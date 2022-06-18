export const convertDate = (date) =>
  date ? date.slice(0, 10).split("/").join(".") : "";

export const convertDateToInput = (date) =>
  date ? date.slice(0, 10).split("/").reverse().join("-") : "";

export function sortDate(a, b) {
  const [d1, m1, y1] = a.split(".");
  const [d2, m2, y2] = b.split(".");
  const dateA = new Date(y1, m1 - 1, d1);
  const dateB = new Date(y2, m2 - 1, d2);
  return dateA - dateB;
}
