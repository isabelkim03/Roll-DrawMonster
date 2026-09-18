import React, { useState, useEffect } from 'react';
import { ScreenType, BodyPart, DiceResult, RoundInfo } from './types';
import { ALL_BODY_PARTS } from './data/bodyParts';
import { HeaderBar } from './components/HeaderBar';
import { StartScreen } from './components/StartScreen';
import { DiceScreen } from './components/DiceScreen';
import { DrawingScreen } from './components/DrawingScreen';
import { MonsterReadyScreen } from './components/MonsterReadyScreen';
import { WordMissionScreen } from './components/WordMissionScreen';
import { PictureMissionScreen } from './components/PictureMissionScreen';
import { ResultScreen } from './components/ResultScreen';
import { MonsterGuideModal } from './components/MonsterGuideModal';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('start');
  const [currentRound, setCurrentRound] = useState<number>(1);
  const TOTAL_ROUNDS = 5;

  // Round history (the 5 chosen parts and their counts, plus rerollsUsed)
  const [roundsHistory, setRoundsHistory] = useState<RoundInfo[]>([
    { roundNumber: 1, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 2, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 3, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 4, diceResult: null, rerollsUsed: 0 },
    { roundNumber: 5, diceResult: null, rerollsUsed: 0 },
  ]);

  // Dynamically compute available body parts for a round (excluding parts chosen in other completed rounds)
  const getAvailablePartsForRound = (roundNum: number) => {
    const chosenInOtherRounds = new Set(
      roundsHistory
        .filter(r => r.roundNumber !== roundNum && r.diceResult !== null)
        .map(r => r.diceResult!.bodyPart.id)
    );
    return ALL_BODY_PARTS.filter(p => !chosenInOtherRounds.has(p.id));
  };

  // Current round's dice result
  const [currentDiceResult, setCurrentDiceResult] = useState<DiceResult | null>(null);

  // Canvas image data URL (persisted across all 5 rounds and missions)
  const [monsterCanvasDataUrl, setMonsterCanvasDataUrl] = useState<string | null>(null);

  // Mission state
  const [stars, setStars] = useState<number>(0);
  const [wordMissionTarget, setWordMissionTarget] = useState<BodyPart | null>(null);
  const [wordMissionOptions, setWordMissionOptions] = useState<BodyPart[]>([]);
  const [pictureMissionTarget, setPictureMissionTarget] = useState<BodyPart | null>(null);
  const [pictureMissionOptions, setPictureMissionOptions] = useState<BodyPart[]>([]);

  // Guide Modal
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Initialize or reset game
  const resetGame = () => {
    setScreen('start');
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
    setWordMissionTarget(null);
    setWordMissionOptions([]);
    setPictureMissionTarget(null);
    setPictureMissionOptions([]);
  };

  const startNewGame = () => {
    setScreen('dice');
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
  };

  // Called when dice finish rolling in a round
  const handleDiceRolled = (result: DiceResult, rerollsUsed: number) => {
    setCurrentDiceResult(result);
    // Save to history with rerollsUsed count
    setRoundsHistory(prev =>
      prev.map(r =>
        r.roundNumber === currentRound ? { ...r, diceResult: result, rerollsUsed } : r
      )
    );
  };

  // Move from Dice Screen to Drawing Screen
  const handleGoToDraw = (result?: DiceResult) => {
    if (result) {
      setCurrentDiceResult(result);
      setRoundsHistory(prev =>
        prev.map(r =>
          r.roundNumber === currentRound ? { ...r, diceResult: result } : r
        )
      );
    }
    setScreen('draw');
  };

  // Move to Next Round or Monster Complete
  const handleNextRound = () => {
    if (currentRound < TOTAL_ROUNDS) {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      setCurrentDiceResult(null);
      setScreen('dice');
    } else {
      // All 5 rounds done! Prepare missions
      setupMissions();
      setScreen('ready');
    }
  };

  // Setup Mission 1 (Word Finding) and Mission 2 (Picture Finding)
  const setupMissions = () => {
    // Get the 5 body parts chosen during the 5 rounds
    const chosenParts = roundsHistory
      .map(r => r.diceResult?.bodyPart)
      .filter((p): p is BodyPart => p !== undefined && p !== null);

    // Fallback if needed
    const pool = chosenParts.length >= 2 ? chosenParts : ALL_BODY_PARTS.slice(0, 5);

    // Pick target 1 for Word Mission
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const target1 = shuffled[0];

    // Pick 2 distractors from remaining chosen parts or ALL_BODY_PARTS
    const otherParts1 = ALL_BODY_PARTS.filter(p => p.id !== target1.id);
    const distractors1 = otherParts1.sort(() => 0.5 - Math.random()).slice(0, 2);
    const options1 = [target1, ...distractors1].sort(() => 0.5 - Math.random());

    setWordMissionTarget(target1);
    setWordMissionOptions(options1);

    // Pick target 2 for Picture Mission (different from target 1)
    const target2 = shuffled.find(p => p.id !== target1.id) || otherParts1[0];
    const otherParts2 = ALL_BODY_PARTS.filter(p => p.id !== target2.id);
    const distractors2 = otherParts2.sort(() => 0.5 - Math.random()).slice(0, 2);
    const options2 = [target2, ...distractors2].sort(() => 0.5 - Math.random());

    setPictureMissionTarget(target2);
    setPictureMissionOptions(options2);
  };

  // Centralized [이전으로] navigation logic
  const handleGoBack = () => {
    if (screen === 'dice') {
      if (currentRound === 1) {
        setScreen('start');
      } else {
        // Go back to the previous round's drawing
        const prevRound = currentRound - 1;
        setCurrentRound(prevRound);
        const prevRoundData = roundsHistory.find(r => r.roundNumber === prevRound);
        if (prevRoundData?.diceResult) {
          setCurrentDiceResult(prevRoundData.diceResult);
        }
        setScreen('draw');
      }
    } else if (screen === 'draw') {
      // Go back to this round's dice roll
      setScreen('dice');
    } else if (screen === 'ready') {
      // Go back to round 5 drawing
      setCurrentRound(TOTAL_ROUNDS);
      const r5 = roundsHistory.find(r => r.roundNumber === TOTAL_ROUNDS);
      if (r5?.diceResult) {
        setCurrentDiceResult(r5.diceResult);
      }
      setScreen('draw');
    } else if (screen === 'mission_word') {
      // Go back to monster ready preview
      setScreen('ready');
    } else if (screen === 'mission_picture') {
      // Go back to mission 1
      setStars(prev => Math.max(0, prev - 1));
      setScreen('mission_word');
    } else if (screen === 'result') {
      // Go back to mission 2
      setStars(prev => Math.max(1, prev - 1));
      setScreen('mission_picture');
    }
  };

  // Get the 5 learned body parts for the result screen
  const getLearnedParts = (): BodyPart[] => {
    const parts = roundsHistory
      .map(r => r.diceResult?.bodyPart)
      .filter((p): p is BodyPart => Boolean(p));
    return parts.length > 0 ? parts : ALL_BODY_PARTS.slice(0, 5);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-amber-50/40 via-sky-50/30 to-purple-50/40 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <HeaderBar
        currentRound={
          screen === 'dice' || screen === 'draw' ? currentRound : undefined
        }
        totalRounds={TOTAL_ROUNDS}
        missionNumber={
          screen === 'mission_word'
            ? 1
            : screen === 'mission_picture'
            ? 2
            : undefined
        }
        totalMissions={2}
        stars={
          screen === 'mission_word' ||
          screen === 'mission_picture' ||
          screen === 'result'
            ? stars
            : undefined
        }
        title="Roll & Draw Monster"
        onOpenGuide={() => setIsGuideOpen(true)}
        onBack={screen !== 'start' ? handleGoBack : undefined}
      />

      {/* Main Content View by Screen */}
      <main className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
        {screen === 'start' && (
          <StartScreen
            onStart={startNewGame}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {screen === 'dice' && (
          <DiceScreen
            currentRound={currentRound}
            availableParts={getAvailablePartsForRound(currentRound)}
            existingResult={currentDiceResult}
            initialRerollsUsed={roundsHistory.find(r => r.roundNumber === currentRound)?.rerollsUsed || 0}
            onDiceRolled={handleDiceRolled}
            onGoToDraw={handleGoToDraw}
            onPrev={handleGoBack}
          />
        )}

        {screen === 'draw' && (
          <DrawingScreen
            currentRound={currentRound}
            totalRounds={TOTAL_ROUNDS}
            diceResult={
              currentDiceResult ||
              roundsHistory.find(r => r.roundNumber === currentRound)?.diceResult || {
                bodyPart: ALL_BODY_PARTS[0],
                count: 3,
                resultLabel: '3 Eyes',
                instruction: 'Draw 3 eyes!'
              }
            }
            canvasDataUrl={monsterCanvasDataUrl}
            onCanvasSave={(dataUrl) => setMonsterCanvasDataUrl(dataUrl)}
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

        {screen === 'mission_word' && wordMissionTarget && (
          <WordMissionScreen
            targetPart={wordMissionTarget}
            options={wordMissionOptions}
            stars={stars}
            monsterImageUrl={monsterCanvasDataUrl}
            onMissionSuccess={() => {
              setStars(prev => prev + 1);
              setScreen('mission_picture');
            }}
          />
        )}

        {screen === 'mission_picture' && pictureMissionTarget && (
          <PictureMissionScreen
            targetPart={pictureMissionTarget}
            options={pictureMissionOptions}
            stars={stars}
            monsterImageUrl={monsterCanvasDataUrl}
            onMissionSuccess={() => {
              setStars(prev => prev + 1);
              setScreen('result');
            }}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            monsterImageUrl={monsterCanvasDataUrl}
            stars={stars}
            totalStars={2}
            learnedParts={getLearnedParts()}
            onPlayAgain={startNewGame}
            onGoHome={resetGame}
            onPrev={handleGoBack}
          />
        )}
      </main>

      {/* Word Guide / Dictionary Modal */}
      <MonsterGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
