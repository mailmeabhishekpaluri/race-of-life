'use client';

import { useEffect, useState, useCallback } from 'react';
import { ALL_QUESTIONS, LEVELS } from '@/data/questions';

interface Player {
  id: number;
  player_name: string;
  role_id: string;
  role_label: string;
  role_emoji: string;
  yes_count: number;
  total_questions: number;
  last_answered_index: number;
  phase: string;
  finished: boolean;
  updated_at: string;
}

interface Room {
  room_code: string;
  current_question_index: number;
  status: string;
}

interface RaceDashboardProps {
  roomCode: string;
}

const LEVEL_END_INDICES = [4, 9, 14, 19];

export default function RaceDashboard({ roomCode }: RaceDashboardProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isLive, setIsLive] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/rooms/${roomCode}`, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setRoom(data.room);
      setPlayers(data.players ?? []);
      setAnsweredCount(data.answeredCount ?? 0);
      setIsLive(true);
    } catch {
      setIsLive(false);
    }
  }, [roomCode]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [fetchData]);

  async function updateRoom(newIndex: number, newStatus: string) {
    await fetch(`/api/rooms/${roomCode}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_question_index: newIndex, status: newStatus }),
    });
    fetchData();
  }

  const currentIndex = room?.current_question_index ?? -1;
  const status = room?.status ?? 'waiting';
  const levelIndex = currentIndex >= 0 ? Math.floor(currentIndex / 5) : 0;
  const currentLevel = LEVELS[levelIndex];
  const currentQuestion = currentIndex >= 0 ? ALL_QUESTIONS[currentIndex] : null;
  const isLevelEnd = LEVEL_END_INDICES.includes(currentIndex);
  const isLastQuestion = currentIndex === 24;
  const totalPlayers = players.length;

  return (
    <div className="min-h-screen bg-[#050d1a] text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-2xl">🏁</span>
          </div>
          <div>
            <h1 className="font-poppins font-black text-2xl text-white leading-none tracking-tight">
              RACE OF LIFE
            </h1>
            <p className="text-blue-400 text-xs font-body mt-0.5">Facilitator Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Room Code</div>
            <div className="font-poppins font-black text-brand-yellow text-3xl tracking-[0.3em]">{roomCode}</div>
            <div className="text-gray-600 text-xs mt-0.5 font-body">race-of-life.vercel.app</div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-gray-400 text-xs">{isLive ? 'LIVE' : 'Connecting...'}</span>
            </div>
            <div className="text-gray-500 text-xs">
              {totalPlayers} player{totalPlayers !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Facilitator Controls */}
      <div className="px-4 md:px-6 py-4 border-b border-white/10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
          {/* Current question info */}
          {status !== 'waiting' && status !== 'finished' && currentQuestion && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-brand-yellow text-gray-900 text-xs font-poppins font-bold px-3 py-1 rounded-full">
                  Q{currentIndex + 1} of 25
                </span>
                <span className="text-gray-400 text-xs font-body">
                  Level {levelIndex + 1}: {currentLevel?.name}
                </span>
                {status === 'active' && (
                  <span className="ml-auto text-sm font-body">
                    <span className="text-green-400 font-bold">{answeredCount}</span>
                    <span className="text-gray-500">/{totalPlayers} answered</span>
                  </span>
                )}
              </div>
              <p className="text-white font-poppins font-semibold text-base leading-snug">
                {currentQuestion.text}
              </p>
            </div>
          )}

          {/* Reflection text when paused */}
          {status === 'paused' && currentLevel && (
            <div className="mb-4 bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl p-4">
              <p className="text-gray-300 font-body text-sm leading-relaxed italic">
                {currentLevel.reflection}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {status === 'waiting' && (
              <button
                onClick={() => updateRoom(0, 'active')}
                className="bg-brand-blue text-white font-poppins font-bold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors text-base"
              >
                ▶ Start Race
              </button>
            )}
            {status === 'active' && !isLevelEnd && !isLastQuestion && (
              <button
                onClick={() => updateRoom(currentIndex + 1, 'active')}
                className="bg-brand-blue text-white font-poppins font-bold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors text-base"
              >
                Next Question →
              </button>
            )}
            {status === 'active' && isLevelEnd && (
              <button
                onClick={() => updateRoom(currentIndex, 'paused')}
                className="bg-brand-yellow text-gray-900 font-poppins font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-base"
              >
                ⏸ Pause for Discussion
              </button>
            )}
            {status === 'active' && isLastQuestion && (
              <button
                onClick={() => updateRoom(currentIndex, 'finished')}
                className="bg-brand-yellow text-gray-900 font-poppins font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-base"
              >
                🏁 End Race
              </button>
            )}
            {status === 'paused' && (
              <button
                onClick={() => updateRoom(currentIndex + 1, 'active')}
                className="bg-brand-blue text-white font-poppins font-bold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors text-base"
              >
                ▶ Start Level {levelIndex + 2}
              </button>
            )}
            {status === 'finished' && (
              <div className="font-poppins font-bold text-brand-yellow text-lg">
                🎉 Race Complete!
              </div>
            )}
          </div>

          {status === 'waiting' && (
            <p className="text-gray-500 text-xs font-body mt-3">
              {totalPlayers === 0
                ? 'Waiting for volunteers to join with the room code...'
                : `${totalPlayers} volunteer${totalPlayers !== 1 ? 's' : ''} joined. Start when ready.`}
            </p>
          )}
        </div>
      </div>

      {/* Race lanes */}
      <div className="flex-1 p-4 md:p-6 space-y-3 overflow-y-auto">
        {players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-6 opacity-50">⏳</div>
            <p className="font-poppins font-bold text-white text-2xl mb-3">Waiting for players...</p>
            <p className="text-gray-500 text-sm font-body max-w-sm">
              Share room code{' '}
              <span className="text-brand-yellow font-poppins font-bold">{roomCode}</span>{' '}
              with volunteers
            </p>
          </div>
        ) : (
          players.map((player, index) => (
            <PlayerLane
              key={player.id}
              player={player}
              rank={index + 1}
              currentQuestionIndex={currentIndex}
              status={status}
            />
          ))
        )}
      </div>

      {players.length > 0 && (
        <div className="px-6 py-2 border-t border-white/5 text-xs text-gray-600 flex justify-between">
          <span>Updates every 2 seconds</span>
          <span>race-of-life.vercel.app/dashboard</span>
        </div>
      )}
    </div>
  );
}

function PlayerLane({
  player,
  rank,
  currentQuestionIndex,
  status,
}: {
  player: Player;
  rank: number;
  currentQuestionIndex: number;
  status: string;
}) {
  const pct = (player.yes_count / player.total_questions) * 100;
  const isLeader = rank === 1 && !player.finished;
  const hasAnswered =
    status === 'active' &&
    currentQuestionIndex >= 0 &&
    player.last_answered_index >= currentQuestionIndex;

  return (
    <div
      className={`
        relative rounded-2xl p-4 md:p-5 border transition-all duration-500
        ${player.finished
          ? 'bg-brand-yellow/10 border-brand-yellow/30 finish-glow'
          : isLeader
            ? 'bg-brand-blue/10 border-brand-blue/30 leader-glow'
            : 'bg-white/5 border-white/10'
        }
      `}
    >
      <div className="flex items-center gap-3 md:gap-4 mb-3">
        {/* Rank badge */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            font-poppins font-black text-base flex-shrink-0
            ${player.finished ? 'bg-brand-yellow text-gray-900' : isLeader ? 'bg-brand-blue text-white' : 'bg-white/10 text-gray-400'}
          `}
        >
          {player.finished ? '✓' : `#${rank}`}
        </div>

        {/* Player info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl leading-none">{player.role_emoji}</span>
            <span className="font-poppins font-bold text-white text-base md:text-lg truncate">
              {player.player_name}
            </span>
            {isLeader && <span className="text-brand-yellow text-base flex-shrink-0">🏆</span>}
            {player.finished && (
              <span className="bg-brand-yellow text-gray-900 text-xs font-poppins font-black px-2.5 py-0.5 rounded-full flex-shrink-0">
                FINISHED!
              </span>
            )}
            {/* Answered status badge */}
            {!player.finished && status === 'active' && currentQuestionIndex >= 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-body flex-shrink-0 ${
                  hasAnswered
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-white/10 text-gray-500'
                }`}
              >
                {hasAnswered ? '✓ answered' : '⏳ waiting'}
              </span>
            )}
          </div>
          <div className="text-gray-500 text-xs font-body mt-0.5">{player.role_label}</div>
        </div>

        {/* Score */}
        <div className="text-right flex-shrink-0">
          <div className="font-poppins font-black text-xl md:text-2xl text-white">
            {player.yes_count}
            <span className="text-gray-600 text-sm">/{player.total_questions}</span>
          </div>
          <div className="text-xs text-gray-500 font-body">{Math.round(pct)}%</div>
        </div>
      </div>

      {/* Race track */}
      <div className="relative h-10 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <div className="absolute inset-0 track-lines" />
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-[1500ms] ease-out
            ${player.finished ? 'bg-gradient-to-r from-brand-yellow to-yellow-300' : 'bg-gradient-to-r from-brand-blue to-blue-300'}`}
          style={{ width: `${Math.max(pct, 0.5)}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 text-xl select-none transition-all duration-[1500ms] ease-out"
          style={{ left: `calc(${Math.max(pct, 3)}% - 14px)` }}
        >
          {player.role_emoji}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-base select-none opacity-60">
          🏁
        </div>
      </div>
    </div>
  );
}
