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
    const room = params.get('room')?.toUpperCase().trim() ?? '';
    if (room) {
      setActiveRoom(room);
      setInput(room);
    }
  }, []);

  function handleJoin() {
    const code = input.trim().toUpperCase();
    if (!code) return;
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
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-brand-yellow rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <span className="text-4xl">🏁</span>
          </div>
          <h1 className="font-poppins font-black text-white text-4xl mb-2">
            Race Dashboard
          </h1>
          <p className="text-gray-500 mb-8 font-body text-sm">
            Open this on the big screen. Enter the room code to watch the live race.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              placeholder="e.g. DELHI-01"
              className="flex-1 bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3 text-white font-poppins font-bold text-lg uppercase placeholder-white/20 focus:outline-none focus:border-brand-blue transition-colors tracking-widest"
              autoFocus
            />
            <button
              onClick={handleJoin}
              disabled={!input.trim()}
              className="bg-brand-blue text-white font-poppins font-bold px-6 py-3 rounded-2xl hover:bg-blue-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Watch
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-6 font-body">
            Or open <span className="text-gray-400">race-of-life.vercel.app/dashboard?room=YOUR-CODE</span>
          </p>
        </div>
      </div>
    );
  }

  return <RaceDashboard roomCode={activeRoom} />;
}
