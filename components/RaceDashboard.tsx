'use client';

import { useEffect, useState } from 'react';
import { LEVELS } from '@/data/questions';

interface Player {
  id: number;
  player_name: string;
  role_id: string;
  role_label: string;
  role_emoji: string;
  yes_count: number;
  total_questions: number;
  current_level_index: number;
  phase: string;
  finished: boolean;
  updated_at: string;
}

interface RaceDashboardProps {
  roomCode: string;
}

export default function RaceDashboard({ roomCode }: RaceDashboardProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlayers() {
      try {
        const res = await fetch(`/api/race/${roomCode}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setPlayers(data.players);
          setIsLive(true);
        }
      } catch {
        if (!cancelled) setIsLive(false);
      }
    }

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 2000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [roomCode]);

  const finishedCount = players.filter(p => p.finished).length;
  const activeCount = players.filter(p => !p.finished).length;
  const allFinished = players.length > 0 && finishedCount === players.length;

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
            <p className="text-blue-400 text-xs font-body mt-0.5">HUManity Foundation</p>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <div className="font-poppins font-black text-brand-yellow text-2xl tracking-widest">
              {roomCode}
            </div>
            <div className="text-gray-500 text-xs uppercase tracking-widest">Room Code</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}
              />
              <span className="text-gray-400 text-xs">
                {isLive ? 'LIVE' : 'Connecting...'}
              </span>
            </div>
            <div className="text-gray-500 text-xs">
              {players.length} player{players.length !== 1 ? 's' : ''}
              {activeCount > 0 && ` • ${activeCount} racing`}
              {finishedCount > 0 && ` • ${finishedCount} finished`}
            </div>
          </div>
        </div>
      </div>

      {/* Race lanes */}
      <div className="flex-1 p-4 md:p-6 space-y-3 overflow-y-auto">
        {players.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-6 opacity-50">⏳</div>
            <p className="font-poppins font-bold text-white text-2xl mb-3">
              Waiting for players...
            </p>
            <p className="text-gray-500 text-sm font-body max-w-sm">
              Players who join with room code{' '}
              <span className="text-brand-yellow font-poppins font-bold">{roomCode}</span>{' '}
              will appear here as they start playing
            </p>
          </div>
        ) : (
          players.map((player, index) => (
            <PlayerLane key={player.id} player={player} rank={index + 1} />
          ))
        )}
      </div>

      {/* All finished celebration */}
      {allFinished && (
        <div className="px-6 py-4 bg-brand-yellow/20 border-t border-brand-yellow/30 text-center">
          <p className="font-poppins font-bold text-brand-yellow text-lg">
            🎉 All players have finished the race!
          </p>
        </div>
      )}

      {/* Footer */}
      {players.length > 0 && (
        <div className="px-6 py-2 border-t border-white/5 text-xs text-gray-600 flex justify-between">
          <span>Updates every 2 seconds</span>
          <span>race-of-life.vercel.app</span>
        </div>
      )}
    </div>
  );
}

function PlayerLane({ player, rank }: { player: Player; rank: number }) {
  const pct = (player.yes_count / player.total_questions) * 100;
  const isLeader = rank === 1 && !player.finished;
  const levelName = LEVELS[player.current_level_index]?.name ?? 'Complete';

  // Check if recently active (updated within last 4 seconds)
  const isRecentlyActive =
    !player.finished &&
    Date.now() - new Date(player.updated_at).getTime() < 4000;

  return (
    <div
      className={`
        relative rounded-2xl p-4 md:p-5 border transition-all duration-500
        ${player.finished
          ? 'bg-brand-yellow/10 border-brand-yellow/30 finish-glow'
          : isLeader
            ? 'bg-brand-blue/10 border-brand-blue/30 leader-glow'
            : 'bg-white/5 border-white/10 hover:border-white/20'
        }
      `}
    >
      <div className="flex items-center gap-3 md:gap-4 mb-3">
        {/* Rank badge */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            font-poppins font-black text-base flex-shrink-0
            ${player.finished
              ? 'bg-brand-yellow text-gray-900'
              : isLeader
                ? 'bg-brand-blue text-white'
                : 'bg-white/10 text-gray-400'
            }
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
            {isLeader && (
              <span className="text-brand-yellow text-base flex-shrink-0">🏆</span>
            )}
            {player.finished && (
              <span className="bg-brand-yellow text-gray-900 text-xs font-poppins font-black px-2.5 py-0.5 rounded-full flex-shrink-0">
                FINISHED!
              </span>
            )}
            {isRecentlyActive && !player.finished && (
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" title="Just answered" />
            )}
          </div>
          <div className="text-gray-500 text-xs font-body mt-0.5">
            {player.role_label}
            {!player.finished && (
              <span className="text-gray-600"> • {levelName}</span>
            )}
          </div>
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
        {/* Moving track lines */}
        <div className="absolute inset-0 track-lines" />

        {/* Progress fill */}
        <div
          className={`
            absolute left-0 top-0 h-full rounded-full
            transition-all duration-[1500ms] ease-out
            ${player.finished
              ? 'bg-gradient-to-r from-brand-yellow to-yellow-300'
              : 'bg-gradient-to-r from-brand-blue to-blue-300'
            }
          `}
          style={{ width: `${Math.max(pct, 0.5)}%` }}
        />

        {/* Avatar emoji on track */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 text-xl select-none
            transition-all duration-[1500ms] ease-out
            ${isRecentlyActive ? 'scale-125' : 'scale-100'}
          `}
          style={{ left: `calc(${Math.max(pct, 3)}% - 14px)` }}
        >
          {player.role_emoji}
        </div>

        {/* Finish line flag */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-base select-none opacity-60">
          🏁
        </div>
      </div>
    </div>
  );
}
