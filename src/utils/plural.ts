/**
 * Returns the correct plural form of a body part word.
 * e.g.,
 * 1 eye -> "eye"
 * 4 eyes -> "eyes"
 * 2 feet -> "feet" (foot -> feet)
 */
export function getPluralWord(word: string, count: number): string {
  // Normalize by removing any existing (s) or (feet)
  const base = word.replace(/\(s\)/gi, '').replace(/\(feet\)/gi, '').trim().toLowerCase();

  if (count === 1) {
    return base;
  }

  // Irregular plurals
  if (base === 'foot') return 'feet';

  // Standard regular English plurals
  if (base.endsWith('ch') || base.endsWith('sh') || base.endsWith('s') || base.endsWith('x') || base.endsWith('z')) {
    return `${base}es`;
  }

  return `${base}s`;
}

/**
 * Returns the spoken instruction for drawing with natural English plural agreement.
 * e.g.,
 * count: 4, word: "eye" -> "Draw 4 eyes!"
 * count: 1, word: "nose" -> "Draw 1 nose!"
 * count: 2, word: "foot" -> "Draw 2 feet!"
 */
export function getSpokenInstruction(count: number, word: string): string {
  const pluralWord = getPluralWord(word, count);
  return `Draw ${count} ${pluralWord}!`;
}
