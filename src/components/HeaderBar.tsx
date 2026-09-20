import React from 'react';
import { Star, Volume2, VolumeX, Sparkles, HelpCircle, ChevronLeft } from 'lucide-react';
import { toggleMute, getIsMuted, playClick } from '../utils/audio';

interface HeaderBarProps {
  currentRound?: number; // 1 to 5
  totalRounds?: number;  // 5
  missionNumber?: number; // 1 or 2
  totalMissions?: number; // 2
  stars?: number;        // 0, 1, 2
  title?: string;
  onOpenGuide?: () => void;
  onRestart?: () => void;
  onBack?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentRound,
  totalRounds = 5,
  missionNumber,
  totalMissions = 2,
  stars,
  title,
  onOpenGuide,
  onBack
}) => {
  const [muted, setMuted] = React.useState(getIsMuted());

  const handleMuteToggle = () => {
    const isNowMuted = toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) playClick();
  };

  return (
    <header className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-white/90 backdrop-blur-md border-b border-pink-200/80 shadow-xs z-20 shrink-0">
      {/* Left side: Back Button & Progress Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onBack && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onBack();
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-white hover:bg-pink-50 active:scale-95 text-slate-700 font-black text-xs sm:text-sm transition-all shadow-xs border border-pink-200"
            title="이전으로 가기"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3] text-pink-500" />
            <span>이전으로</span>
          </button>
        )}

        {currentRound !== undefined && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black text-xs sm:text-base shadow-sm tracking-wide border border-white/40">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-200" />
            <span>Round {currentRound}/{totalRounds}</span>
          </div>
        )}

        {missionNumber !== undefined && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black text-xs sm:text-base shadow-sm tracking-wide border border-white/40">
            <span>미션 {missionNumber}/{totalMissions}</span>
          </div>
        )}

        {title && (
          <h1 className="text-base md:text-xl font-black text-slate-700 tracking-tight hidden md:block">
            {title}
          </h1>
        )}
      </div>

      {/* Right side: Stars, Help Guide & Mute Control */}
      <div className="flex items-center gap-2 sm:gap-3">
        {stars !== undefined && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-pink-50 border-2 border-pink-200 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full shadow-xs">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-300 text-amber-400 animate-pulse-gentle" />
            <span className="font-black text-pink-900 text-sm sm:text-base">
              {stars}
            </span>
          </div>
        )}

        {onOpenGuide && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onOpenGuide();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs sm:text-sm transition-all shadow-xs border border-pink-200"
            title="게임 방법"
          >
            <HelpCircle className="w-4 h-4 text-pink-500" />
            <span className="hidden sm:inline">방법</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleMuteToggle}
          className={`p-2 rounded-full transition-all shadow-xs border ${
            muted
              ? 'bg-rose-100 border-rose-300 text-rose-600'
              : 'bg-pink-50 border-pink-200 text-slate-700 hover:bg-pink-100'
          }`}
          title={muted ? '소리 켜기' : '소리 끄기'}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-pink-500" />}
        </button>
      </div>
    </header>
  );
};
