import { Clock, Users, Flame, ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function RecipeCard({ recipe, onClick }) {
  const { darkMode } = useDarkMode();
  const [liked, setLiked] = useState(recipe.liked || false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl sm:rounded-3xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
        darkMode
          ? 'bg-gray-800/90 border-gray-700/50'
          : 'bg-white/90 border-gray-200/50'
      }`}
    >
      {/* Recipe Image / Emoji Banner */}
      <div className={`relative h-36 sm:h-44 flex items-center justify-center bg-linear-to-br ${recipe.gradient} overflow-hidden`}>
        <span className="text-6xl sm:text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {recipe.emoji}
        </span>
        {/* Budget badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-xl text-xs font-black text-emerald-700 shadow-md">
          ₱{recipe.costPerServing}/serving
        </div>
        {/* Like button */}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 ${
            liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
        {/* Category tag */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-xl text-xs font-bold text-white">
          {recipe.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className={`font-black text-base sm:text-lg mb-1 line-clamp-1 transition-colors ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>{recipe.name}</h3>
        <p className={`text-xs sm:text-sm mb-4 line-clamp-2 transition-colors ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>{recipe.description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.calories} cal</span>
          </div>
          <div className="ml-auto">
            <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
              darkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}