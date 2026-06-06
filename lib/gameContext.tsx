'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GamePhase, RoleId } from './types';
import { LEVELS, TOTAL_QUESTIONS } from '@/data/questions';

type GameAction =
  | { type: 'START_GAME'; playerName: string; roleId: RoleId }
  | { type: 'ANSWER'; answer: boolean }
  | { type: 'NEXT_AFTER_REFLECTION' }
  | { type: 'START_LEVEL' }
  | { type: 'RESET' };

const initialState: GameState = {
  playerName: '',
  roleId: 'orphan',
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  yesCount: 0,
  totalQuestions: TOTAL_QUESTIONS,
  answers: [],
  phase: 'join',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        playerName: action.playerName,
        roleId: action.roleId,
        phase: 'level-intro',
      };

    case 'START_LEVEL':
      return { ...state, phase: 'question', currentQuestionIndex: 0 };

    case 'ANSWER': {
      const currentLevel = LEVELS[state.currentLevelIndex];
      const newYesCount = state.yesCount + (action.answer ? 1 : 0);
      const newAnswers = [
        ...state.answers,
        {
          questionId: currentLevel.questions[state.currentQuestionIndex].id,
          answer: action.answer,
        },
      ];
      const isLastQuestion =
        state.currentQuestionIndex >= currentLevel.questions.length - 1;
      const isLastLevel = state.currentLevelIndex >= LEVELS.length - 1;

      if (isLastQuestion && isLastLevel) {
        return { ...state, yesCount: newYesCount, answers: newAnswers, phase: 'finished' };
      }
      if (isLastQuestion) {
        return { ...state, yesCount: newYesCount, answers: newAnswers, phase: 'reflection' };
      }
      return {
        ...state,
        yesCount: newYesCount,
        answers: newAnswers,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }

    case 'NEXT_AFTER_REFLECTION':
      return {
        ...state,
        currentLevelIndex: state.currentLevelIndex + 1,
        currentQuestionIndex: 0,
        phase: 'level-intro',
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
