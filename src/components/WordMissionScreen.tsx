import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Star, CheckCircle2, XCircle, HandMetal, Sparkles } from 'lucide-react';
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

  const questionSentence = `Find the ${targetPart.word}!`;

  useEffect(() => {
    speakEnglish(questionSentence);
  }, [questionSentence]);

  const handleSpeakQuestion = () => {
    playClick();
    speakEnglish(questionSentence);
  };

  // Check collision with cards in viewport client coordinates
  const checkCardCollision = (clientX: number, clientY: number): string | null => {
    for (const [id, el] of cardRefs.current.entries()) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left - 30 &&
        clientX <= rect.right + 30 &&
        clientY >= rect.top - 30 &&
        clientY <= rect.bottom + 30
      ) {
        return id;
      }
    }
    return null;
  };

  // Bulletproof Pointer Drag Handling with viewport-fixed positioning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (feedback === 'correct') return;
    e.preventDefault();
    setIsDragging(true);

    const updatePosition = (clientX: number, clientY: number) => {
      setMonsterPos({ x: clientX, y: clientY });
      const hitId = checkCardCollision(clientX, clientY);
      setHoveredCardId(hitId);
    };

    updatePosition(e.clientX, e.clientY);

    const handleWindowMove = (ev: PointerEvent) => {
      ev.preventDefault();
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleWindowUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', handleWindowMove);
      window.removeEventListener('pointerup', handleWindowUp);
      window.removeEventListener('pointercancel', handleWindowUp);
      setIsDragging(false);
      setHoveredCardId(null);

      const hitId = checkCardCollision(ev.clientX, ev.clientY);
      if (hitId) {
        const chosen = options.find((o) => o.id === hitId);
        if (chosen) {
          handleAnswer(chosen);
          return;
        }
      }

      // Reset to resting spot if missed
      setMonsterPos(null);
    };

    window.addEventListener('pointermove', handleWindowMove, { passive: false });
    window.addEventListener('pointerup', handleWindowUp);
    window.addEventListener('pointercancel', handleWindowUp);
  };

  const handleAnswer = (chosen: BodyPart) => {
    if (feedback === 'correct') return;
    setSelectedId(chosen.id);

    // If tapped or dropped, position monster smoothly on center of card
    const targetEl = cardRefs.current.get(chosen.id);
    if (targetEl) {
      const cardRect = targetEl.getBoundingClientRect();
      setMonsterPos({
        x: cardRect.left + cardRect.width / 2,
        y: cardRect.top + cardRect.height / 2
      });
    }

    if (chosen.id === targetPart.id) {
      setFeedback('correct');
      playSuccessChime();
      playStarEarned();
      speakEnglish(`Great job! That is ${targetPart.word}!`);

      setTimeout(() => {
        onMissionSuccess();
      }, 1500);
    } else {
      setFeedback('wrong');
      playTryAgainSound();
      speakEnglish(`Try again! Find the ${targetPart.word}!`);
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
      className="flex-1 flex flex-col justify-between p-4 md:p-6 max-w-5xl mx-auto w-full h-full select-none relative overflow-hidden"
    >
      {/* Top Header Banner */}
      <div className="flex flex-col items-center text-center pt-1 z-10">
        <div className="flex items-center gap-3 bg-white px-6 py-2.5 rounded-2xl border-3 border-purple-300 shadow-md">
          <h2 className="text-3xl md:text-5xl font-black text-purple-900 tracking-tight">
            {questionSentence}
          </h2>
          <button
            type="button"
            onClick={handleSpeakQuestion}
            className="p-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white rounded-xl shadow-md transition-all shrink-0"
            title="Listen Question"
          >
            <Volume2 className="w-7 h-7" />
          </button>
        </div>
        <p className="text-sm md:text-base font-extrabold text-slate-600 mt-2 flex items-center gap-2">
          <span>내가 그린 귀여운 몬스터를 마우스로 끌어서 정답에 닿게 해주세요! 🐾</span>
          <span className="text-purple-600 font-black">({targetPart.korean})</span>
        </p>
      </div>

      {/* Middle Section: 3 Word Choice Cards */}
      <div className="my-auto py-2 z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto w-full">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isHovered = hoveredCardId === option.id;

            let cardStyles = 'bg-white border-slate-200 text-slate-800 shadow-md hover:border-purple-300';
            if (isHovered && !selectedId) {
              cardStyles = 'bg-purple-50 border-purple-500 ring-4 ring-purple-300 scale-105 shadow-xl text-purple-900';
            } else if (isSelected) {
              if (feedback === 'correct') {
                cardStyles = 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300 text-emerald-900 scale-105 shadow-2xl';
              } else if (feedback === 'wrong') {
                cardStyles = 'bg-rose-50 border-rose-500 ring-4 ring-rose-300 text-rose-900 animate-shake';
              }
            }

            return (
              <div
                key={option.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(option.id, el);
                  else cardRefs.current.delete(option.id);
                }}
                onClick={() => handleAnswer(option)}
                className={`p-6 md:p-8 rounded-3xl border-4 transition-all flex flex-col items-center justify-center gap-2 text-center cursor-pointer relative ${cardStyles}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl md:text-4xl font-black tracking-tight">
                    {option.word}
                  </span>
                  {isSelected && feedback === 'correct' && (
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                  )}
                  {isSelected && feedback === 'wrong' && (
                    <XCircle className="w-8 h-8 text-rose-500" />
                  )}
                </div>
                <span className="text-sm font-bold text-slate-400">
                  {option.korean}
                </span>

                {isHovered && (
                  <div className="absolute -top-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-black animate-bounce shadow-md">
                    몬스터를 여기에 퐁당! ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback text banner */}
        {feedback === 'correct' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600 font-black text-xl animate-bounce">
            <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
            <span>정답이에요! 별을 획득했어요! ⭐ (+1)</span>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mt-4 text-center text-rose-500 font-black text-lg animate-pulse">
            다시 한 번 몬스터를 움직여 알맞은 단어를 찾아봐요! 💪
          </div>
        )}
      </div>

      {/* Bottom Area: Draggable Cute Monster Piece (ONLY the monster moves!) */}
      <div className="w-full flex flex-col items-center justify-center pb-2 z-20">
        {/* Static friendly prompt at the bottom */}
        <div className="mb-2 flex items-center gap-1.5 text-xs sm:text-sm font-black text-purple-700 bg-purple-50/90 px-3.5 py-1 rounded-full border border-purple-200 shadow-2xs select-none">
          <Sparkles className="w-4 h-4 text-purple-600 fill-purple-300 shrink-0" />
          <span>몬스터를 꾹 잡아서 알맞은 단어 카드로 날려보세요!</span>
        </div>

        {/* Monster Rest Nest / Launch Base */}
        <div className="relative w-22 h-22 md:w-26 md:h-26 rounded-3xl border-3 border-dashed border-purple-300 bg-purple-100/40 flex items-center justify-center">
          {/* Ghost indicator when monster is dragged away */}
          {monsterPos && (
            <div className="flex flex-col items-center justify-center text-purple-400 select-none pointer-events-none animate-pulse">
              <span className="text-2xl">🐾</span>
              <span className="text-[10px] font-black mt-0.5">출발지</span>
            </div>
          )}

          {/* ONLY the Monster Character Token Itself Moves! */}
          <div
            onPointerDown={handlePointerDown}
            style={
              monsterPos
                ? {
                    position: 'fixed',
                    left: `${monsterPos.x}px`,
                    top: `${monsterPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    touchAction: 'none'
                  }
                : {
                    position: 'relative',
                    touchAction: 'none'
                  }
            }
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-white border-4 border-amber-400 shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-transform ${
              isDragging
                ? 'scale-125 shadow-2xl ring-4 ring-amber-400 -rotate-6 z-50 pointer-events-none'
                : 'hover:scale-110'
            } ${feedback === 'correct' ? 'animate-bounce ring-4 ring-emerald-400' : ''}`}
          >
            {/* Monster Drawing or Chibi Monster */}
            <div className="w-full h-full p-1.5 overflow-hidden rounded-xl md:rounded-2xl flex items-center justify-center pointer-events-none">
              {monsterImageUrl ? (
                <img
                  src={monsterImageUrl}
                  alt="My Monster"
                  className="w-full h-full object-contain pointer-events-none"
                />
              ) : (
                <svg width="60" height="60" viewBox="0 0 64 64" fill="none" className="pointer-events-none">
                  {/* Baby sprout */}
                  <path d="M30 10 C28 4 23 4 23 7 C23 9 28 10 30 11" fill="#22C55E" stroke="#0F172A" strokeWidth="1.5" />
                  <path d="M34 10 C36 4 41 4 41 7 C41 9 36 10 34 11" fill="#86EFAC" stroke="#0F172A" strokeWidth="1.5" />
                  {/* Round squishy baby body */}
                  <ellipse cx="32" cy="35" rx="26" ry="24" fill="#FDE047" stroke="#0F172A" strokeWidth="3" />
                  {/* Soft tummy */}
                  <ellipse cx="32" cy="41" rx="16" ry="13" fill="#FEF3C7" stroke="#0F172A" strokeWidth="1.5" />
                  {/* Big shiny baby eyes */}
                  <circle cx="23" cy="30" r="5" fill="#0F172A" />
                  <circle cx="25" cy="28" r="2" fill="#FFFFFF" />
                  <circle cx="41" cy="30" r="5" fill="#0F172A" />
                  <circle cx="43" cy="28" r="2" fill="#FFFFFF" />
                  {/* Chubby blushing cheeks */}
                  <ellipse cx="16" cy="37" rx="4" ry="2.8" fill="#FB7185" opacity="0.9" />
                  <ellipse cx="48" cy="37" rx="4" ry="2.8" fill="#FB7185" opacity="0.9" />
                  {/* Baby smile with tongue */}
                  <path d="M28 38 Q32 44 36 38" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M29 39 Q32 43 35 39" fill="#FB7185" />
                </svg>
              )}
            </div>

            {/* Little Sparkle Accent */}
            <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white rounded-full p-1 shadow-sm pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
            </div>

            {/* Drag tooltip bubble while flying */}
            {isDragging && (
              <span className="absolute -bottom-7 bg-purple-900/90 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-md pointer-events-none animate-pulse">
                정답 카드로 퐁당! ✨
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
