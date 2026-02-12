interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md px-8">
      {/* Progress bar container */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        
        {/* Progress fill */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#16A34A] to-[#65A30D] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
        </div>
      </div>
      
      {/* Percentage text */}
      <div className="text-center mt-4">
        <span className="text-2xl font-bold bg-gradient-to-r from-[#16A34A] to-[#65A30D] bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
    </div>
  );
}
