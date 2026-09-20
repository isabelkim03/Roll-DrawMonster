import React from 'react';
import { X, Volume2 } from 'lucide-react';
import { ALL_BODY_PARTS } from '../data/bodyParts';
import { BodyPartIcon } from './BodyPartIcon';
import { speakEnglish, playClick } from '../utils/audio';

interface MonsterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MonsterGuideModal: React.FC<MonsterGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-100 border-b border-amber-200">
          <div>
            <h2 className="text-2xl font-black text-amber-900">
              신체 부위 단어 사전 (15 Body Parts)
            </h2>
            <p className="text-xs font-medium text-amber-800">
              스피커를 누르면 원어민 발음을 들을 수 있어요!
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-amber-200 text-amber-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ALL_BODY_PARTS.map(part => (
            <div
              key={part.id}
              className="flex items-center gap-3 p-2.5 rounded-2xl border-2 border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition-all bg-white shadow-xs"
            >
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                <BodyPartIcon id={part.id} size={40} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-slate-800 text-base leading-tight truncate">
                  {part.displayWord || `${part.word}(s)`}
                </div>
                <div className="text-xs text-slate-500 font-bold">
                  {part.korean}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  speakEnglish(part.word);
                }}
                className="p-2 rounded-full hover:bg-amber-200 text-amber-600 transition-colors shrink-0"
                title={`Listen ${part.word}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow-md transition-all"
          >
            닫기 (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
