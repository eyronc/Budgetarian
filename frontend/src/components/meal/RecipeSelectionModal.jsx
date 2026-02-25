import { X, Search, Clock, Users, Flame } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export function RecipeSelectionModal({ recipes, onSelect, onClose, mealType, day }) {
  const { darkMode } = useDarkMode();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    let out = [...recipes];
    if (search) {
      const q = search.toLowerCase();
      out = out.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') out = out.filter((r) => r.category === category);
    return out;
  }, [recipes, search, category]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full sm:max-w-xl max-h-[88vh] overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col transition-colors ${
          darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b transition-colors ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div>
            <h2 className={`text-lg font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Add Recipe
            </h2>
            <p className={`text-xs font-semibold mt-0.5 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {mealType} · {day}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className={`px-5 pt-4 pb-3 border-b transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <Search className={`w-4 h-4 shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className={`flex-1 text-sm bg-transparent outline-none font-medium placeholder:font-normal transition-colors ${
                darkMode ? 'text-gray-200 placeholder:text-gray-600' : 'text-gray-800 placeholder:text-gray-400'
              }`}
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : darkMode
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe list */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {filtered.length === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <span className="text-4xl block mb-2">🍽️</span>
              <p className="text-sm font-semibold">No recipes found</p>
            </div>
          )}
          {filtered.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => { onSelect(recipe); onClose(); }}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl border text-left transition-all cursor-pointer group ${
                darkMode
                  ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/60 hover:bg-gray-800'
                  : 'bg-gray-50 border-gray-100 hover:border-orange-300 hover:bg-orange-50/40'
              }`}
            >
              {/* Emoji badge */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-linear-to-br ${recipe.gradient}`}>
                {recipe.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`font-black text-sm truncate transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {recipe.name}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.time}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.calories} cal</span>
                  </span>
                  <span className={`text-xs font-black text-emerald-600`}>₱{recipe.costPerServing}</span>
                </div>
              </div>

              {/* Category */}
              <div className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                darkMode ? 'bg-gray-700 text-gray-400' : 'bg-white text-gray-500 border border-gray-200'
              }`}>
                {recipe.category}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}