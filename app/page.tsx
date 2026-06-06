'use client';

import { GameProvider, useGame } from '@/lib/gameContext';
import JoinScreen from '@/components/JoinScreen';
import LevelIntroScreen from '@/components/LevelIntroScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ReflectionScreen from '@/components/ReflectionScreen';
import FinishScreen from '@/components/FinishScreen';

function GameOrchestrator() {
  const { state } = useGame();

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
