import { BodyPart } from '../types';

export const ALL_BODY_PARTS: BodyPart[] = [
  {
    id: 'head',
    word: 'head',
    singularWord: 'head',
    korean: '머리',
    color: '#F59E0B',
    iconKey: 'head',
    hint: '동그란 머리나 네모난 개성 있는 머리!'
  },
  {
    id: 'hair',
    word: 'hair',
    singularWord: 'hair',
    korean: '머리카락',
    color: '#F43F5E',
    iconKey: 'hair',
    hint: '삐죽삐죽 머리나 뽀글뽀글 파마머리!'
  },
  {
    id: 'eyes',
    word: 'eyes',
    singularWord: 'eye',
    korean: '눈',
    color: '#3B82F6',
    iconKey: 'eyes',
    hint: '동글동글 큰 눈이나 깜빡이는 눈!'
  },
  {
    id: 'ears',
    word: 'ears',
    singularWord: 'ear',
    korean: '귀',
    color: '#EC4899',
    iconKey: 'ears',
    hint: '동그란 귀나 쫑긋한 귀!'
  },
  {
    id: 'nose',
    word: 'nose',
    singularWord: 'nose',
    korean: '코',
    color: '#F97316',
    iconKey: 'nose',
    hint: '귀여운 단추 코나 하트 코!'
  },
  {
    id: 'mouth',
    word: 'mouth',
    singularWord: 'mouth',
    korean: '입',
    color: '#EF4444',
    iconKey: 'mouth',
    hint: '활짝 웃는 큰 입!'
  },
  {
    id: 'teeth',
    word: 'teeth',
    singularWord: 'tooth',
    korean: '이빨',
    color: '#06B6D4',
    iconKey: 'teeth',
    hint: '하얗고 반짝이는 이빨!'
  },
  {
    id: 'neck',
    word: 'neck',
    singularWord: 'neck',
    korean: '목',
    color: '#8B5CF6',
    iconKey: 'neck',
    hint: '머리와 몸을 이어주는 목!'
  },
  {
    id: 'shoulders',
    word: 'shoulders',
    singularWord: 'shoulder',
    korean: '어깨',
    color: '#6366F1',
    iconKey: 'shoulders',
    hint: '넓고 튼튼한 어깨!'
  },
  {
    id: 'arms',
    word: 'arms',
    singularWord: 'arm',
    korean: '팔',
    color: '#10B981',
    iconKey: 'arms',
    hint: '길쭉길쭉 튼튼한 팔!'
  },
  {
    id: 'hands',
    word: 'hands',
    singularWord: 'hand',
    korean: '손',
    color: '#F59E0B',
    iconKey: 'hands',
    hint: '안녕 흔드는 손!'
  },
  {
    id: 'fingers',
    word: 'fingers',
    singularWord: 'finger',
    korean: '손가락',
    color: '#14B8A6',
    iconKey: 'fingers',
    hint: '하나둘셋넷 손가락!'
  },
  {
    id: 'belly',
    word: 'belly',
    singularWord: 'belly',
    korean: '배',
    color: '#84CC16',
    iconKey: 'belly',
    hint: '동글동글 귀여운 배!'
  },
  {
    id: 'legs',
    word: 'legs',
    singularWord: 'leg',
    korean: '다리',
    color: '#4F46E5',
    iconKey: 'legs',
    hint: '성큼성큼 걷는 다리!'
  },
  {
    id: 'feet',
    word: 'feet',
    singularWord: 'foot',
    korean: '발',
    color: '#0EA5E9',
    iconKey: 'feet',
    hint: '쿵쿵 발자국을 찍는 발!'
  }
];

export function getInstructionText(part: BodyPart, count: number): string {
  if (count === 1) {
    return `Draw 1 ${part.singularWord}!`;
  }
  return `Draw ${count} ${part.word}!`;
}

export function getResultLabel(part: BodyPart, count: number): string {
  // 숫자 주사위(왼쪽) + 신체부위 주사위(오른쪽)에 맞추어 "3 + eyes"
  return `${count} + ${part.word}`;
}
