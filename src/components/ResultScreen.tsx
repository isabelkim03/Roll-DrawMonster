import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, Home, Download, Volume2, Sparkles, Award } from 'lucide-react';
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
  onGoHome
}) => {
  const hasSpokenRef = useRef(false);

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

    if (!hasSpokenRef.current) {
      hasSpokenRef.current = true;
      playStarEarned();
      // Small 250ms comfortable breath pause before announcing Mission Complete
      const timer = setTimeout(() => {
        speakEnglish("Mission Complete! Super job!");
      }, 250);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSpeakWord = (word: string) => {
    playClick();
    speakEnglish(word);
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
    <div className="flex-1 flex flex-col items-center justify-between p-3 sm:p-6 max-w-5xl mx-auto w-full min-h-full select-none overflow-y-auto pb-12">
      {/* Top Header */}
      <div className="text-center pt-1 shrink-0">
        <div className="inline-flex items-center gap-2">
          <span className="text-2xl sm:text-3xl animate-bounce">🎀</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500">
            Mission Complete!
          </h2>
        </div>
        <p className="mt-1 text-sm sm:text-lg font-black text-pink-900/80">
          모든 라운드와 미션을 사랑스럽게 성공했어요! 축하합니다! 💖🎉
        </p>
      </div>

      {/* Center Layout: Left Monster Drawing + Right Learned Words */}
      <div className="my-auto py-2 sm:py-3 grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 w-full max-w-4xl shrink-0">
        {/* Left Column: Monster Portrait */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-pink-300 p-3 sm:p-5 shadow-lg shadow-pink-100/70 flex flex-col items-center justify-center text-center relative">
          <div className="w-36 h-36 sm:w-56 sm:h-56 rounded-2xl bg-pink-50/50 border-2 border-dashed border-pink-200 overflow-hidden flex items-center justify-center p-2 mt-2">
            {monsterImageUrl ? (
              <img
                src={monsterImageUrl}
                alt="Completed Monster"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-4xl">👾</span>
            )}
          </div>

          {/* Stars Earned */}
          <div className="mt-2 sm:mt-3 flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-3 sm:px-4 py-1 rounded-full">
            <span className="text-xs sm:text-sm font-black text-pink-900">획득한 별:</span>
            {Array.from({ length: totalStars }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  idx < stars
                    ? 'fill-amber-300 text-amber-400 animate-bounce'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>

          {monsterImageUrl && (
            <button
              type="button"
              onClick={handleDownloadMonster}
              className="mt-2 sm:mt-3 px-4 sm:px-5 py-1.5 sm:py-2 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xs sm:text-sm rounded-full shadow-xs transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>몬스터 그림 저장하기</span>
            </button>
          )}
        </div>

        {/* Right Column: Learned English Words Card */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl border-3 border-pink-200 p-3 sm:p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-lg font-black text-pink-900 mb-2 flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
              <span>오늘 배운 신체 영어 단어장 (탭하여 듣기)</span>
            </h3>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-h-48 sm:max-h-56 overflow-y-auto pr-1">
              {learnedParts.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => handleSpeakWord(part.word)}
                  className="p-1.5 sm:p-2.5 rounded-xl bg-white hover:bg-stone-50 border-2 border-stone-800 shadow-xs flex items-center justify-between text-left transition-transform active:scale-95 group relative"
                >
                  {/* Small hole punch */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full border border-stone-400 bg-stone-100" />
                  <div className="flex items-center gap-1.5 sm:gap-2 pl-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                      <BodyPartIcon id={part.id} size={30} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-blue-600 font-sans">
                        {part.displayWord || `${part.word}(s)`}
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold text-stone-400">
                        {part.korean}
                      </div>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-blue-500 opacity-60 group-hover:opacity-100 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-pink-100 via-purple-100 to-sky-100 text-pink-900 text-[11px] sm:text-xs font-black text-center border border-pink-200">
            영어 단어를 예쁘게 소리 내어 따라 말해보세요! 🗣️💖
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-6 w-full max-w-md shrink-0">
        <button
          type="button"
          onClick={() => {
            playClick();
            onPlayAgain();
          }}
          className="w-full sm:w-auto flex-1 py-3.5 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 active:scale-95 text-white font-black text-base sm:text-lg rounded-full shadow-lg shadow-pink-200/80 transition-all flex items-center justify-center gap-2.5 border-2 border-white"
        >
          <RotateCcw className="w-5 h-5" />
          <span>새로운 몬스터 그리기</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            onGoHome();
          }}
          className="w-full sm:w-auto py-3 sm:py-4 px-5 sm:px-6 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-black text-sm sm:text-base rounded-2xl shadow-xs border-2 border-slate-200 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>처음으로</span>
        </button>
      </div>
    </div>
  );
};
