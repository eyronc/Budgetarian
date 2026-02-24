import { X, Clock, Users, Flame, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function RecipeDetail({ recipe, onClose, onAddToGrocery }) {
  const { darkMode } = useDarkMode();
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [addedToGrocery, setAddedToGrocery] = useState(false);

  if (!recipe) return null;

  const toggleStep = (idx) => {
    setCheckedSteps((prev) =>
      prev.includes(idx) ? prev.filter((s) => s !== idx) : [...prev, idx]
    );
  };

  const handleAddToGrocery = () => {
    setAddedToGrocery(true);
    onAddToGrocery && onAddToGrocery(recipe);
    setTimeout(() => setAddedToGrocery(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl transition-colors ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header Banner */}
        <div className={`relative h-48 sm:h-56 flex items-center justify-center bg-linear-to-br ${recipe.gradient} sticky top-0 z-10`}>
          <span className="text-8xl drop-shadow-xl">{recipe.emoji}</span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-black/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl text-white text-xs font-bold">
              {recipe.category}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7">
          <div className="mb-5">
            <h2 className={`text-2xl sm:text-3xl font-black mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {recipe.name}
            </h2>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {recipe.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { icon: Clock, label: 'Time', value: recipe.time },
              { icon: Users, label: 'Serves', value: recipe.servings },
              { icon: Flame, label: 'Calories', value: `${recipe.calories}` },
              { icon: null, label: 'Cost', value: `₱${recipe.costPerServing}/serving` },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-3 text-center border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                }`}
              >
                {stat.icon && <stat.icon className={`w-4 h-4 mx-auto mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />}
                {!stat.icon && <span className={`text-sm font-black ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>₱</span>}
                <div className={`text-xs sm:text-sm font-black ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{stat.value}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <div className="w-1 h-6 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Ingredients
              </h3>
              <button
                onClick={handleAddToGrocery}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  addedToGrocery
                    ? 'bg-emerald-500 text-white'
                    : darkMode
                    ? 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-900/60'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {addedToGrocery ? 'Added!' : 'Add to Grocery'}
              </button>
            </div>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {ing.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      ₱{ing.cost}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{ing.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className={`text-lg font-black mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              <div className="w-1 h-6 bg-linear-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              Instructions
            </h3>
            <div className="space-y-3">
              {recipe.steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    checkedSteps.includes(idx)
                      ? darkMode
                        ? 'bg-emerald-900/20 border-emerald-700/50 opacity-60'
                        : 'bg-emerald-50/80 border-emerald-200 opacity-70'
                      : darkMode
                      ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {checkedSteps.includes(idx) ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-black ${
                        darkMode ? 'border-gray-600 text-gray-500' : 'border-gray-300 text-gray-400'
                      }`}>
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <span className={`text-sm leading-relaxed ${
                    checkedSteps.includes(idx)
                      ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                      : darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{step}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}