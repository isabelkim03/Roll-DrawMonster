export interface BodyPart {
  id: string;
  word: string;
  displayWord: string; // e.g. "eye(s)"
  korean: string;
  category: 'head' | 'upper' | 'lower' | 'extra';
  hint: string;
}

export interface DiceResult {
  count: number;
  bodyPart: BodyPart;
  instruction: string; // e.g. "Draw 4 eye(s)!"
  spokenInstruction?: string; // e.g. "Draw 4 eyes!" or "Draw 1 nose!"
}

export interface RoundInfo {
  roundNumber: number; // 1 to 5
  diceResult: DiceResult | null;
  rerollsUsed: number; // 0 or 1
}

export type GameScreen =
  | 'start'
  | 'dice'
  | 'draw'
  | 'ready'
  | 'mission_word'
  | 'mission_picture'
  | 'result';
