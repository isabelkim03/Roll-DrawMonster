import React from 'react';
import { X, Sparkles, Volume2 } from 'lucide-react';
import { ALL_BODY_PARTS } from '../data/bodyParts';
import { BodyPartIcon } from './BodyPartIcon';
import { PaperDoll } from './PaperDoll';
import { speakEnglish, playClick } from '../utils/audio';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSpeak = (word: string) => {
    playClick();
    speakEnglish(word);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-pink-300 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🎀</span>
            <h2 className="text-xl sm:text-2xl font-black">게임 방법 & 신체 단어 안내</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 transition-all text-white"
            title="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-sm sm:text-base">
          {/* Rules */}
          <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-200">
            <h3 className="font-black text-pink-900 text-base sm:text-lg mb-2 flex items-center gap-1.5">
              <span>🎲 주사위 굴려 몬스터 그리기 규칙</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 font-bold text-xs sm:text-sm text-pink-950/80">
              <li>
                <strong className="text-pink-900">5라운드 진행:</strong> 매 라운드마다 숫자 주사위(1~6)와 15면체 신체 주사위를 굴립니다.
              </li>
              <li>
                <strong className="text-pink-900">다시 굴리기 1회:</strong> 마음에 들지 않으면 라운드당 1번 다시 굴릴 수 있습니다.
              </li>
              <li>
                <strong className="text-pink-900">도화지에 그리기:</strong> 주사위가 나온 대로 (예: Draw 3 eye!) 몬스터의 신체 부위를 자유롭게 그립니다.
              </li>
              <li>
                <strong className="text-pink-900">2가지 영어 퀴즈 미션:</strong> 몬스터가 완성되면 단어 찾기 미션과 그림 퀴즈를 풀고 별을 모아요!
              </li>
            </ol>
          </div>

          {/* 15 Body Parts Vocabulary Flashcards Board (Classroom Worksheet Style) */}
          <div className="bg-[#85CEEB] p-4 sm:p-5 rounded-3xl border-4 border-[#5EABC9] shadow-lg relative overflow-hidden">
            {/* Header: My Body with paper dolls */}
            <div className="bg-white rounded-2xl border-2 border-stone-900 p-3 mb-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <PaperDoll gender="boy" size={36} />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                    <span>My Body</span>
                    <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 font-bold">
                      Flashcards
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-stone-500">
                    카드를 누르면 원어민 영어 발음을 들려줘요! 🎧
                  </p>
                </div>
              </div>
              <PaperDoll gender="girl" size={36} />
            </div>

            {/* Flashcards Grid (White card with black border and binder hole punch) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {ALL_BODY_PARTS.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => handleSpeak(part.word)}
                  className="bg-white rounded-xl p-2.5 border-2 border-stone-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-between text-left group relative"
                  title={`${part.word} (${part.korean})`}
                >
                  {/* Binder hole punch circle (like reference photo) */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full border border-stone-400 bg-stone-100" />

                  {/* Left: Clipart Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center pl-1">
                    <BodyPartIcon id={part.id} size={46} />
                  </div>

                  {/* Right: Word in clear lowercase English font */}
                  <div className="flex-1 pr-1 pl-2 text-right">
                    <div className="font-bold text-base sm:text-lg text-stone-900 tracking-tight group-hover:text-blue-600 transition-colors font-sans">
                      {part.displayWord || `${part.word}(s)`}
                    </div>
                    <div className="text-[11px] font-bold text-stone-400">
                      {part.korean}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-pink-50/50 border-t border-pink-100 flex justify-end">
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 active:scale-95 text-white font-black rounded-full shadow-xs transition-all text-sm"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
