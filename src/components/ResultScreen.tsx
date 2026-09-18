import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, Home, Download, Volume2, Sparkles, Award, ChevronLeft } from 'lucide-react';
import { BodyPart } from '../types';
import { BodyPartIcon } from './BodyPartIcon';
import { speakEnglish, playClick, playStarEarned } from '../utils/audio';

interface ResultScreenProps {
  monsterImageUrl: string | null;
  stars: number;
  totalStars: number;
  learnedParts: BodyPart[];
  onPlayAgain: () => void;
  onGoHome: () => void;
  onPrev?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  monsterImageUrl,
  stars,
  totalStars = 2,
  learnedParts,
  onPlayAgain,
  onGoHome,
  onPrev
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }

    playStarEarned();
    speakEnglish("Mission Complete! Super job!");
  }, []);

  const handleSpeakWord = (word: string, korean: string) => {
    playClick();
    speakEnglish(`${word}`);
  };

  const handleDownloadMonster = () => {
    if (!monsterImageUrl) return;
    playClick();
    const link = document.createElement('a');
    link.download = `my-roll-and-draw-monster.png`;
    link.href = monsterImageUrl;
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-4 md:p-6 max-w-5xl mx-auto w-full h-full select-none overflow-y-auto">
      {/* Top Header: Mission Complete! */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">
            Mission Complete!
          </h2>
          <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
        </div>
        <p className="text-sm md:text-base font-bold text-slate-600 mt-1">
          모든 미션을 완수하고 나만의 멋진 몬스터를 완성했어요! 🏆
        </p>
      </div>

      {/* Center Section: Monster Artwork + Stars */}
      <div className="flex flex-col items-center my-3 w-full">
        {/* Child's monster in framed exhibition card */}
        <div className="relative p-3 md:p-4 bg-white rounded-3xl border-4 border-amber-300 shadow-xl max-w-sm w-full aspect-[4/3] flex items-center justify-center overflow-hidden group">
          {/* Top cute badge */}
          <div className="absolute top-2 left-3 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-xs px-3 py-1 rounded-full font-black shadow-sm flex items-center gap-1 z-10">
            <span>✨</span>
            <span>귀여운 몬스터 탄생!</span>
          </div>

          {monsterImageUrl ? (
            <img
              src={monsterImageUrl}
              alt="My Finished Monster"
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              {/* Cute Chibi Monster Fallback */}
              <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" fill="#6EE7B7" stroke="#0F172A" strokeWidth="3" />
                <circle cx="24" cy="28" r="4.5" fill="#0F172A" />
                <circle cx="26" cy="26" r="1.5" fill="#FFFFFF" />
                <circle cx="40" cy="28" r="4.5" fill="#0F172A" />
                <circle cx="42" cy="26" r="1.5" fill="#FFFFFF" />
                <ellipse cx="18" cy="36" rx="4" ry="2.5" fill="#FB7185" opacity="0.8" />
                <ellipse cx="46" cy="36" rx="4" ry="2.5" fill="#FB7185" opacity="0.8" />
                <path d="M28 36 Q32 42 36 36" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="font-bold text-sm text-slate-500 mt-1">세상에 단 하나뿐인 내 몬스터</span>
            </div>
          )}
        </div>

        {/* 획득한 별 2/2 형식 (화면 중앙 아래) */}
        <div className="mt-3 flex items-center gap-3 bg-amber-50 border-2 border-amber-300 px-6 py-2 rounded-full shadow-sm">
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }).map((_, i) => (
              <Star
                key={i}
                className={`w-7 h-7 ${
                  i < stars
                    ? 'fill-amber-400 text-amber-500 animate-pulse-gentle'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-2xl font-black text-amber-950">
            획득한 별 {stars}/{totalStars}
          </span>
        </div>
      </div>

      {/* 이번 판에서 학습한 5개의 신체 부위 단어 목록 (화면 하단) */}
      <div className="w-full bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm mb-3">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-base font-black text-slate-800 flex items-center gap-2">
            <span>오늘 학습한 5개 신체 부위 단어</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
              5 Words
            </span>
          </span>
          <span className="text-xs text-slate-400 font-bold hidden sm:inline">
            스피커를 누르면 다시 발음을 들을 수 있어요!
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {learnedParts.map((part) => (
            <div
              key={part.id}
              onClick={() => handleSpeakWord(part.word, part.korean)}
              className="flex flex-col items-center p-2 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <BodyPartIcon id={part.id} size={40} />
              </div>
              <span className="font-black text-slate-800 text-base mt-1 group-hover:text-amber-700 transition-colors">
                {part.word}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                {part.korean}
              </span>
              <button
                type="button"
                className="mt-1 p-1 text-amber-600 group-hover:text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
                title="발음 듣기"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons: [이전으로] / [다시 하기] / [처음으로] / [저장하기] */}
      <div className="flex items-center justify-center gap-3 flex-wrap pb-2 w-full">
        {/* [이전으로] 버튼 */}
        {onPrev && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onPrev();
            }}
            className="py-3 px-5 bg-white hover:bg-slate-100 text-slate-700 font-black text-base md:text-lg rounded-2xl border-2 border-slate-300 shadow-xs hover:scale-103 active:scale-95 transition-all flex items-center gap-1.5"
            title="이전으로 이동"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" />
            <span>이전으로</span>
          </button>
        )}

        {/* [다시 하기] 버튼 */}
        <button
          type="button"
          onClick={() => {
            playClick();
            onPlayAgain();
          }}
          className="py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg rounded-2xl shadow-md hover:scale-103 active:scale-95 transition-all flex items-center gap-2 border-2 border-white"
        >
          <RotateCcw className="w-5 h-5" />
          <span>다시 하기</span>
        </button>

        {/* [처음으로] 버튼 */}
        <button
          type="button"
          onClick={() => {
            playClick();
            onGoHome();
          }}
          className="py-3 px-6 bg-white hover:bg-slate-100 text-slate-700 font-black text-lg rounded-2xl border-2 border-slate-300 shadow-sm hover:scale-103 active:scale-95 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5 text-slate-500" />
          <span>처음으로</span>
        </button>

        {/* [그림 다운로드] */}
        {monsterImageUrl && (
          <button
            type="button"
            onClick={handleDownloadMonster}
            className="py-3 px-6 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-base rounded-2xl border-2 border-indigo-200 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>몬스터 저장하기</span>
          </button>
        )}
      </div>
    </div>
  );
};
