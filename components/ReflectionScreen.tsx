'use client';

import { useGame } from '@/lib/gameContext';
import { LEVELS } from '@/data/questions';

export default function ReflectionScreen() {
  const { state, dispatch } = useGame();
  const level = LEVELS[state.currentLevelIndex];
  const nextLevel = LEVELS[state.currentLevelIndex + 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-brand-blue rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
          <span className="text-4xl">💭</span>
        </div>

        <p className="font-body text-blue-300 font-semibold text-xs uppercase tracking-widest mb-3">
          Pause and Reflect
        </p>

        <h2 className="font-poppins font-bold text-white text-2xl mb-6 leading-tight">
          {level.name} Complete
        </h2>

        <div className="bg-white/10 rounded-2xl p-6 mb-8 text-left border border-white/20">
          <p className="font-body text-gray-200 text-base leading-relaxed">
            {level.reflection}
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'NEXT_AFTER_REFLECTION' })}
          className="w-full py-4 rounded-2xl bg-brand-yellow text-gray-900 font-poppins font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Continue to {nextLevel?.name ?? 'Finish'}
        </button>
      </div>
    </div>
  );
}
