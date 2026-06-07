export type RoleId =
  | 'privileged-child'
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

// Server-driven phases
export type GamePhase =
  | 'join'        // not yet registered
  | 'waiting'     // registered, room not started yet
  | 'question'    // active question to answer
  | 'answered'    // answered this question, waiting for facilitator
  | 'paused'      // facilitator paused for level discussion
  | 'finished';   // all done

export interface GameState {
  // Player identity
  playerName: string;
  roleId: RoleId;
  roomCode: string;
  playerId: number | null;

  // Local phase
  phase: GamePhase;

  // Server-synced room state
  serverQuestionIndex: number;   // current_question_index from room (-1 = not started)
  serverStatus: string;          // room status string

  // Player progress
  lastAnsweredIndex: number;     // last question this player answered (-1 = none)
  yesCount: number;
  totalQuestions: number;
}
