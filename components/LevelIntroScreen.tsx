'use client';

import { useGame } from '@/lib/gameContext';
import { LEVELS } from '@/data/questions';

const LEVEL_ICONS = ['📚', '💛', '💻', '🥗', '📖'];

export default function LevelIntroScreen() {
  const { state, dispatch } = useGame();
  const level = LEVELS[state.currentLevelIndex];
  const icon = LEVEL_ICONS[state.currentLevelIndex] ?? '🌟';

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-yellow to-yellow-400 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
          <span className="text-5xl">{icon}</span>
        </div>

        <p className="font-body text-yellow-800 font-semibold text-xs uppercase tracking-widest mb-2">
          {level.program}
        </p>

        <h2 className="font-poppins font-bold text-gray-900 text-3xl leading-tight mb-4">
          {level.name}
        </h2>

        <p className="font-body text-gray-700 text-base mb-6 leading-relaxed italic">
          {level.tagline}
        </p>

        <div className="bg-white/80 rounded-2xl p-5 mb-8 text-left">
          <p className="font-body text-gray-700 text-sm leading-relaxed">
            {level.unlockMessage}
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'START_LEVEL' })}
          className="w-full py-4 rounded-2xl bg-brand-blue text-white font-poppins font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Begin Level {level.id}
        </button>
      </div>
    </div>
  );
}
