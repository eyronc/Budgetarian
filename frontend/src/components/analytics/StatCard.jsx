import { useDarkMode } from '../../contexts/DarkModeContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ icon: Icon, label, value, sub, gradient, change, changeLabel }) {
  const { darkMode } = useDarkMode();
  const positive = change >= 0;

  return (
    <div className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 border shadow-lg overflow-hidden ${
      darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
    }`}>
      <div className={`absolute -top-8 -right-8 w-28 h-28 bg-linear-to-br ${gradient} opacity-10 rounded-full blur-2xl`} />
      <div className={`w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br ${gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-3`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div className={`text-2xl sm:text-3xl font-black leading-none mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        {value}
      </div>
      <div className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        {label}
      </div>
      {change !== undefined && (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${
          positive
            ? darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
            : darkMode ? 'bg-rose-900/40 text-rose-400' : 'bg-rose-50 text-rose-700'
        }`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}% {changeLabel}
        </div>
      )}
      {sub && (
        <p className={`text-[10px] sm:text-xs mt-1 font-medium ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          {sub}
        </p>
      )}
    </div>
  );
}