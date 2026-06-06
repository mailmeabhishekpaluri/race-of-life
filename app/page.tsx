'use client';

import { useEffect } from 'react';
import { GameProvider, useGame } from '@/lib/gameContext';
import JoinScreen from '@/components/JoinScreen';
import LevelIntroScreen from '@/components/LevelIntroScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ReflectionScreen from '@/components/ReflectionScreen';
import FinishScreen from '@/components/FinishScreen';

function GameOrchestrator() {
  const { state } = useGame();

  // Sync game state to DB after every meaningful change
  useEffect(() => {
    if (!state.playerId || state.phase === 'join') return;
    fetch(`/api/players/${state.playerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        yes_count: state.yesCount,
        current_level_index: state.currentLevelIndex,
        phase: state.phase,
        finished: state.phase === 'finished',
      }),
    }).catch(() => {}); // fire and forget
  }, [state.yesCount, state.phase, state.currentLevelIndex, state.playerId]);

  switch (state.phase) {
    case 'join':
      return <JoinScreen />;
    case 'level-intro':
      return <LevelIntroScreen />;
    case 'question':
      return <QuestionScreen />;
    case 'reflection':
      return <ReflectionScreen />;
    case 'finished':
      return <FinishScreen />;
    default:
      return <JoinScreen />;
  }
}

export default function Home() {
  return (
    <GameProvider>
      <GameOrchestrator />
    </GameProvider>
  );
}
