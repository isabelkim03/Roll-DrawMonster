import React, { useRef } from 'react';
import { Volume2, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { DiceResult } from '../types';
import { DrawingCanvas } from './DrawingCanvas';
import { speakEnglish, playClick, playSuccessChime } from '../utils/audio';

interface DrawingScreenProps {
  currentRound: number;
  totalRounds: number;
  diceResult: DiceResult;
  canvasDataUrl: string | null;
  onCanvasSave: (dataUrl: string) => void;
  onNextRound: () => void;
  onPrev?: () => void;
}

export const DrawingScreen: React.FC<DrawingScreenProps> = ({
  currentRound,
  totalRounds,
  diceResult,
  canvasDataUrl,
  onCanvasSave,
  onNextRound,
  onPrev
}) => {
  const isNavigatingRef = useRef<boolean>(false);

  const handleSpeakInstruction = () => {
    playClick();
    speakEnglish(diceResult.instruction);
  };

  const handleNextClick = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    playClick();
    playSuccessChime();
    onNextRound();
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  };

  const isFinalRound = currentRound === totalRounds;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-6xl mx-auto w-full h-full select-none">
      {/* Top Banner: 주사위 결과 안내 `Draw 3 eyes!` + [스피커] 버튼 */}
      <div className="flex items-center justify-between gap-4 mb-3 px-4 py-3 bg-gradient-to-r from-amber-100 via-orange-50 to-pink-100 rounded-2xl border-2 border-amber-300 shadow-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xl md:text-3xl font-black text-amber-950 tracking-tight">
            {diceResult.instruction}
          </span>
          <span className="text-sm md:text-base font-bold text-amber-800 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
            {diceResult.bodyPart.korean} {diceResult.count}개를 그려주세요!
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {onPrev && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onPrev();
              }}
              className="px-3.5 py-2.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-sm rounded-xl shadow-xs border border-slate-200 transition-all flex items-center gap-1.5"
              title="이전으로 이동"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>이전으로</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSpeakInstruction}
            className="p-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 font-bold"
            title="Listen Instruction"
          >
            <Volume2 className="w-6 h-6" />
            <span className="hidden sm:inline text-sm">듣기</span>
          </button>

          {/* [다음] 버튼 (화면 오른쪽 상단/하단 모두 편하게 접근 가능하도록) */}
          <button
            type="button"
            onClick={handleNextClick}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base md:text-lg rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white"
          >
            <span>{isFinalRound ? '몬스터 완성하기' : '다음'}</span>
            {isFinalRound ? <CheckCircle className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Center: Spacious Drawing Canvas Area with tools */}
      <div className="flex-1 w-full min-h-0 relative">
        <DrawingCanvas
          initialDataUrl={canvasDataUrl}
          onCanvasSave={onCanvasSave}
        />
      </div>

      {/* Bottom bar for mobile next button if needed */}
      <div className="mt-2 flex items-center justify-end px-2 sm:hidden">
        <button
          type="button"
          onClick={handleNextClick}
          className="px-5 py-2.5 bg-emerald-500 text-white font-black rounded-xl shadow-sm"
        >
          {isFinalRound ? '완성하기' : '다음 ➡️'}
        </button>
      </div>
    </div>
  );
};
