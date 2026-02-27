import { useDarkMode } from '../../contexts/DarkModeContext';
import { ChefHat } from 'lucide-react';

const STATIC_FALLBACK = [
  { name: 'Egg Fried Rice',               emoji: '🍳', cooked: 0, gradient: 'from-yellow-400 to-orange-400' },
  { name: 'Monggo Guisado',               emoji: '🫘', cooked: 0, gradient: 'from-green-500 to-emerald-600' },
  { name: 'Banana Oat Pancakes',          emoji: '🥞', cooked: 0, gradient: 'from-yellow-300 to-yellow-500' },
  { name: 'Cucumber & Tomato Salad',      emoji: '🥗', cooked: 0, gradient: 'from-teal-400 to-emerald-500'  },
  { name: 'Garlic Butter Chicken & Rice', emoji: '🍗', cooked: 0, gradient: 'from-orange-400 to-amber-500'  },
];

const GRADIENTS = [
  'from-yellow-400 to-orange-400',
  'from-green-500 to-emerald-600',
  'from-yellow-300 to-yellow-500',
  'from-teal-400 to-emerald-500',
  'from-orange-400 to-amber-500',
];

const rankColors = ['text-amber-400', 'text-gray-400', 'text-amber-600'];
const rankBg     = ['bg-amber-400/10', 'bg-gray-400/10', 'bg-amber-600/10'];

export function TopRecipes({ topRecipes }) {
  const { darkMode } = useDarkMode();

  const hasData = topRecipes?.length > 0;
  const recipes = hasData
    ? topRecipes.map((r, i) => ({
        name:     r.name,
        emoji:    r.emoji || '🍽️',
        cooked:   r.cooked,
        gradient: GRADIENTS[i % GRADIENTS.length],
      }))
    : STATIC_FALLBACK;

  return (
    <div className="space-y-2.5">
      {!hasData && (
        <p className={`text-xs font-semibold col-span-full mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Plan meals to see your top recipes here
        </p>
      )}
      {recipes.map((recipe, i) => (
        <div
          key={recipe.name}
          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
            darkMode
              ? 'bg-gray-700/40 border-gray-700 hover:border-gray-600'
              : 'bg-gray-50 border-gray-100 hover:border-gray-200'
          }`}
        >
          {/* Rank badge */}
          <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
            i < 3 ? rankBg[i]    : darkMode ? 'bg-gray-700'    : 'bg-gray-100'
          } ${
            i < 3 ? rankColors[i]: darkMode ? 'text-gray-500'  : 'text-gray-400'
          }`}>
            {i + 1}
          </div>

          {/* Emoji */}
          <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-linear-to-br ${recipe.gradient} shadow-sm`}>
            {recipe.emoji}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-bold truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {recipe.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <ChefHat className={`w-3 h-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {hasData ? `Planned ${recipe.cooked}×` : 'Not planned yet'}
              </span>
            </div>
          </div>

          {/* Times planned badge */}
          {hasData && (
            <div className="shrink-0 text-right">
              <p className={`text-xs font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {recipe.cooked}×
              </p>
              <p className={`text-[10px] font-semibold ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                planned
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}