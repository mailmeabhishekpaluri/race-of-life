'use client';

import { useState } from 'react';
import { useGame } from '@/lib/gameContext';
import { LEVELS, ROLES } from '@/data/questions';
import RaceTrack from './RaceTrack';

export default function QuestionScreen() {
  const { state, dispatch } = useGame();
  const [justAnsweredYes, setJustAnsweredYes] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentLevel = LEVELS[state.currentLevelIndex];
  const currentQuestion = currentLevel.questions[state.currentQuestionIndex];
  const role = ROLES.find(r => r.id === state.roleId)!;
  const questionNumber = state.answers.length + 1;

  function handleAnswer(answer: boolean) {
    if (animating) return;
    setAnimating(true);
    if (answer) setJustAnsweredYes(true);

    setTimeout(() => {
      dispatch({ type: 'ANSWER', answer });
      setJustAnsweredYes(false);
      setAnimating(false);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-brand-blue px-4 py-3 shadow-md">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="font-poppins font-semibold text-white text-sm">
            {role.emoji} {state.playerName}
          </span>
          <span className="text-blue-200 text-xs font-body">
            {currentLevel.program}: {currentLevel.name}
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full flex flex-col gap-5">
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <RaceTrack
            totalSteps={state.totalQuestions}
            currentStep={state.yesCount}
            emoji={role.emoji}
            justAnsweredYes={justAnsweredYes}
          />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-brand-yellow text-gray-900 text-xs font-poppins font-bold px-3 py-1 rounded-full">
                Q{questionNumber} of {state.totalQuestions}
              </span>
              <span className="text-xs text-gray-400 font-body">{currentLevel.name}</span>
            </div>

            <p className="font-poppins font-semibold text-gray-800 text-xl leading-relaxed">
              {currentQuestion.text}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => handleAnswer(false)}
              disabled={animating}
              className="py-5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-600 font-poppins font-bold text-2xl hover:bg-red-100 active:scale-95 transition-all disabled:opacity-50"
            >
              NO
            </button>
            <button
              onClick={() => handleAnswer(true)}
              disabled={animating}
              className="py-5 rounded-2xl bg-green-50 border-2 border-green-200 text-green-600 font-poppins font-bold text-2xl hover:bg-green-100 active:scale-95 transition-all disabled:opacity-50"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
