export function Spinner() {
  return (
    <div className="relative w-24 h-24">
      {/* Outer spinning circle */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#16A34A] border-r-[#65A30D] animate-spin"></div>
      
      {/* Inner pulsing circle */}
      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#16A34A] to-[#65A30D] opacity-20 animate-pulse"></div>
    </div>
  );
}
