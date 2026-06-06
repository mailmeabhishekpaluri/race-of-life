'use client';

import { useState } from 'react';
import { ROLES } from '@/data/questions';
import { RoleId } from '@/lib/types';
import { useGame } from '@/lib/gameContext';
import RoleCard from './RoleCard';

export default function JoinScreen() {
  const { dispatch } = useGame();
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [showObserver, setShowObserver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const childRoles = ROLES.filter(r => !r.isObserver);
  const observerRoles = ROLES.filter(r => r.isObserver);
  const canStart = name.trim().length > 0 && selectedRole !== null && roomCode.length === 6 && !loading;

  async function handleStart() {
    if (!canStart || !selectedRole) return;
    setLoading(true);
    setError('');

    const role = ROLES.find(r => r.id === selectedRole)!;
    const code = roomCode.trim();

    try {
      const res = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_code: code,
          player_name: name.trim(),
          role_id: selectedRole,
          role_label: role.label,
          role_emoji: role.emoji,
        }),
      });
      if (!res.ok) throw new Error('Failed to join');
      const { id } = await res.json();
      dispatch({
        type: 'START_GAME',
        playerName: name.trim(),
        roleId: selectedRole,
        playerId: id,
        roomCode: code,
      });
    } catch {
      setError('Could not connect. Please check your connection and try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue to-blue-700 flex flex-col">
      <div className="flex-1 flex flex-col px-4 py-8 max-w-lg mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-brand-yellow rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🏁</span>
          </div>
          <h1 className="font-poppins font-extrabold text-white text-4xl leading-tight">
            Race of Life
          </h1>
          <p className="text-blue-100 mt-2 text-sm font-body">
            HUManity Foundation Volunteer Induction
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl space-y-6">
          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2 text-sm">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-body focus:outline-none focus:border-brand-blue transition-colors text-base"
            />
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-2 text-sm">
              6-Digit Room Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="e.g. 482935"
              maxLength={6}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-body focus:outline-none focus:border-brand-blue transition-colors text-base font-poppins font-bold tracking-[0.3em] text-center"
            />
            <p className="text-xs text-gray-400 mt-1 font-body text-center">Get this code from your facilitator</p>
          </div>

          <div>
            <label className="block font-poppins font-semibold text-gray-700 mb-3 text-sm">
              Choose Your Role
            </label>
            <div className="space-y-2">
              {childRoles.map(role => (
                <RoleCard
                  key={role.id}
                  role={role}
                  selected={selectedRole === role.id}
                  onSelect={() => setSelectedRole(role.id)}
                />
              ))}
            </div>

            <button
              onClick={() => setShowObserver(v => !v)}
              className="mt-4 text-xs text-brand-blue font-semibold underline"
            >
              {showObserver ? 'Hide observer roles' : 'Show observer roles'}
            </button>

            {showObserver && (
              <div className="mt-2 space-y-2">
                {observerRoles.map(role => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    selected={selectedRole === role.id}
                    onSelect={() => setSelectedRole(role.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm font-body text-center">{error}</p>
          )}

          <button
            onClick={handleStart}
            disabled={!canStart}
            className={`
              w-full py-4 rounded-2xl font-poppins font-bold text-lg transition-all duration-200
              ${canStart
                ? 'bg-brand-yellow text-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {loading ? 'Joining race...' : 'Start the Race'}
          </button>
        </div>

        <p className="text-center text-blue-200 text-xs mt-6 font-body">
          Answer honestly. The results will surprise you.
        </p>
      </div>
    </div>
  );
}
