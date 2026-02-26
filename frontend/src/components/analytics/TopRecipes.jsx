import { useDarkMode } from '../../contexts/DarkModeContext';
import { ChefHat } from 'lucide-react';

const topRecipes = [
  { name: 'Egg Fried Rice',               emoji: '🍳', cooked: 14, saved: '₱280', gradient: 'from-yellow-400 to-orange-400' },
  { name: 'Monggo Guisado',               emoji: '🫘', cooked: 11, saved: '₱385', gradient: 'from-green-500 to-emerald-600' },
  { name: 'Banana Oat Pancakes',          emoji: '🥞', cooked: 9,  saved: '₱162', gradient: 'from-yellow-300 to-yellow-500' },
  { name: 'Cucumber & Tomato Salad',      emoji: '🥗', cooked: 8,  saved: '₱120', gradient: 'from-teal-400 to-emerald-500' },
  { name: 'Garlic Butter Chicken & Rice', emoji: '🍗', cooked: 6,  saved: '₱330', gradient: 'from-orange-400 to-amber-500' },
];

const rankColors = ['text-amber-400', 'text-gray-400', 'text-amber-600'];
const rankBg    = ['bg-amber-400/10', 'bg-gray-400/10', 'bg-amber-600/10'];

export function TopRecipes() {
  const { darkMode } = useDarkMode();

  return (
    <div className="space-y-2.5">
      {topRecipes.map((recipe, i) => (
        <div key={recipe.name} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
          darkMode ? 'bg-gray-700/40 border-gray-700 hover:border-gray-600' : 'bg-gray-50 border-gray-100 hover:border-gray-200'
        }`}>
          <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
            i < 3 ? rankBg[i] : darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } ${i < 3 ? rankColors[i] : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {i + 1}
          </div>
          <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-linear-to-br ${recipe.gradient} shadow-sm`}>
            {recipe.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-bold truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{recipe.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <ChefHat className={`w-3 h-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Cooked {recipe.cooked}×</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className={`text-xs font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{recipe.saved}</p>
            <p className={`text-[10px] font-semibold ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>saved</p>
          </div>
        </div>
      ))}
    </div>
  );
}