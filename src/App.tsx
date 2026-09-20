import React, { useState, useMemo } from 'react';
import { GameScreen, DiceResult, RoundInfo, BodyPart } from './types';
import { ALL_BODY_PARTS } from './data/bodyParts';
import { HeaderBar } from './components/HeaderBar';
import { StartScreen } from './components/StartScreen';
import { DiceScreen } from './components/DiceScreen';
import { DrawingScreen } from './components/DrawingScreen';
import { MonsterReadyScreen } from './components/MonsterReadyScreen';
import { WordMissionScreen } from './components/WordMissionScreen';
import { PictureMissionScreen } from './components/PictureMissionScreen';
import { ResultScreen } from './components/ResultScreen';
import { GuideModal } from './components/GuideModal';

const TOTAL_ROUNDS = 5;

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('start');
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundsHistory, setRoundsHistory] = useState<RoundInfo[]>([
    { roundNumber: 1, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 2, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 3, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 4, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 5, diceResult: null, rerollsUsed: 0 },
  ]);

  // Current round's active dice result
  const [currentDiceResult, setCurrentDiceResult] = useState<DiceResult | null>(null);

  // Canvas image data URL (persisted across all 5 rounds and missions)
  const [monsterCanvasDataUrl, setMonsterCanvasDataUrl] = useState<string | null>(null);

  // Mission state
  const [stars, setStars] = useState<number>(0);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Memoize available parts for current round so object reference is stable across renders
  const availablePartsForCurrentRound = useMemo(() => {
    const chosenInOtherRounds = new Set(
      roundsHistory
        .filter((r) => r.roundNumber !== currentRound && r.diceResult !== null)
        .map((r) => r.diceResult!.bodyPart.id)
    );
    return ALL_BODY_PARTS.filter((p) => !chosenInOtherRounds.has(p.id));
  }, [roundsHistory, currentRound]);

  const startNewGame = () => {
    setCurrentRound(1);
    setRoundsHistory([
      { roundNumber: 1, diceResult: null, rerollsUsed: 0 },
      { roundNumber: 2, diceResult: null, rerollsUsed: 0 },
      { roundNumber: 3, diceResult: null, rerollsUsed: 0 },
      { roundNumber: 4, diceResult: null, rerollsUsed: 0 },
      { roundNumber: 5, diceResult: null, rerollsUsed: 0 },
    ]);
    setCurrentDiceResult(null);
    setMonsterCanvasDataUrl(null);
    setStars(0);
    setScreen('dice');
  };

  const handleDiceRolled = (result: DiceResult, rerollsUsed: number) => {
    setCurrentDiceResult(result);
    setRoundsHistory((prev) =>
      prev.map((r) =>
        r.roundNumber === currentRound ? { ...r, diceResult: result, rerollsUsed } : r
      )
    );
  };

  const handleGoToDraw = (result?: DiceResult) => {
    if (result) {
      setCurrentDiceResult(result);
      setRoundsHistory((prev) =>
        prev.map((r) =>
          r.roundNumber === currentRound ? { ...r, diceResult: result } : r
        )
      );
    }
    setScreen('draw');
  };

  const handleCanvasSave = (dataUrl: string) => {
    setMonsterCanvasDataUrl(dataUrl);
  };

  const handleNextRound = () => {
    if (currentRound < TOTAL_ROUNDS) {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      const nextRoundHistory = roundsHistory.find((r) => r.roundNumber === nextRound);
      setCurrentDiceResult(nextRoundHistory?.diceResult || null);
      setScreen('dice');
    } else {
      setScreen('ready');
    }
  };

  const handleGoBack = () => {
    if (screen === 'dice') {
      if (currentRound === 1) {
        setScreen('start');
      } else {
        const prevRound = currentRound - 1;
        setCurrentRound(prevRound);
        const prevHistory = roundsHistory.find((r) => r.roundNumber === prevRound);
        setCurrentDiceResult(prevHistory?.diceResult || null);
        setScreen('draw');
      }
    } else if (screen === 'draw') {
      setScreen('dice');
    } else if (screen === 'ready') {
      setCurrentRound(TOTAL_ROUNDS);
      setScreen('draw');
    }
  };

  // Prepare Mission 1 target and options
  const mission1Data = useMemo(() => {
    const rolledParts = roundsHistory
      .filter((r) => r.diceResult !== null)
      .map((r) => r.diceResult!.bodyPart);

    const target = rolledParts.length > 0 ? rolledParts[0] : ALL_BODY_PARTS[0];

    const distractors = ALL_BODY_PARTS.filter((p) => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());
    return { target, options };
  }, [roundsHistory]);

  // Prepare Mission 2 target and options
  const mission2Data = useMemo(() => {
    const rolledParts = roundsHistory
      .filter((r) => r.diceResult !== null)
      .map((r) => r.diceResult!.bodyPart);

    const target =
      rolledParts.length > 1
        ? rolledParts[1]
        : rolledParts.length > 0
        ? rolledParts[0]
        : ALL_BODY_PARTS[1];

    const distractors = ALL_BODY_PARTS.filter((p) => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());
    return { target, options };
  }, [roundsHistory]);

  // All learned parts
  const learnedParts = useMemo(() => {
    const map = new Map<string, BodyPart>();
    roundsHistory.forEach((r) => {
      if (r.diceResult) {
        map.set(r.diceResult.bodyPart.id, r.diceResult.bodyPart);
      }
    });
    return map.size > 0 ? Array.from(map.values()) : ALL_BODY_PARTS.slice(0, 5);
  }, [roundsHistory]);

  // Title for Header
  const getHeaderTitle = () => {
    switch (screen) {
      case 'start':
        return 'Roll and Draw Your Own Monster';
      case 'dice':
        return `Round ${currentRound} - 주사위 굴리기`;
      case 'draw':
        return `Round ${currentRound} - 몬스터 그리기`;
      case 'ready':
        return '몬스터 완성!';
      case 'mission_word':
        return '미션 1 - 단어 맞히기';
      case 'mission_picture':
        return '미션 2 - 그림 찾기';
      case 'result':
        return '결과 발표 및 복습';
      default:
        return 'Roll and Draw Your Own Monster';
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] min-h-[100dvh] w-full bg-gradient-to-br from-pink-50/60 via-purple-50/50 to-sky-50/50 font-sans overflow-hidden">
      {/* Top Header Bar */}
      <HeaderBar
        currentRound={screen === 'dice' || screen === 'draw' ? currentRound : undefined}
        totalRounds={TOTAL_ROUNDS}
        missionNumber={
          screen === 'mission_word' ? 1 : screen === 'mission_picture' ? 2 : undefined
        }
        totalMissions={2}
        stars={
          screen === 'mission_word' || screen === 'mission_picture' || screen === 'result'
            ? stars
            : undefined
        }
        title={getHeaderTitle()}
        onOpenGuide={() => setIsGuideOpen(true)}
        onBack={
          screen === 'dice' || screen === 'draw' || screen === 'ready'
            ? handleGoBack
            : undefined
        }
      />

      {/* Main Content View by Screen with Responsive Scrolling */}
      <main className="flex-1 flex flex-col min-h-0 relative overflow-y-auto overflow-x-hidden">
        {screen === 'start' && (
          <StartScreen
            onStart={startNewGame}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {screen === 'dice' && (
          <DiceScreen
            key={`dice-round-${currentRound}`}
            currentRound={currentRound}
            availableParts={availablePartsForCurrentRound}
            existingResult={currentDiceResult}
            initialRerollsUsed={
              roundsHistory.find((r) => r.roundNumber === currentRound)?.rerollsUsed || 0
            }
            onDiceRolled={handleDiceRolled}
            onGoToDraw={handleGoToDraw}
            onPrev={handleGoBack}
          />
        )}

        {screen === 'draw' && currentDiceResult && (
          <DrawingScreen
            key={`draw-round-${currentRound}`}
            currentRound={currentRound}
            totalRounds={TOTAL_ROUNDS}
            diceResult={currentDiceResult}
            canvasDataUrl={monsterCanvasDataUrl}
            onCanvasSave={handleCanvasSave}
            onNextRound={handleNextRound}
            onPrev={handleGoBack}
          />
        )}

        {screen === 'ready' && (
          <MonsterReadyScreen
            monsterImageUrl={monsterCanvasDataUrl}
            onStartMission={() => setScreen('mission_word')}
            onPrev={handleGoBack}
          />
        )}

        {screen === 'mission_word' && (
          <WordMissionScreen
            targetPart={mission1Data.target}
            options={mission1Data.options}
            stars={stars}
            monsterImageUrl={monsterCanvasDataUrl}
            onMissionSuccess={() => {
              setStars((prev) => prev + 1);
              setScreen('mission_picture');
            }}
          />
        )}

        {screen === 'mission_picture' && (
          <PictureMissionScreen
            targetPart={mission2Data.target}
            options={mission2Data.options}
            stars={stars}
            onMissionSuccess={() => {
              setStars((prev) => prev + 1);
              setScreen('result');
            }}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            monsterImageUrl={monsterCanvasDataUrl}
            stars={stars}
            totalStars={2}
            learnedParts={learnedParts}
            onPlayAgain={startNewGame}
            onGoHome={() => setScreen('start')}
          />
        )}
      </main>

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
