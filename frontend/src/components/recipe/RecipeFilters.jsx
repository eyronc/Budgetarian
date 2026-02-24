import { Search } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Budget Picks'];
const SORT_OPTIONS = ['Cheapest', 'Quickest', 'Most Popular', 'Lowest Cal'];

export function RecipeFilters({ search, onSearch, activeCategory, onCategory, sortBy, onSort }) {
  const { darkMode } = useDarkMode();

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-colors ${
        darkMode
          ? 'bg-gray-800/80 border-gray-700'
          : 'bg-white/90 border-gray-200'
      }`}>
        <Search className={`w-4 h-4 shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search recipes..."
          className={`flex-1 text-sm bg-transparent outline-none font-medium placeholder:font-normal transition-colors ${
            darkMode
              ? 'text-gray-200 placeholder:text-gray-600'
              : 'text-gray-800 placeholder:text-gray-400'
          }`}
        />
      </div>

      {/* Category pills - scrollable row */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategory(cat)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : darkMode
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort row - wraps, no scrollbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-bold shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Sort by:</span>
        <div className="flex gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => onSort(opt)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                sortBy === opt
                  ? darkMode
                    ? 'bg-rose-900/40 text-rose-400 border border-rose-700'
                    : 'bg-rose-100 text-rose-700 border border-rose-300'
                  : darkMode
                  ? 'text-gray-500 hover:text-gray-300 border border-gray-700'
                  : 'text-gray-400 hover:text-gray-600 border border-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}