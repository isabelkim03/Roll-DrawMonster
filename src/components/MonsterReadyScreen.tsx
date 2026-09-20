import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, Play, Award, ChevronLeft } from 'lucide-react';
import { speakEnglish, playClick, playStarEarned } from '../utils/audio';

interface MonsterReadyScreenProps {
  monsterImageUrl: string | null;
  onStartMission: () => void;
  onPrev?: () => void;
}

export const MonsterReadyScreen: React.FC<MonsterReadyScreenProps> = ({
  monsterImageUrl,
  onStartMission,
  onPrev
}) => {
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (!hasSpokenRef.current) {
      hasSpokenRef.current = true;
      playStarEarned();
      speakEnglish("Your monster is ready! Amazing job!");
    }
  }, []);

  const handleSpeak = () => {
    playClick();
    speakEnglish("Your monster is ready!");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 max-w-4xl mx-auto w-full min-h-full overflow-y-auto select-none pb-12">
      {/* Top Heading */}
      <div className="text-center pt-1 shrink-0">
        <div className="inline-flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={handleSpeak}>
          <span className="text-2xl sm:text-3xl animate-bounce">🎀</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500">
            Your monster is ready!
          </h2>
          <button
            type="button"
            className="p-2 sm:p-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition-transform active:scale-95 shadow-xs border border-pink-200"
            title="Listen English"
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
          </button>
        </div>
        <p className="mt-1.5 text-sm sm:text-lg font-black text-pink-900/80">
          와! 세상에 하나뿐인 나만의 멋진 몬스터가 완성되었어요! 💖✨
        </p>
      </div>

      {/* Center: Frame with Child's Monster Drawing */}
      <div className="my-auto py-2 sm:py-3 flex flex-col items-center w-full max-w-md shrink-0">
        <div className="relative w-44 h-44 sm:w-72 sm:h-72 md:w-84 md:h-84 rounded-3xl bg-white border-3 sm:border-4 border-pink-300 shadow-xl shadow-pink-100/80 overflow-hidden flex items-center justify-center p-2.5 sm:p-3">
          {monsterImageUrl ? (
            <img
              src={monsterImageUrl}
              alt="My Drawn Monster"
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <div className="text-center text-pink-300 font-bold p-4 text-xs sm:text-base">
              몬스터 그림이 저장되었습니다!
            </div>
          )}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-black text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-xs flex items-center gap-1 border border-white/40">
            <span>🎀 최고의 몬스터</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-black text-purple-700 mt-2 sm:mt-3 bg-white/90 px-4 sm:px-5 py-1 sm:py-1.5 rounded-full border border-pink-200 text-center shadow-2xs">
          이제 내가 그린 몬스터와 함께 재미있는 영어 퀴즈 미션을 풀어볼까요? 🌟
        </p>
      </div>

      {/* Bottom Action: Go to Mission 1 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-6 w-full max-w-md shrink-0">
        {onPrev && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onPrev();
            }}
            className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-pink-50 active:scale-95 text-pink-700 font-black text-sm sm:text-base rounded-full shadow-xs border-2 border-pink-200 transition-all flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-5 h-5 text-pink-500" />
            <span>그림 수정하기</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            playClick();
            onStartMission();
          }}
          className="w-full sm:w-auto flex-1 py-3.5 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 active:scale-95 text-white font-black text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl shadow-pink-200/80 transition-all flex items-center justify-center gap-3 border-2 border-white"
        >
          <span>단어 미션 시작하기</span>
          <Play className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};
