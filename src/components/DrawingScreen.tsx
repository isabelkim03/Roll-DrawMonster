import React, { useRef } from 'react';
import { Volume2, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { DiceResult } from '../types';
import { DrawingCanvas } from './DrawingCanvas';
import { speakEnglish, playClick, playSuccessChime } from '../utils/audio';
import { getSpokenInstruction } from '../utils/plural';

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
    const toSpeak = diceResult.spokenInstruction || getSpokenInstruction(diceResult.count, diceResult.bodyPart.word);
    speakEnglish(toSpeak);
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
    <div className="flex-1 flex flex-col p-2 sm:p-4 max-w-6xl mx-auto w-full h-full select-none min-h-0">
      {/* Top Banner: 주사위 결과 안내 `Draw 3 eyes!` + [스피커] 버튼 + [다음] 버튼 */}
      <div className="flex items-center justify-between gap-2 mb-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-100 via-purple-50 to-sky-100 rounded-2xl sm:rounded-3xl border-2 border-pink-200 shadow-xs shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
          <span className="text-base sm:text-2xl md:text-3xl font-black text-pink-950 tracking-tight">
            {diceResult.instruction}
          </span>
          <span className="text-[11px] sm:text-sm font-black text-pink-700 bg-white/90 px-2 sm:px-3 py-0.5 rounded-full border border-pink-200">
            {diceResult.bodyPart.korean} {diceResult.count}개! 💖
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {onPrev && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onPrev();
              }}
              className="px-2.5 sm:px-3.5 py-1.5 bg-white hover:bg-pink-50 active:scale-95 text-pink-700 font-bold text-xs sm:text-sm rounded-full shadow-xs border border-pink-200 transition-all flex items-center gap-1"
              title="이전으로 이동"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
              <span className="hidden sm:inline">이전으로</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSpeakInstruction}
            className="p-1.5 sm:p-2 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-full shadow-xs transition-all flex items-center gap-1 font-bold"
            title="Listen Instruction"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-xs sm:text-sm">듣기</span>
          </button>

          {/* [다음] 버튼 */}
          <button
            type="button"
            onClick={handleNextClick}
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-base rounded-full shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-1 border-2 border-white"
          >
            <span>{isFinalRound ? '몬스터 완성하기' : '다음'}</span>
            {isFinalRound ? <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
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
    </div>
  );
};
