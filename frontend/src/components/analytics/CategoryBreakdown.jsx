import { useDarkMode } from '../../contexts/DarkModeContext';

// Colour + emoji map for known categories; fallback for unknown ones
const CATEGORY_STYLES = {
  Proteins:   { emoji: '🥩', color: 'from-rose-400 to-red-500'       },
  Vegetables: { emoji: '🥦', color: 'from-emerald-400 to-green-500'  },
  Grains:     { emoji: '🌾', color: 'from-amber-400 to-yellow-500'   },
  Dairy:      { emoji: '🥛', color: 'from-blue-400 to-sky-500'       },
  Condiments: { emoji: '🫙', color: 'from-purple-400 to-violet-500'  },
  Snacks:     { emoji: '🍪', color: 'from-orange-400 to-amber-500'   },
  Meat:       { emoji: '🥩', color: 'from-rose-400 to-red-500'       },
  Seafood:    { emoji: '🐟', color: 'from-cyan-400 to-blue-500'      },
  Fruits:     { emoji: '🍎', color: 'from-pink-400 to-rose-500'      },
  Drinks:     { emoji: '🧃', color: 'from-lime-400 to-green-500'     },
  Other:      { emoji: '🛒', color: 'from-gray-400 to-slate-500'     },
};

const FALLBACK_COLORS = [
  'from-violet-400 to-purple-500',
  'from-teal-400 to-cyan-500',
  'from-fuchsia-400 to-pink-500',
  'from-yellow-400 to-orange-400',
];

const STATIC_FALLBACK = [
  { name: 'Proteins',   amount: 0, emoji: '🥩', color: 'from-rose-400 to-red-500',      pct: 0 },
  { name: 'Vegetables', amount: 0, emoji: '🥦', color: 'from-emerald-400 to-green-500', pct: 0 },
  { name: 'Grains',     amount: 0, emoji: '🌾', color: 'from-amber-400 to-yellow-500',  pct: 0 },
  { name: 'Dairy',      amount: 0, emoji: '🥛', color: 'from-blue-400 to-sky-500',      pct: 0 },
  { name: 'Condiments', amount: 0, emoji: '🫙', color: 'from-purple-400 to-violet-500', pct: 0 },
  { name: 'Snacks',     amount: 0, emoji: '🍪', color: 'from-orange-400 to-amber-500',  pct: 0 },
];

export function CategoryBreakdown({ categoryMap = {}, totalSpent = 0 }) {
  const { darkMode } = useDarkMode();

  // Build category rows from live data
  const hasData = Object.keys(categoryMap).length > 0 && totalSpent > 0;

  const categories = hasData
    ? Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, amount], idx) => {
          const style = CATEGORY_STYLES[name] || {
            emoji: '🛒',
            color: FALLBACK_COLORS[idx % FALLBACK_COLORS.length],
          };
          return {
            name,
            amount,
            emoji: style.emoji,
            color: style.color,
            pct: Math.round((amount / totalSpent) * 100),
          };
        })
    : STATIC_FALLBACK;

  return (
    <div className="space-y-3">
      {!hasData && (
        <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Add transactions in Budget Tracker to see live data
        </p>
      )}
      {categories.map((cat) => (
        <div key={cat.name} className="flex items-center gap-3">
          <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base bg-linear-to-br ${cat.color} shadow-md`}>
            {cat.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cat.name}</span>
              <span className={`text-xs font-black ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {hasData ? `₱${cat.amount}` : '—'}
              </span>
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