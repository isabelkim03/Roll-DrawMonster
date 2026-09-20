import React, { useRef } from 'react';
import { Play, Sparkles, Volume2, HelpCircle } from 'lucide-react';
import { speakEnglish, playClick } from '../utils/audio';
import cuteMonsterImg from '../assets/images/sanrio_kawaii_monster_1789906488520.jpg';

interface StartScreenProps {
  onStart: () => void;
  onOpenGuide: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenGuide }) => {
  const hasStartedRef = useRef<boolean>(false);

  const handleTitleSpeak = () => {
    playClick();
    speakEnglish('Roll and Draw Your Own Monster!');
  };

  const handleStartGame = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    playClick();
    speakEnglish("Let's roll the dice and draw your own monster!");
    onStart();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 max-w-5xl mx-auto w-full min-h-full overflow-y-auto select-none pb-10">
      {/* Top Title Section */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={handleTitleSpeak}>
          <span className="text-2xl sm:text-3xl animate-bounce">🎀</span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500">
            Roll and Draw Your Own Monster
          </h1>
          <button
            type="button"
            className="p-2 sm:p-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition-transform active:scale-95 shadow-xs border border-pink-200"
            title="Listen English Title"
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
          </button>
        </div>
        <p className="mt-2 text-sm sm:text-lg font-black text-pink-900/80">
          주사위를 굴려 신체 부위를 정하고 나만의 몬스터를 그려봐요! 💖🎨
        </p>
      </div>

      {/* Center Hero: Cute Monster Picture + 5-Round Sequence Cards */}
      <div className="my-auto py-1.5 sm:py-3 flex flex-col items-center gap-2.5 sm:gap-4 w-full max-w-3xl">
        {/* Cute Monster Illustration */}
        <div className="relative w-full max-w-xs sm:max-w-md rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 border-pink-300 shadow-xl shadow-pink-100/80 bg-white group">
          <img
            src={cuteMonsterImg}
            alt="Monster made of body parts"
            className="w-full h-32 sm:h-52 md:h-60 object-contain p-1.5 transition-transform duration-300 group-hover:scale-103"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 5-round steps preview */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-3 w-full">
          {[
            { step: '1', title: 'Round 1', desc: '주사위 굴리기', icon: '🎲', border: 'border-pink-200', text: 'text-pink-700' },
            { step: '2', title: 'Round 2', desc: '신체 부위 그리기', icon: '✏️', border: 'border-purple-200', text: 'text-purple-700' },
            { step: '3', title: 'Round 3', desc: '5라운드 완성', icon: '💖', border: 'border-rose-200', text: 'text-rose-700' },
            { step: '4', title: 'Round 4', desc: '단어 매칭 미션', icon: '⭐', border: 'border-amber-200', text: 'text-amber-700' },
            { step: '5', title: 'Round 5', desc: '그림 찾기 미션', icon: '🎀', border: 'border-sky-200', text: 'text-sky-700' },
          ].map((item) => (
            <div
              key={item.step}
              className={`bg-white/95 border-2 ${item.border} rounded-xl sm:rounded-2xl p-1.5 sm:p-3 text-center shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-center`}
            >
              <div className="text-xl sm:text-3xl mb-0.5 sm:mb-1">{item.icon}</div>
              <span className={`text-[11px] sm:text-xs font-black ${item.text}`}>{item.title}</span>
              <span className="text-[9px] sm:text-[11px] font-bold text-slate-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pb-2 w-full max-w-md shrink-0">
        <button
          type="button"
          onClick={handleStartGame}
          className="w-full sm:w-auto flex-1 py-4 px-8 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 active:scale-95 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-lg hover:shadow-xl shadow-pink-200 transition-all flex items-center justify-center gap-3 border-2 border-white"
        >
          <Play className="w-7 h-7 fill-current" />
          <span>게임 시작하기</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            onOpenGuide();
          }}
          className="py-3.5 px-5 bg-white hover:bg-pink-50 active:scale-95 text-pink-700 font-black text-base rounded-2xl shadow-sm border-2 border-pink-200 transition-all flex items-center justify-center gap-2"
        >
          <HelpCircle className="w-5 h-5 text-pink-500" />
          <span>게임 방법</span>
        </button>
      </div>
    </div>
  );
};
