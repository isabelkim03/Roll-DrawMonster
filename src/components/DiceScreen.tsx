import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Dices, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { BodyPart, DiceResult } from '../types';
import { BodyPartIcon } from './BodyPartIcon';
import { speakEnglish, playDiceRoll, playSuccessChime, playClick } from '../utils/audio';
import { getInstructionText, getResultLabel, ALL_BODY_PARTS } from '../data/bodyParts';

interface DiceScreenProps {
  currentRound: number;
  availableParts: BodyPart[];
  existingResult: DiceResult | null;
  initialRerollsUsed?: number;
  onDiceRolled: (result: DiceResult, rerollsUsed: number) => void;
  onGoToDraw: (result?: DiceResult) => void;
  onPrev?: () => void;
}

const MAX_REROLLS = 1;

export const DiceScreen: React.FC<DiceScreenProps> = ({
  currentRound,
  availableParts,
  existingResult,
  initialRerollsUsed = 0,
  onDiceRolled,
  onGoToDraw,
  onPrev
}) => {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [activeResult, setActiveResult] = useState<DiceResult | null>(existingResult);
  const [rerollsUsed, setRerollsUsed] = useState<number>(initialRerollsUsed);

  // References to prevent duplicate intervals and race conditions
  const isRollingRef = useRef<boolean>(false);
  const rollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up any running timers on unmount
  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current);
        rollIntervalRef.current = null;
      }
      isRollingRef.current = false;
    };
  }, []);

  // Sync state when round or existingResult changes, but NEVER while actively rolling
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
  }, [currentRound, initialRerollsUsed, existingResult, availableParts]);

  const rerollsLeft = Math.max(0, MAX_REROLLS - rerollsUsed);

  // Temporary displayed items during roll animation
  const [displayPart, setDisplayPart] = useState<BodyPart>(
    existingResult ? existingResult.bodyPart : availableParts[0] || ALL_BODY_PARTS[0]
  );
  const [displayCount, setDisplayCount] = useState<number>(
    existingResult ? existingResult.count : 3
  );

  const handleRoll = () => {
    // Instant guard using ref to prevent any double-click or simultaneous trigger
    if (isRollingRef.current || isRolling) return;
    // Disallow roll if re-roll limit reached on an existing result
    if (activeResult && rerollsLeft <= 0) return;

    isRollingRef.current = true;
    setIsRolling(true);
    playDiceRoll();

    const isInitialRoll = !activeResult;
    const nextRerollsUsed = isInitialRoll ? rerollsUsed : rerollsUsed + 1;
    setRerollsUsed(nextRerollsUsed);

    // On re-rolls, prioritize giving a different body part than the current one
    const candidateParts = availableParts.filter(
      p => !activeResult || p.id !== activeResult.bodyPart.id
    );
    const pool =
      candidateParts.length > 0
        ? candidateParts
        : availableParts.length > 0
        ? availableParts
        : ALL_BODY_PARTS;

    // Clear any lingering interval just in case
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
      rollIntervalRef.current = null;
    }

    // Pre-calculate final random pick to guarantee valid result
    const finalPart = pool[Math.floor(Math.random() * pool.length)];
    const finalCount = Math.floor(Math.random() * 5) + 1;
    const resultLabel = getResultLabel(finalPart, finalCount);
    const instruction = getInstructionText(finalPart, finalCount);

    const newResult: DiceResult = {
      bodyPart: finalPart,
      count: finalCount,
      resultLabel,
      instruction
    };

    // Snappy, lag-free shuffle: 8 rapid steps of 85ms (~680ms)
    let intervalCount = 0;
    rollIntervalRef.current = setInterval(() => {
      intervalCount++;
      const randomPart = pool[Math.floor(Math.random() * pool.length)];
      const randomCount = Math.floor(Math.random() * 5) + 1;
      setDisplayPart(randomPart);
      setDisplayCount(randomCount);

      if (intervalCount >= 8) {
        if (rollIntervalRef.current) {
          clearInterval(rollIntervalRef.current);
          rollIntervalRef.current = null;
        }

        setDisplayPart(finalPart);
        setDisplayCount(finalCount);
        setActiveResult(newResult);
        isRollingRef.current = false;
        setIsRolling(false);

        onDiceRolled(newResult, nextRerollsUsed);
        playSuccessChime();

        // Speak the English result immediately (number first, then body part)
        speakEnglish(`${finalCount} ${finalPart.word}! ${instruction}`);
      }
    }, 85);
  };

  const handleSpeakResult = () => {
    if (!activeResult) return;
    playClick();
    speakEnglish(`${activeResult.count} ${activeResult.bodyPart.word}! ${activeResult.instruction}`);
  };

  // Render dice pips for standard 1 to 5 dice
  const renderDicePips = (num: number) => {
    const pips: Record<number, number[][]> = {
      1: [[50, 50]],
      2: [[30, 30], [70, 70]],
      3: [[28, 28], [50, 50], [72, 72]],
      4: [[28, 28], [72, 28], [28, 72], [72, 72]],
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      6: [[28, 24], [28, 50], [28, 76], [72, 24], [72, 50], [72, 76]]
    };

    const coords = pips[num] || pips[1];
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {coords.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="9"
            fill="#EF4444"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 max-w-4xl mx-auto w-full h-full select-none">
      {/* Top Banner / Guidance */}
      <div className="text-center pt-2">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800">
          주사위를 굴려 신체 부위와 개수를 정해요!
        </h2>
        <p className="text-sm font-bold text-slate-500 mt-1">
          남은 단어 {availableParts.length}개 중 하나가 나와요 (중복 없음)
        </p>
      </div>

      {/* Center: The Two Dices side by side */}
      <div className="flex flex-col items-center justify-center my-auto w-full gap-6">
        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {/* 1. Number Dice (1 to 5) - Left */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-black text-slate-500 mb-2 uppercase tracking-wider">
              숫자 주사위
            </span>
            <div
              className={`relative w-44 h-44 md:w-52 md:h-52 bg-white rounded-3xl border-4 border-rose-400 shadow-xl flex flex-col items-center justify-center p-4 transition-transform ${
                isRolling ? 'animate-dice-shake scale-105' : 'hover:scale-102'
              }`}
            >
              <div className="w-24 h-24 md:w-28 md:h-28">
                {renderDicePips(displayCount)}
              </div>
              <span className="text-2xl md:text-3xl font-black text-rose-600 mt-1">
                {displayCount}
              </span>
            </div>
          </div>

          {/* Plus sign between dice */}
          <div className="text-4xl md:text-5xl font-black text-amber-500 select-none">
            +
          </div>

          {/* 2. 15-Sided Body Part Dice - Right */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-black text-slate-500 mb-2 uppercase tracking-wider">
              15면체 신체 부위 주사위
            </span>
            <div
              className={`relative w-44 h-44 md:w-52 md:h-52 bg-white rounded-3xl border-4 border-indigo-400 shadow-xl flex flex-col items-center justify-center p-3 transition-transform ${
                isRolling ? 'animate-dice-shake scale-105' : 'hover:scale-102'
              }`}
            >
              {/* Polygon facet accents simulating 15-sided dice */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md text-xs font-black">
                D15
              </div>
              <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                <BodyPartIcon id={displayPart.id} size={90} />
              </div>
              <span className="text-xl md:text-2xl font-black text-indigo-900 tracking-tight mt-1">
                {displayPart.word}
              </span>
              <span className="text-xs font-bold text-indigo-500">
                ({displayPart.korean})
              </span>
            </div>
          </div>
        </div>

        {/* Result Word Banner: e.g. "eyes + 3" (주사위 아래, 큰 글씨) + [스피커] 버튼 */}
        {activeResult && !isRolling && (
          <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 bg-gradient-to-r from-amber-50 via-white to-amber-50 px-8 py-3.5 rounded-3xl border-3 border-amber-300 shadow-md">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-3xl md:text-5xl font-black text-amber-600 tracking-tight">
                  {activeResult.resultLabel}
                </span>
                <span className="text-lg md:text-2xl font-extrabold text-slate-700 sm:ml-3">
                  ({activeResult.instruction})
                </span>
              </div>
              <button
                type="button"
                onClick={handleSpeakResult}
                className="p-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-2xl shadow-md transition-all shrink-0"
                title="발음 듣기 (Listen)"
              >
                <Volume2 className="w-7 h-7" />
              </button>
            </div>

            {/* Re-roll Remaining Counter Badge (최대 1번 제한) */}
            <div className="flex items-center justify-center">
              <div
                className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full font-bold text-sm md:text-base shadow-sm transition-all border-2 ${
                  rerollsLeft === 1
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-slate-100 border-slate-300 text-slate-500'
                }`}
              >
                <Dices className="w-4 h-4 shrink-0" />
                <span>
                  {rerollsLeft > 0 ? (
                    <>
                      다시 굴리기 기회: <strong>{rerollsLeft}회 남음</strong> (최대 1회)
                    </>
                  ) : (
                    <>
                      다시 굴리기 기회 <strong>모두 사용 완료 (0/1)</strong>
                    </>
                  )}
                </span>
                {/* 1 Dice token indicating chance */}
                <div className="flex items-center gap-1.5 ml-1">
                  {[1].map((idx) => {
                    const isUsed = idx > rerollsLeft;
                    return (
                      <span
                        key={idx}
                        className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                          isUsed
                            ? 'bg-slate-200 text-slate-400 opacity-60'
                            : 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-300 animate-pulse'
                        }`}
                        title={isUsed ? '사용된 기회' : '남은 기회'}
                      >
                        🎲
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-4 w-full max-w-xl">
        {onPrev && (
          <button
            type="button"
            disabled={isRolling}
            onClick={() => {
              playClick();
              onPrev();
            }}
            className="py-4 px-5 bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-black text-xl rounded-2xl border-3 border-slate-300 shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
            title="이전으로 이동"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
            <span>이전으로</span>
          </button>
        )}

        {/* [주사위 굴리기 / 다시 굴리기] 버튼 (다시 굴리기는 1회로 제한) */}
        <button
          type="button"
          disabled={isRolling || (activeResult !== null && rerollsLeft <= 0)}
          onClick={handleRoll}
          className={`flex-1 w-full py-4 px-6 font-black text-xl md:text-2xl rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 border-4 border-white ${
            isRolling
              ? 'bg-slate-400 text-slate-100 cursor-not-allowed'
              : activeResult !== null && rerollsLeft <= 0
              ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105 active:scale-95'
          }`}
          title={
            activeResult !== null && rerollsLeft <= 0
              ? '다시 굴리기 기회(1회)를 모두 사용했습니다.'
              : undefined
          }
        >
          <Dices className={`w-7 h-7 ${isRolling ? 'animate-spin' : ''}`} />
          <span>
            {!activeResult
              ? '주사위 굴리기'
              : rerollsLeft > 0
              ? `다시 굴리기 (${rerollsLeft}회 남음)`
              : '다시 굴리기 완료 (0/1)'}
          </span>
        </button>

        {/* [그리기 시작] 버튼 (appears once dice rolled) */}
        {activeResult && !isRolling && (
          <button
            type="button"
            disabled={isRolling}
            onClick={() => {
              if (isRollingRef.current) return;
              playClick();
              onGoToDraw(activeResult);
            }}
            className="flex-1 w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xl md:text-2xl rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 border-4 border-white animate-pulse"
          >
            <span>몬스터 그리기</span>
            <ArrowRight className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );
};
