export type RoleId =
  | 'orphan'
  | 'semi-orphan'
  | 'abandoned-child'
  | 'child-in-need'
  | 'child-welfare-authority'
  | 'organization'
  | 'police-officer'
  | 'society';

export interface Role {
  id: RoleId;
  label: string;
  description: string;
  emoji: string;
  isObserver: boolean;
}

export interface Question {
  id: string;
  text: string;
}

export interface Level {
  id: number;
  name: string;
  program: string;
  tagline: string;
  unlockMessage: string;
  reflection: string;
  questions: Question[];
}

export type GamePhase =
  | 'join'
  | 'level-intro'
  | 'question'
  | 'reflection'
  | 'finished';

export interface GameState {
  playerName: string;
  roleId: RoleId;
  currentLevelIndex: number;
  currentQuestionIndex: number;
  yesCount: number;
  totalQuestions: number;
  answers: Array<{ questionId: string; answer: boolean }>;
  phase: GamePhase;
}
