interface RaceTrackProps {
  totalSteps: number;
  currentStep: number;
  emoji: string;
  justAnsweredYes?: boolean;
}

export default function RaceTrack({
  totalSteps,
  currentStep,
  emoji,
  justAnsweredYes,
}: RaceTrackProps) {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const avatarLeft = `calc(${Math.max(percentage, 5)}% - 18px)`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-body">Start</span>
        <span className="text-xs text-gray-500 font-body">Finish 🏁</span>
      </div>

      <div className="relative w-full h-14 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-blue to-blue-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.max(percentage, 2)}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 text-2xl transition-all duration-700 ease-out select-none ${
            justAnsweredYes ? 'scale-125' : 'scale-100'
          }`}
          style={{ left: avatarLeft }}
        >
          {emoji}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-body text-gray-600">
          {currentStep} step{currentStep !== 1 ? 's' : ''} forward
        </span>
        <span className="text-xs font-body text-brand-blue font-semibold">
          {Math.round(percentage)}% of the race
        </span>
      </div>
    </div>
  );
}
