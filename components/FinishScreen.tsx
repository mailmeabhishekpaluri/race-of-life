'use client';

import { useGame } from '@/lib/gameContext';
import { ROLES } from '@/data/questions';

function getFinishMessage(
  yesCount: number,
  total: number
): { headline: string; body: string } {
  const pct = yesCount / total;
  if (pct >= 0.8) {
    return {
      headline: 'You had most of it.',
      body: 'You grew up with significant access. Many children in care institutions answer "yes" to very few of these questions. Your access shaped your potential and they deserve the same chance.',
    };
  }
  if (pct >= 0.5) {
    return {
      headline: 'You had some of it.',
      body: 'Access was mixed for you. Now imagine every single "no" stacking up. That is the daily reality for children in care. HUManity exists to close this gap, one child at a time.',
    };
  }
  return {
    headline: 'You had very little.',
    body: 'You answered "no" to most of these. You have just experienced, in a small way, what it feels like to be left behind. This is why HUManity Foundation exists: because every child deserves a fair start.',
  };
}

export default function FinishScreen() {
  const { state, dispatch } = useGame();
  const role = ROLES.find(r => r.id === state.roleId)!;
  const { headline, body } = getFinishMessage(state.yesCount, state.totalQuestions);
  const percentage = Math.round((state.yesCount / state.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue to-blue-900 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-4">🏁</div>

        <p className="font-body text-blue-200 font-semibold text-xs uppercase tracking-widest mb-2">
          Race Complete
        </p>

        <h2 className="font-poppins font-bold text-white text-3xl mb-1">
          {state.playerName}
        </h2>
        <p className="text-blue-300 font-body text-sm mb-8">
          Playing as: {role.emoji} {role.label}
        </p>

        <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
          <div className="text-5xl font-poppins font-black text-brand-blue mb-1">
            {state.yesCount}/{state.totalQuestions}
          </div>
          <div className="text-gray-400 font-body text-sm mb-5">steps forward</div>

          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-gradient-to-r from-brand-blue to-brand-yellow rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <h3 className="font-poppins font-bold text-gray-800 text-xl mb-3">{headline}</h3>
          <p className="font-body text-gray-600 text-sm leading-relaxed">{body}</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 mb-8 border border-white/20 text-left">
          <p className="font-poppins font-semibold text-white text-sm mb-1">
            HUManity Foundation
          </p>
          <p className="font-body text-blue-200 text-xs leading-relaxed">
            We work across 5 programs: Education Development, Social-Emotional Learning, Digital Literacy and AI, Health and Nutrition, and Project Library to give children in care institutions access to everything they deserve.
          </p>
        </div>

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="w-full py-4 rounded-2xl bg-brand-yellow text-gray-900 font-poppins font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
