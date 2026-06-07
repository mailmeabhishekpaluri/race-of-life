import { Role } from '@/lib/types';

interface RoleCardProps {
  role: Role;
  selected: boolean;
  onSelect: () => void;
}

export default function RoleCard({ role, selected, onSelect }: RoleCardProps) {
  const isPrivileged = role.id === 'privileged-child';

  return (
    <div className="relative">
      {isPrivileged && (
        <span className="absolute -top-2 -right-2 z-10 bg-brand-yellow text-gray-900 text-xs font-poppins font-black px-2 py-0.5 rounded-full">
          Required
        </span>
      )}
      <button
        onClick={onSelect}
        className={`
          w-full text-left p-4 rounded-2xl border-2 transition-all duration-200
          ${
            selected
              ? 'border-brand-blue bg-blue-50 shadow-md scale-[1.02]'
              : isPrivileged
                ? 'border-brand-yellow/40 bg-yellow-50/50 hover:border-brand-yellow/70'
                : 'border-gray-200 bg-white hover:border-brand-blue/50'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{role.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-poppins font-semibold text-gray-800 text-sm">{role.label}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-body truncate">{role.description}</p>
            {isPrivileged && (
              <p className="text-xs text-amber-600 font-body mt-1 font-semibold">Required for game to start</p>
            )}
          </div>
          {selected && (
            <span className="ml-auto text-brand-blue font-bold text-lg flex-shrink-0">✓</span>
          )}
        </div>
      </button>
    </div>
  );
}
