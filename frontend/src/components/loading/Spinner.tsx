export function Spinner() {
  return (
    <div className="relative w-24 h-24">
      {/* Outer spinning circle */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-600 border-r-lime-600 animate-spin"></div>
      
      {/* Inner pulsing circle */}
      <div 
        className="absolute inset-3 rounded-full opacity-20 animate-pulse"
        style={{ background: 'linear-gradient(to bottom right, #16A34A, #65A30D)' }}
      ></div>
    </div>
  );
}