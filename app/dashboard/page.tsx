'use client';

import { useState, useEffect } from 'react';
import RaceDashboard from '@/components/RaceDashboard';

export default function DashboardPage() {
  const [activeRoom, setActiveRoom] = useState('');
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room')?.replace(/\D/g, '').slice(0, 6) ?? '';
    if (room) {
      setActiveRoom(room);
      setInput(room);
    }
  }, []);

  function handleJoin() {
    const code = input.trim();
    if (code.length !== 6) return;
    setActiveRoom(code);
    window.history.replaceState({}, '', `/dashboard?room=${code}`);
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050d1a] flex items-center justify-center">
        <div className="text-white font-poppins text-xl">Loading...</div>
      </div>
    );
  }

  if (!activeRoom) {
    return (
      <div className="min-h-screen bg-[#050d1a] flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-brand-yellow rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <span className="text-4xl">🏁</span>
          </div>
          <h1 className="font-poppins font-black text-white text-3xl mb-2">
            Start a Race Session
          </h1>
          <p className="text-gray-500 mb-8 font-body text-sm leading-relaxed">
            Choose a 6-digit code and share it with your volunteers to join the race.
          </p>

          <div className="mb-4">
            <input
              type="text"
              inputMode="numeric"
              value={input}
              onChange={e => setInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyDown={e => e.key === 'Enter' && input.length === 6 && handleJoin()}
              placeholder="e.g. 482935"
              maxLength={6}
              className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-4 text-white font-poppins font-black text-3xl text-center tracking-[0.4em] placeholder-white/20 focus:outline-none focus:border-brand-blue transition-colors"
              autoFocus
            />
            <p className="text-gray-600 text-xs mt-2 font-body">
              {input.length}/6 digits
            </p>
          </div>

          <button
            onClick={handleJoin}
            disabled={input.length !== 6}
            className="w-full bg-brand-blue text-white font-poppins font-bold py-4 rounded-2xl hover:bg-blue-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg"
          >
            Start Room
          </button>

          <p className="text-gray-700 text-xs mt-6 font-body">
            Volunteers go to race-of-life.vercel.app and enter this code
          </p>
        </div>
      </div>
    );
  }

  return <RaceDashboard roomCode={activeRoom} />;
}
