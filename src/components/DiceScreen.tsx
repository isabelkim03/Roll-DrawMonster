import React, { useState, useEffect, useRef } from 'react';
import { DiceResult, BodyPart } from '../types';
import { ALL_BODY_PARTS } from '../data/bodyParts';
import { BodyPartIcon } from './BodyPartIcon';
import { getSpokenInstruction } from '../utils/plural';
import {
  speakEnglish,
  playDiceRollSound,
  playDiceStopSound,
  playClick
} from '../utils/audio';
import {
  Volume2,
  RefreshCw,
  ArrowRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

interface DiceScreenProps {
  currentRound: number;
  availableParts: BodyPart[];
  existingResult: DiceResult | null;
  initialRerollsUsed: number;
  onDiceRolled: (result: DiceResult, rerollsUsed: number) => void;
  onGoToDraw: (result?: DiceResult) => void;
  onPrev?: () => void;
}

export const DiceScreen: React.FC<DiceScreenProps> = ({
  currentRound,
  availableParts,
  existingResult,
  initialRerollsUsed,
  onDiceRolled,
  onGoToDraw,
  onPrev
}) => {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const isRollingRef = useRef<boolean>(false);
  const isNavigatingRef = useRef<boolean>(false);

  const [activeResult, setActiveResult] = useState<DiceResult | null>(existingResult);
  const [rerollsUsed, setRerollsUsed] = useState<number>(initialRerollsUsed);

  // Animated display values while dice is rolling
  const [displayCount, setDisplayCount] = useState<number>(existingResult?.count || 3);
  const [displayPart, setDisplayPart] = useState<BodyPart>(
    existingResult?.bodyPart || availableParts[0] || ALL_BODY_PARTS[0]
  );

  const rollIntervalRef = useRef<number | null>(null);

  // Sync state when round or existingResult changes, but never while actively rolling
  useEffect(() => {
    if (isRollingRef.current) return;

    setActiveResult(existingResult);
    setRerollsUsed(initialRerollsUsed);
    if (existingResult) {
      setDisplayPart(existingResult.bodyPart);
      setDisplayCount(existingResult.count);
    } else {
      const fallbackPart = availableParts[0] || ALL_BODY_PARTS[0];
      setDisplayPart(fallbackPart);
      setDisplayCount(3);
    }
  }, [currentRound, initialRerollsUsed, existingResult]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
      }
    };
  }, []);

  const handleRoll = () => {
    if (isRollingRef.current) return;
    if (activeResult !== null && rerollsUsed >= 1) return;

    isRollingRef.current = true;
    setIsRolling(true);
    playClick();
    playDiceRollSound();

    const pool = availableParts.length > 0 ? availableParts : ALL_BODY_PARTS;

    // Rapid face changes for rolling excitement
    const startTime = Date.now();
    const duration = 1200; // 1.2s roll duration

    if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);

    rollIntervalRef.current = window.setInterval(() => {
      const randomCount = Math.floor(Math.random() * 6) + 1;
      const randomPart = pool[Math.floor(Math.random() * pool.length)];
      setDisplayCount(randomCount);
      setDisplayPart(randomPart);

      if (Date.now() - startTime >= duration) {
        if (rollIntervalRef.current) {
          clearInterval(rollIntervalRef.current);
          rollIntervalRef.current = null;
        }

        // Final roll values
        const finalCount = Math.floor(Math.random() * 6) + 1;
        const finalPart = pool[Math.floor(Math.random() * pool.length)];

        // Instruction with body part word including (s)
        const displayWord = finalPart.displayWord || `${finalPart.word}(s)`;
        const instruction = `Draw ${finalCount} ${displayWord}!`;
        const spokenInstruction = getSpokenInstruction(finalCount, finalPart.word);

        const newResult: DiceResult = {
          count: finalCount,
          bodyPart: finalPart,
          instruction,
          spokenInstruction
        };

        const nextRerollsUsed = activeResult === null ? 0 : rerollsUsed + 1;

        setDisplayCount(finalCount);
        setDisplayPart(finalPart);
        setActiveResult(newResult);
        setRerollsUsed(nextRerollsUsed);
        setIsRolling(false);
        isRollingRef.current = false;

        playDiceStopSound();
        speakEnglish(spokenInstruction);
        onDiceRolled(newResult, nextRerollsUsed);
      }
    }, 85);
  };

  const handleSpeakInstruction = () => {
    if (!activeResult) return;
    playClick();
    const toSpeak = activeResult.spokenInstruction || getSpokenInstruction(activeResult.count, activeResult.bodyPart.word);
    speakEnglish(toSpeak);
  };

  const handleGoToDrawClick = () => {
    if (isNavigatingRef.current || isRollingRef.current || !activeResult) return;
    isNavigatingRef.current = true;
    playClick();
    onGoToDraw(activeResult);
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  };

  const rerollsLeft = 1 - rerollsUsed;

  // Dice dots renderer for 1 to 6
  const renderDicePips = (num: number) => {
    const dotClasses = 'w-3 h-3 sm:w-3.5 sm:h-3.5 bg-rose-500 rounded-full shadow-2xs';
    switch (num) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-rose-600 rounded-full shadow-xs" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex justify-between p-2 sm:p-2.5">
            <div className={`${dotClasses} self-start`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex justify-between p-2 sm:p-2.5">
            <div className={`${dotClasses} self-start`} />
            <div className={`${dotClasses} self-center`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full grid grid-cols-2 p-2 sm:p-2.5 gap-2.5 place-items-center">
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full relative p-2 sm:p-2.5">
            <div className={`${dotClasses} absolute top-2 left-2`} />
            <div className={`${dotClasses} absolute top-2 right-2`} />
            <div className={`${dotClasses} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
            <div className={`${dotClasses} absolute bottom-2 left-2`} />
            <div className={`${dotClasses} absolute bottom-2 right-2`} />
          </div>
        );
      case 6:
      default:
        return (
          <div className="w-full h-full grid grid-cols-2 p-2 sm:p-2.5 gap-2 place-items-center">
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-2 sm:p-5 max-w-4xl mx-auto w-full min-h-full select-none pb-6 sm:pb-10 overflow-y-auto">
      {/* Top Header info */}
      <div className="text-center pt-0.5 sm:pt-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-800 px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-sm font-black mb-1 border border-pink-200 shadow-2xs">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
          <span>Round {currentRound} of 5</span>
        </div>
        <h2 className="text-lg sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
          주사위를 굴려 신체 부위와 개수를 정해요! 🎲
        </h2>
        <p className="text-[11px] sm:text-base font-black text-pink-900/70 mt-0.5">
          {activeResult
            ? '결과가 마음에 들면 아래 [몬스터 그리기]를 눌러주세요!'
            : '아래 [주사위 굴리기] 버튼을 탭하세요!'}
        </p>
      </div>

      {/* Center: The Two Dice */}
      <div className="flex flex-col items-center justify-center my-auto w-full gap-2 sm:gap-5 py-2 shrink-0">
        <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 flex-wrap">
          {/* 1. Number Dice */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-sm font-black text-pink-600 mb-0.5 sm:mb-1 uppercase tracking-wider">
              숫자 주사위
            </span>
            <div
              className={`relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-pink-300 shadow-lg shadow-pink-100/60 flex flex-col items-center justify-center p-2 sm:p-3 transition-transform ${
                isRolling ? 'animate-dice-shake scale-105' : 'hover:scale-102'
              }`}
            >
              <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 flex items-center justify-center">
                {renderDicePips(displayCount)}
              </div>
              <span className="text-lg sm:text-2xl md:text-3xl font-black text-pink-600 mt-0.5">
                {displayCount}
              </span>
            </div>
          </div>

          {/* Plus sign between dice */}
          <div className="text-xl sm:text-3xl md:text-5xl font-black text-pink-400 select-none">
            +
          </div>

          {/* 2. 15-Sided Body Part Dice */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-sm font-black text-purple-600 mb-0.5 sm:mb-1 uppercase tracking-wider">
              15면체 신체 부위 주사위
            </span>
            <div
              className={`relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-purple-300 shadow-lg shadow-purple-100/60 flex flex-col items-center justify-center p-2 sm:p-3 transition-transform ${
                isRolling ? 'animate-dice-shake scale-105' : 'hover:scale-102'
              }`}
            >
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded-full text-[9px] sm:text-xs font-black border border-purple-200">
                D15
              </div>
              <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                <BodyPartIcon id={displayPart.id} size={56} />
              </div>
              <span className="text-sm sm:text-xl md:text-2xl font-black text-purple-900 tracking-tight mt-0.5">
                {displayPart.displayWord || `${displayPart.word}(s)`}
              </span>
              <span className="text-[9px] sm:text-xs font-black text-purple-500">
                ({displayPart.korean})
              </span>
            </div>
          </div>
        </div>

        {/* Current Result Speech Banner (Appears when activeResult exists) */}
        {activeResult && !isRolling && (
          <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-100 via-purple-50 to-sky-100 border-2 border-pink-200 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl shadow-sm animate-pulse-gentle max-w-lg w-full justify-between">
            <div className="flex flex-col">
              <span className="text-base sm:text-2xl font-black text-pink-950">
                {activeResult.instruction}
              </span>
              <span className="text-[11px] sm:text-sm font-black text-pink-800">
                {activeResult.bodyPart.korean} {activeResult.count}개를 그려주세요! 💖
              </span>
            </div>
            <button
              type="button"
              onClick={handleSpeakInstruction}
              className="p-1.5 sm:p-2.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-full shadow-xs transition-all shrink-0"
              title="Listen again"
            >
              <Volume2 className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons (Responsive, always visible & scrollable on mobile) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-1 pb-4 w-full max-w-xl shrink-0">
        {onPrev && (
          <button
            type="button"
            onClick={() => {
              playClick();
              onPrev();
            }}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-3 bg-white hover:bg-pink-50 active:scale-95 text-pink-700 font-black text-xs sm:text-base rounded-full shadow-xs border-2 border-pink-200 transition-all flex items-center justify-center gap-1.5 order-3 sm:order-1"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
            <span>이전 화면</span>
          </button>
        )}

        {/* [주사위 굴리기 / 다시 굴리기] 버튼 */}
        <button
          type="button"
          disabled={isRolling || (activeResult !== null && rerollsLeft <= 0)}
          onClick={handleRoll}
          className={`w-full sm:w-auto flex-1 py-3 sm:py-3.5 px-5 sm:px-7 rounded-full font-black text-base sm:text-xl transition-all flex items-center justify-center gap-2 shadow-md border-2 border-white order-1 sm:order-2 ${
            isRolling
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : activeResult === null
              ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white hover:scale-103 active:scale-95 shadow-pink-200/80'
              : rerollsLeft > 0
              ? 'bg-white hover:bg-pink-50 text-pink-700 border-2 border-pink-300 hover:scale-102 active:scale-95 shadow-xs'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300'
          }`}
        >
          <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isRolling ? 'animate-spin' : ''}`} />
          <span>
            {!activeResult
              ? '주사위 굴리기'
              : rerollsLeft > 0
              ? `다시 굴리기 (${rerollsLeft}회 남음)`
              : '다시 굴리기 완료 (0/1)'}
          </span>
        </button>

        {/* [몬스터 그리기] 버튼 (주사위를 굴린 후 나타남) */}
        {activeResult && !isRolling && (
          <button
            type="button"
            disabled={isRolling}
            onClick={handleGoToDrawClick}
            className="w-full sm:w-auto py-3 sm:py-3.5 px-5 sm:px-7 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white font-black text-base sm:text-xl rounded-full shadow-lg hover:shadow-xl hover:scale-103 transition-all flex items-center justify-center gap-1.5 border-2 border-white order-2 sm:order-3"
          >
            <span>몬스터 그리기</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
