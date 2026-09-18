import React, { useEffect } from 'react';
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
  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    playStarEarned();
    speakEnglish("Your monster is ready! Amazing job!");
  }, []);

  const handleSpeak = () => {
    playClick();
    speakEnglish("Your monster is ready!");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 max-w-4xl mx-auto w-full h-full select-none">
      {/* Top Heading */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-3 cursor-pointer group" onClick={handleSpeak}>
          <Sparkles className="w-8 h-8 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600">
            Your monster is ready!
          </h2>
          <button
            type="button"
            className="p-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 transition-transform active:scale-95 shadow-sm"
            title="Listen English"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </div>
        <p className="mt-2 text-base md:text-lg font-bold text-slate-600">
          와! 세상에 하나뿐인 멋진 몬스터가 완성되었어요! 🌟
        </p>
      </div>

      {/* Center: Frame with Child's Monster Drawing */}
      <div className="relative my-auto flex items-center justify-center p-4">
        {/* Glow Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/50 via-pink-200/40 to-purple-200/50 rounded-3xl blur-xl -z-10" />

        <div className="relative p-4 bg-white rounded-3xl border-6 border-amber-300 shadow-2xl max-w-lg w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
          {monsterImageUrl ? (
            <img
              src={monsterImageUrl}
              alt="My Drawn Monster"
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <div className="text-slate-400 font-bold flex flex-col items-center">
              <Award className="w-16 h-16 text-amber-400 mb-2" />
              <span>멋진 몬스터 그림</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: [이전으로] / [미션 시작] 버튼 */}
      <div className="pb-4 w-full max-w-lg flex flex-col items-center">
        <div className="flex items-center gap-3 w-full">
          {onPrev && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onPrev();
              }}
              className="py-4 px-6 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-black text-xl rounded-2xl border-3 border-slate-300 shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              title="이전으로 가기"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
              <span>이전으로</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              playClick();
              onStartMission();
            }}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xl md:text-2xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-4 border-white"
          >
            <Play className="w-7 h-7 fill-white" />
            <span>미션 시작</span>
          </button>
        </div>
        <span className="text-xs text-slate-400 font-bold mt-2">
          완성된 몬스터와 함께 2가지 퀴즈 미션에 도전해요!
        </span>
      </div>
    </div>
  );
};
