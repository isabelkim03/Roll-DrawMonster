import React from 'react';
import { Volume2, Sparkles, Play, BookOpen } from 'lucide-react';
import { speakEnglish, playClick } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
  onOpenGuide: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenGuide }) => {
  const handleTitleSpeak = () => {
    playClick();
    speakEnglish('Roll and Draw Monster!');
  };

  const handleStartGame = () => {
    playClick();
    speakEnglish("Let's roll the dice and draw your monster!", () => {
      onStart();
    });
    // Ensure onStart is called even if speech ends late
    setTimeout(() => {
      onStart();
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 max-w-5xl mx-auto w-full h-full select-none">
      {/* Top Title Section */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-3 group cursor-pointer" onClick={handleTitleSpeak}>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 drop-shadow-sm">
            Roll &amp; Draw Monster
          </h1>
          <button
            type="button"
            className="p-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 transition-transform active:scale-95 shadow-sm"
            title="Listen Title"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </div>
        <p className="mt-2 text-base md:text-lg font-bold text-slate-600">
          주사위를 굴리고, 재미있는 나만의 몬스터를 그려봐요! 🎲🎨
        </p>
      </div>

      {/* Center: Playful Monster Character Illustration */}
      <div className="relative my-auto flex items-center justify-center py-4">
        {/* Decorative background aura */}
        <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-amber-200/60 via-pink-200/50 to-indigo-200/60 blur-2xl -z-10 animate-pulse-gentle" />

        {/* Super Toddler-Friendly Baby Monster Vector Illustration */}
        <div className="animate-float relative">
          <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="babyBody" x1="60" y1="40" x2="260" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#FCD34D" />
              </linearGradient>
              <linearGradient id="tummyGrad" x1="160" y1="130" x2="160" y2="230" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FEF3C7" />
              </linearGradient>
              <linearGradient id="crayonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#BE123C" />
              </linearGradient>
            </defs>

            {/* Toddler Atmosphere: Colorful Floating Soap Bubbles & Baby Stars */}
            <g className="animate-pulse">
              {/* Pastel Bubbles */}
              <circle cx="45" cy="80" r="16" fill="#BAE6FD" opacity="0.6" stroke="#38BDF8" strokeWidth="2.5" />
              <circle cx="40" cy="74" r="5" fill="#FFFFFF" opacity="0.8" />

              <circle cx="280" cy="75" r="18" fill="#FBCFE8" opacity="0.6" stroke="#F472B6" strokeWidth="2.5" />
              <circle cx="275" cy="69" r="6" fill="#FFFFFF" opacity="0.8" />

              <circle cx="35" cy="180" r="12" fill="#DDD6FE" opacity="0.6" stroke="#A78BFA" strokeWidth="2" />
              <circle cx="31" cy="176" r="3.5" fill="#FFFFFF" opacity="0.8" />

              <circle cx="285" cy="190" r="14" fill="#BBF7D0" opacity="0.6" stroke="#4ADE80" strokeWidth="2" />
              <circle cx="281" cy="185" r="4" fill="#FFFFFF" opacity="0.8" />

              {/* Twinkling Baby Stars */}
              <path d="M75 35 L78 26 L81 35 L90 38 L81 41 L78 50 L75 41 L66 38 Z" fill="#FBBF24" />
              <path d="M245 30 L247 22 L249 30 L257 32 L249 34 L247 42 L245 34 L237 32 Z" fill="#FB7185" />
              <path d="M160 12 L162 6 L164 12 L170 14 L164 16 L162 22 L160 16 L154 14 Z" fill="#F59E0B" />
            </g>

            {/* Back Baby Dino Soft Ridges / Spines */}
            <circle cx="120" cy="46" r="12" fill="#F472B6" stroke="#0F172A" strokeWidth="4" />
            <circle cx="160" cy="38" r="14" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
            <circle cx="200" cy="46" r="12" fill="#4ADE80" stroke="#0F172A" strokeWidth="4" />

            {/* Cute Baby Sprout on Top of Head */}
            <path d="M156 50 C154 28 140 22 136 28 C132 34 148 40 156 46" fill="#22C55E" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round" />
            <path d="M164 50 C166 28 180 22 184 28 C188 34 172 40 164 46" fill="#86EFAC" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="160" cy="48" r="4" fill="#F59E0B" />

            {/* Super Soft, Squishy, Chubby Marshmallow Monster Body */}
            {/* Base shape: big rounded pear/dumpling body */}
            <path
              d="M160 52 C225 52 248 100 248 165 C248 220 220 236 160 236 C100 236 72 220 72 165 C72 100 95 52 160 52 Z"
              fill="url(#babyBody)"
              stroke="#0F172A"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Cute Colorful Baby Spots on Body */}
            <circle cx="95" cy="88" r="7" fill="#F472B6" opacity="0.8" />
            <circle cx="85" cy="110" r="5" fill="#38BDF8" opacity="0.8" />
            <circle cx="225" cy="90" r="6" fill="#4ADE80" opacity="0.8" />
            <circle cx="235" cy="112" r="8" fill="#F472B6" opacity="0.8" />

            {/* Big Chubby Soft Belly Patch */}
            <ellipse cx="160" cy="172" rx="60" ry="46" fill="url(#tummyGrad)" stroke="#0F172A" strokeWidth="4" />
            
            {/* Cute Little Belly Button with Heart */}
            <circle cx="160" cy="190" r="3.5" fill="#F59E0B" />
            <path d="M156 162 C156 158 160 157 160 160 C160 157 164 158 164 162 C164 166 160 169 160 169 C160 169 156 166 156 162 Z" fill="#F472B6" />

            {/* Short Chubby Toddler Feet with Pink Paw Pads */}
            <g>
              {/* Left Foot */}
              <ellipse cx="118" cy="236" rx="28" ry="18" fill="#FDE047" stroke="#0F172A" strokeWidth="4.5" />
              <ellipse cx="118" cy="237" rx="14" ry="9" fill="#FB7185" />
              <circle cx="104" cy="229" r="4" fill="#FB7185" />
              <circle cx="118" cy="225" r="4.5" fill="#FB7185" />
              <circle cx="132" cy="229" r="4" fill="#FB7185" />

              {/* Right Foot */}
              <ellipse cx="202" cy="236" rx="28" ry="18" fill="#FDE047" stroke="#0F172A" strokeWidth="4.5" />
              <ellipse cx="202" cy="237" rx="14" ry="9" fill="#FB7185" />
              <circle cx="188" cy="229" r="4" fill="#FB7185" />
              <circle cx="202" cy="225" r="4.5" fill="#FB7185" />
              <circle cx="216" cy="229" r="4" fill="#FB7185" />
            </g>

            {/* Enormous, Ultra-Sparkly Cartoon Baby Eyes */}
            {/* Left Eye */}
            <g>
              <ellipse cx="124" cy="116" rx="23" ry="27" fill="#0F172A" />
              {/* Eye sparkle reflections */}
              <ellipse cx="131" cy="107" rx="10" ry="13" fill="#FFFFFF" />
              <circle cx="115" cy="128" r="6" fill="#FFFFFF" />
              <circle cx="134" cy="128" r="3.5" fill="#FFFFFF" />
              {/* Sweet baby eyelash / brow */}
              <path d="M106 88 Q124 80 142 88" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Right Eye */}
            <g>
              <ellipse cx="196" cy="116" rx="23" ry="27" fill="#0F172A" />
              {/* Eye sparkle reflections */}
              <ellipse cx="203" cy="107" rx="10" ry="13" fill="#FFFFFF" />
              <circle cx="187" cy="128" r="6" fill="#FFFFFF" />
              <circle cx="206" cy="128" r="3.5" fill="#FFFFFF" />
              {/* Sweet baby eyelash / brow */}
              <path d="M178 88 Q196 80 214 88" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Big Rosy Cheeks with Sweet Blushing Stripes */}
            <ellipse cx="88" cy="140" rx="17" ry="12" fill="#FB7185" opacity="0.85" />
            <path d="M82 138 L86 144 M88 137 L92 143 M94 138 L98 144" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

            <ellipse cx="232" cy="140" rx="17" ry="12" fill="#FB7185" opacity="0.85" />
            <path d="M226 138 L230 144 M232 137 L236 143 M238 138 L242 144" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

            {/* Cute Button Nose */}
            <ellipse cx="160" cy="128" rx="6" ry="4" fill="#F59E0B" />

            {/* Adorable Baby Wide-Open Laughing Smile */}
            <g>
              {/* Open Mouth */}
              <path
                d="M138 138 C138 138 144 168 160 168 C176 168 182 138 182 138 Z"
                fill="#881337"
                stroke="#0F172A"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              {/* Chubby Pink Baby Tongue */}
              <path
                d="M146 156 C152 152 168 152 174 156 C172 165 160 168 160 168 C160 168 148 165 146 156 Z"
                fill="#FB7185"
              />
              {/* Cute Little Chiclet Baby Tooth */}
              <rect x="154" y="138" width="12" height="8" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            </g>

            {/* Chubby Baby Arms: Left arm waving enthusiastically, Right arm holding a colorful toddler crayon */}
            {/* Left Arm (Waving!) */}
            <g>
              <path
                d="M80 155 C52 140 45 110 58 98 C70 88 88 118 88 135"
                fill="#FDE047"
                stroke="#0F172A"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Pink baby palm pad */}
              <circle cx="60" cy="106" r="6" fill="#FB7185" />
            </g>

            {/* Right Arm (Holding a Chunky Red Toddler Crayon!) */}
            <g>
              {/* Crayon */}
              <g transform="rotate(-25 240 160)">
                <rect x="235" y="125" width="22" height="42" rx="4" fill="url(#crayonGrad)" stroke="#0F172A" strokeWidth="3.5" />
                {/* Crayon Tip */}
                <polygon points="235,125 246,108 257,125" fill="#E11D48" stroke="#0F172A" strokeWidth="3.5" strokeLinejoin="round" />
                {/* Crayon Wrapper Label */}
                <rect x="235" y="138" width="22" height="18" fill="#FDE047" stroke="#0F172A" strokeWidth="2.5" />
                <circle cx="246" cy="147" r="3.5" fill="#E11D48" />
              </g>

              {/* Hand wrapping around crayon */}
              <path
                d="M235 158 C250 160 262 152 260 140 C258 128 240 135 232 142"
                fill="#FDE047"
                stroke="#0F172A"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom: Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-4 w-full max-w-md">
        <button
          type="button"
          onClick={handleStartGame}
          className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-2xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-4 border-white"
        >
          <Play className="w-8 h-8 fill-white" />
          <span>게임 시작</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            onOpenGuide();
          }}
          className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base rounded-xl border-2 border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <BookOpen className="w-5 h-5 text-amber-500" />
          <span>단어 사전</span>
        </button>
      </div>
    </div>
  );
};
