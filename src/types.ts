export type ScreenType = 
  | 'start' 
  | 'dice' 
  | 'draw' 
  | 'ready' 
  | 'mission_word' 
  | 'mission_picture' 
  | 'result';

export interface BodyPart {
  id: string;
  word: string;          // plural or common form: 'eyes', 'arms', 'teeth'
  singularWord: string;  // singular form: 'eye', 'arm', 'tooth'
  korean: string;        // '눈', '팔', '이빨'
  color: string;         // accent color for UI
  iconKey: string;
  hint: string;          // drawing tip e.g. "큰 눈, 작은 눈, 깜빡이는 눈!"
}

export interface DiceResult {
  bodyPart: BodyPart;
  count: number;
  resultLabel: string;   // e.g. "eyes + 3"
  instruction: string;   // e.g. "Draw 3 eyes!"
}

export interface RoundInfo {
  roundNumber: number;   // 1 to 5
  diceResult: DiceResult | null;
  rerollsUsed?: number;  // 0 to 1
}

export interface MissionState {
  targetPart: BodyPart;
  options: BodyPart[];
  userAnswerId: string | null;
  isCorrect: boolean | null;
}
