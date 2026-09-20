import React, { useState, useEffect } from 'react';
import { Volume2, Star, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { BodyPart } from '../types';
import { BodyPartIcon } from './BodyPartIcon';
import { speakEnglish, playClick, playSuccessChime, playTryAgainSound, playStarEarned } from '../utils/audio';

interface PictureMissionScreenProps {
  targetPart: BodyPart;
  options: BodyPart[];
  stars: number;
  onMissionSuccess: () => void;
}

export const PictureMissionScreen: React.FC<PictureMissionScreenProps> = ({
  targetPart,
  options,
  stars,
  onMissionSuccess
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const questionSentence = `Which one is ${targetPart.displayWord || `${targetPart.word}(s)`}?`;

  useEffect(() => {
    speakEnglish(questionSentence);
  }, [questionSentence]);

  const handleSpeakQuestion = () => {
    playClick();
    speakEnglish(questionSentence);
  };

  const handleOptionSelect = (optionId: string) => {
    if (feedback === 'correct') return;
    playClick();
    setSelectedId(optionId);

    const isCorrect = optionId === targetPart.id;

    if (isCorrect) {
      setFeedback('correct');
      playSuccessChime();
      playStarEarned();
      
      let navigated = false;
      const proceedToResult = () => {
        if (navigated) return;
        navigated = true;
        // Brief pleasant 400ms pause after voice finishes speaking
        setTimeout(() => {
          onMissionSuccess();
        }, 400);
      };

      // Speak the feedback and trigger transition ONLY after utterance onend fires
      speakEnglish(`Awesome! That is ${targetPart.word}!`, proceedToResult);

      // Safety fallback in case speech synthesis fails or is muted
      setTimeout(() => {
        proceedToResult();
      }, 3500);
    } else {
      setFeedback('wrong');
      playTryAgainSound();
      speakEnglish('Try again!');

      setTimeout(() => {
        setFeedback('idle');
        setSelectedId(null);
      }, 1200);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-5xl mx-auto w-full min-h-full select-none overflow-y-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col items-center text-center pt-1 shrink-0">
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
          <span>영어 단어에 알맞은 신체 부위 그림을 찾아 탭하세요! 💖</span>
          <span className="text-pink-600 font-black">({targetPart.korean})</span>
        </p>
      </div>

      {/* Center Cards Grid */}
      <div className="my-auto py-2 sm:py-4 flex flex-col items-center justify-center w-full shrink-0">
        <div className="grid grid-cols-1 landscape:grid-cols-3 sm:grid-cols-3 gap-2.5 sm:gap-6 w-full max-w-3xl">
          {options.map((option) => {
            const isTarget = option.id === targetPart.id;
            const isSelected = selectedId === option.id;

            let cardStyle =
              'bg-white border-2.5 border-stone-800 text-stone-900 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1';

            if (isSelected) {
              if (feedback === 'correct' && isTarget) {
                cardStyle =
                  'bg-emerald-50 border-3 border-emerald-500 text-emerald-900 scale-105 shadow-xl ring-4 ring-emerald-200';
              } else if (feedback === 'wrong') {
                cardStyle =
                  'bg-rose-50 border-3 border-rose-500 text-rose-900 animate-shake';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionSelect(option.id)}
                className={`rounded-2xl p-2.5 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 shadow-sm relative ${cardStyle}`}
              >
                {/* Binder hole punch circle */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full border border-stone-400 bg-stone-100" />

                <div className="w-16 h-16 sm:w-28 sm:h-28 flex items-center justify-center mb-1 sm:mb-2">
                  <BodyPartIcon id={option.id} size={70} />
                </div>
                <span className="text-xs sm:text-lg font-black text-stone-800 bg-stone-100 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-stone-300 font-sans">
                  {option.korean}
                </span>

                {isSelected && feedback === 'correct' && isTarget && (
                  <div className="mt-1 sm:mt-2 flex items-center gap-1 text-emerald-600 font-black text-xs sm:text-sm animate-bounce">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>정답! 💖</span>
                  </div>
                )}
                {isSelected && feedback === 'wrong' && (
                  <div className="mt-1 sm:mt-2 flex items-center gap-1 text-rose-500 font-black text-xs sm:text-sm">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>다시 해봐요!</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {feedback === 'correct' && (
          <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600 font-black text-base sm:text-xl animate-bounce">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
            <span>정답이에요! 별을 획득했어요! ⭐ (+1)</span>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center pb-2 shrink-0">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-200">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>단어의 뜻을 떠올리며 알맞은 그림을 골라보세요!</span>
        </div>
      </div>
    </div>
  );
};
