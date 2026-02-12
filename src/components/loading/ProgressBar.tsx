interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md px-8">
      {/* Progress bar container */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Animated background */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ background: 'linear-gradient(to right, #E5E7EB, #D1D5DB, #E5E7EB)' }}
        ></div>
        
        {/* Progress fill */}
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(to right, #16A34A, #65A30D)'
          }}
        >
          {/* Shine effect */}
          <div 
            className="absolute inset-0 opacity-30 animate-shimmer"
            style={{ background: 'linear-gradient(to right, transparent, white, transparent)' }}
          ></div>
        </div>
      </div>
      
      {/* Percentage text */}
      <div className="text-center mt-4">
        <span 
          className="text-2xl font-bold bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(to right, #16A34A, #65A30D)' }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}