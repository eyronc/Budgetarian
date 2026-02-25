import { Plus, X, ChevronRight, Flame, Clock } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function MealSlot({ mealType, day, recipe, onAdd, onRemove, onViewDetail }) {
  const { darkMode } = useDarkMode();

  const mealGradients = {
    Breakfast: 'from-yellow-400 to-orange-400',
    Lunch: 'from-blue-400 to-cyan-500',
    Dinner: 'from-purple-500 to-indigo-600',
    Snack: 'from-pink-400 to-rose-500',
  };

  const mealEmojis = {
    Breakfast: '🌅',
    Lunch: '☀️',
    Dinner: '🌙',
    Snack: '🍎',
  };

  const gradient = mealGradients[mealType] || 'from-gray-400 to-gray-600';
  const emoji = mealEmojis[mealType] || '🍽️';

  if (!recipe) {
    return (
      <button
        onClick={() => onAdd(mealType, day)}
        className={`w-full group flex items-center gap-3 p-3 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          darkMode
            ? 'border-gray-700 hover:border-orange-500/60 hover:bg-orange-900/10'
            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
        }`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-linear-to-br ${gradient} opacity-60 group-hover:opacity-80 transition-opacity`}>
          {emoji}
        </div>
        <div className="flex-1 text-left">
          <div className={`text-xs font-black uppercase tracking-wide transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {mealType}
          </div>
          <div className={`text-xs font-semibold mt-0.5 transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
            Tap to add a recipe
          </div>
        </div>
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${
          darkMode ? 'bg-gray-700 text-gray-400 group-hover:bg-orange-500/30 group-hover:text-orange-400' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600'
        }`}>
          <Plus className="w-4 h-4" />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`relative group flex items-center gap-3 p-3 rounded-2xl border transition-all ${
        darkMode
          ? 'bg-gray-700/50 border-gray-600/50 hover:border-orange-500/50'
          : 'bg-linear-to-r from-gray-50 to-white border-gray-200/60 hover:border-orange-300'
      }`}
    >
      {/* Recipe emoji */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-linear-to-br ${recipe.gradient} shrink-0 shadow-md`}
      >
        {recipe.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-black uppercase tracking-wide mb-0.5 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {mealType}
        </div>
        <div className={`text-sm font-black truncate transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {recipe.name}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" />
            <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.calories} cal</span>
          </span>
          <span className="text-xs font-black text-emerald-600">₱{recipe.costPerServing}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onViewDetail && onViewDetail(recipe)}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
            darkMode ? 'text-gray-500 hover:text-orange-400 hover:bg-orange-900/20' : 'text-gray-300 hover:text-orange-600 hover:bg-orange-50'
          }`}
          title="View recipe"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemove(mealType, day)}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
            darkMode ? 'text-gray-600 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-red-50'
          }`}
          title="Remove recipe"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}