import { useDarkMode } from '../../contexts/DarkModeContext';

const categories = [
  { name: 'Proteins',   amount: 210, emoji: '🥩', color: 'from-rose-400 to-red-500',     pct: 38 },
  { name: 'Vegetables', amount: 95,  emoji: '🥦', color: 'from-emerald-400 to-green-500', pct: 17 },
  { name: 'Grains',     amount: 85,  emoji: '🌾', color: 'from-amber-400 to-yellow-500',  pct: 15 },
  { name: 'Dairy',      amount: 70,  emoji: '🥛', color: 'from-blue-400 to-sky-500',      pct: 13 },
  { name: 'Condiments', amount: 55,  emoji: '🫙', color: 'from-purple-400 to-violet-500', pct: 10 },
  { name: 'Snacks',     amount: 40,  emoji: '🍪', color: 'from-orange-400 to-amber-500',  pct: 7  },
];

export function CategoryBreakdown() {
  const { darkMode } = useDarkMode();

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <div key={cat.name} className="flex items-center gap-3">
          <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base bg-linear-to-br ${cat.color} shadow-md`}>
            {cat.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cat.name}</span>
              <span className={`text-xs font-black ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>₱{cat.amount}</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div
                className={`h-full rounded-full bg-linear-to-r ${cat.color} transition-all duration-700`}
                style={{ width: `${cat.pct}%` }}
              />
            </div>
          </div>
          <span className={`shrink-0 text-xs font-black w-8 text-right ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {cat.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}