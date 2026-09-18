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
    <header className="w-full flex items-center justify-between px-4 sm:px-6 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs z-20">
      {/* Left side: Back Button & Progress Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onBack && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onBack();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-black text-sm transition-all shadow-xs border border-slate-300"
            title="이전으로 가기"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
            <span>이전으로</span>
          </button>
        )}

        {currentRound !== undefined && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3.5 py-1.5 rounded-full font-black text-base shadow-sm tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>{currentRound}/{totalRounds}</span>
          </div>
        )}

        {missionNumber !== undefined && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3.5 py-1.5 rounded-full font-black text-base shadow-sm tracking-wide">
            <span>미션 {missionNumber}/{totalMissions}</span>
          </div>
        )}

        {title && (
          <h1 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight hidden md:block">
            {title}
          </h1>
        )}
      </div>

      {/* Right side: Stars, Help Guide & Mute Control */}
      <div className="flex items-center gap-3">
        {/* Stars counter (if active in missions or result) */}
        {stars !== undefined && (
          <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 px-3.5 py-1 rounded-full shadow-xs">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500 animate-pulse-gentle" />
            <span className="font-extrabold text-amber-900 text-base">
              {stars}/2
            </span>
          </div>
        )}

        {/* Drawing ideas guide */}
        {onOpenGuide && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onOpenGuide();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
            title="신체 부위 단어 사전"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">단어 힌트</span>
          </button>
        )}

        {/* Sound toggle */}
        <button
          type="button"
          onClick={handleMuteToggle}
          className={`p-2 rounded-full transition-colors ${
            muted ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title={muted ? '소리 켜기' : '소리 끄기'}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
