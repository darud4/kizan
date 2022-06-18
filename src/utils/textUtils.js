export function processFio(text) {
  return text && text
    .split(" ")
    .map((word) => capFirstLetter(word))
    .join(" ");
}

export function capFirstLetter(word) {
  return (word &&
    word[0].toUpperCase() +
    word.slice(1)?.toLowerCase() +
    (word.length === 1 ? "." : "")
  );
}

export function normalizeFio(fam, imj, otch) {
  if (!fam || !imj || !otch) return '';
  return (
    capFirstLetter(fam) +
    " " +
    imj[0]?.toUpperCase() +
    "." +
    otch[0]?.toUpperCase() +
    "."
  );
}
