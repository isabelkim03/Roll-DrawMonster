import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Star, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { BodyPart } from '../types';
import { speakEnglish, playClick, playSuccessChime, playTryAgainSound, playStarEarned } from '../utils/audio';

interface WordMissionScreenProps {
  targetPart: BodyPart;
  options: BodyPart[];
  stars: number;
  monsterImageUrl: string | null;
  onMissionSuccess: () => void;
}

export const WordMissionScreen: React.FC<WordMissionScreenProps> = ({
  targetPart,
  options,
  stars,
  monsterImageUrl,
  onMissionSuccess
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Dragging state
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [monsterPos, setMonsterPos] = useState<{ x: number; y: number } | null>(null);

  const questionSentence = `Find the ${targetPart.displayWord || `${targetPart.word}(s)`}!`;

  useEffect(() => {
    speakEnglish(questionSentence);
  }, [questionSentence]);

  const handleSpeakQuestion = () => {
    playClick();
    speakEnglish(questionSentence);
  };

  const checkCardCollision = (clientX: number, clientY: number): string | null => {
    for (const [id, el] of cardRefs.current.entries()) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left - 20 &&
        clientX <= rect.right + 20 &&
        clientY >= rect.top - 20 &&
        clientY <= rect.bottom + 20
      ) {
        return id;
      }
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (feedback === 'correct') return;
    setIsDragging(true);
    setMonsterPos({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setMonsterPos({ x: e.clientX, y: e.clientY });
    const collidedId = checkCardCollision(e.clientX, e.clientY);
    setHoveredCardId(collidedId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const collidedId = checkCardCollision(e.clientX, e.clientY);
    setHoveredCardId(null);

    if (collidedId) {
      handleOptionSelect(collidedId);
    } else {
      setMonsterPos(null);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (feedback === 'correct') return;
    setSelectedId(optionId);

    const isCorrect = optionId === targetPart.id;

    if (isCorrect) {
      setFeedback('correct');
      playSuccessChime();
      playStarEarned();

      let navigated = false;
      const proceedToNextMission = () => {
        if (navigated) return;
        navigated = true;
        setTimeout(() => {
          onMissionSuccess();
        }, 400);
      };

      // Speak feedback and transition ONLY after utterance onend fires
      speakEnglish(`Great job! That is ${targetPart.word}!`, proceedToNextMission);

      // Safety fallback
      setTimeout(() => {
        proceedToNextMission();
      }, 3500);
    } else {
      setFeedback('wrong');
      playTryAgainSound();
      speakEnglish('Try again!');

      setTimeout(() => {
        setFeedback('idle');
        setSelectedId(null);
        setMonsterPos(null);
      }, 1200);
    }
  };

  return (
    <div
      ref={arenaRef}
      className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-5xl mx-auto w-full min-h-full select-none relative overflow-y-auto pb-10"
    >
      {/* Top Header Banner */}
      <div className="flex flex-col items-center text-center pt-1 z-10 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 bg-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-3xl border-4 border-pink-300 shadow-md">
          <span className="text-2xl sm:text-3xl animate-bounce">🎀</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 tracking-tight">
            {questionSentence}
          </h2>
          <button
            type="button"
            onClick={handleSpeakQuestion}
            className="p-2 sm:p-2.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-full shadow-xs transition-all shrink-0"
            title="Listen Question"
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <p className="text-xs sm:text-base font-black text-pink-900/80 mt-1.5 flex items-center gap-1.5">
          <span>내가 그린 몬스터를 끌어서 알맞은 단어 카드로 이동해보세요! 🐾</span>
          <span className="text-pink-600 font-black">({targetPart.korean})</span>
        </p>
      </div>

      {/* Center Area: Word Cards */}
      <div className="my-auto py-2 sm:py-4 flex flex-col items-center justify-center w-full z-10 shrink-0">
        <div className="grid grid-cols-1 landscape:grid-cols-3 sm:grid-cols-3 gap-2.5 sm:gap-6 w-full max-w-3xl">
          {options.map((option) => {
            const isTarget = option.id === targetPart.id;
            const isSelected = selectedId === option.id;
            const isHovered = hoveredCardId === option.id;

            let cardStyle =
              'bg-white/95 border-3 border-pink-200 text-slate-800 hover:border-pink-300 hover:shadow-lg';

            if (isHovered) {
              cardStyle = 'bg-pink-50 border-3 border-pink-400 scale-105 shadow-xl ring-4 ring-pink-200';
            }

            if (isSelected) {
              if (feedback === 'correct' && isTarget) {
                cardStyle = 'bg-emerald-50 border-4 border-emerald-400 text-emerald-900 scale-105 shadow-xl ring-4 ring-emerald-200';
              } else if (feedback === 'wrong') {
                cardStyle = 'bg-rose-50 border-4 border-rose-400 text-rose-900 animate-shake';
              }
            }

            return (
              <div
                key={option.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(option.id, el);
                  else cardRefs.current.delete(option.id);
                }}
                onClick={() => handleOptionSelect(option.id)}
                className={`cursor-pointer rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 select-none shadow-md ${cardStyle}`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                  <span className="text-xl sm:text-4xl font-black tracking-tight uppercase text-pink-950">
                    {(option.displayWord || `${option.word}(s)`).toUpperCase()}
                  </span>
                  {isSelected && feedback === 'correct' && isTarget && (
                    <CheckCircle2 className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-500 animate-bounce" />
                  )}
                  {isSelected && feedback === 'wrong' && (
                    <XCircle className="w-5 h-5 sm:w-8 sm:h-8 text-rose-500" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-black text-pink-400">
                  {option.korean}
                </span>

                {isHovered && (
                  <div className="absolute -top-3 bg-pink-500 text-white text-[11px] px-3 py-0.5 rounded-full font-black animate-bounce shadow-md">
                    몬스터를 여기에 퐁당! ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback text banner */}
        {feedback === 'correct' && (
          <div className="mt-3 flex items-center justify-center gap-2 text-pink-600 font-black text-base sm:text-xl animate-bounce">
            <Star className="w-6 h-6 fill-amber-300 text-amber-400" />
            <span>정답이에요! 사랑스러운 별을 획득했어요! ⭐ (+1)</span>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-3 text-center text-rose-500 font-black text-sm sm:text-lg animate-pulse">
            다시 한 번 몬스터를 움직여 알맞은 단어를 찾아봐요! 💖
          </div>
        )}
      </div>

      {/* Bottom Area: Draggable Monster Piece */}
      <div className="w-full flex flex-col items-center justify-center pb-2 z-20 shrink-0">
        <div className="mb-2 flex items-center gap-1.5 text-xs sm:text-sm font-black text-pink-700 bg-white/90 px-4 py-1 rounded-full border border-pink-200 shadow-2xs select-none">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-pink-300 shrink-0" />
          <span>몬스터를 꾹 잡아서 알맞은 단어 카드로 쏙 날려보세요! 🎀</span>
        </div>

        <div className="relative w-20 h-20 sm:w-26 sm:h-26 rounded-3xl border-3 border-dashed border-pink-300 bg-pink-100/40 flex items-center justify-center">
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`w-18 h-18 sm:w-24 sm:h-24 rounded-2xl bg-white border-3 border-pink-400 shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center p-1.5 touch-none select-none transition-transform ${
              isDragging ? 'fixed z-50 pointer-events-none scale-110 shadow-2xl opacity-90' : 'hover:scale-105'
            }`}
            style={
              isDragging && monsterPos
                ? {
                    left: `${monsterPos.x}px`,
                    top: `${monsterPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }
                : {}
            }
          >
            {monsterImageUrl ? (
              <img
                src={monsterImageUrl}
                alt="My Monster Token"
                className="w-full h-full object-contain pointer-events-none"
              />
            ) : (
              <div className="text-xl sm:text-2xl font-black text-pink-500">👾</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
