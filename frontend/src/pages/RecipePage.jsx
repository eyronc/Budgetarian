import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { RecipeDetail } from '../components/recipe/RecipeDetail';
import { RecipeFilters } from '../components/recipe/RecipeFilters';
import { useDarkMode } from '../contexts/DarkModeContext';
import { ChefHat, Sparkles, TrendingDown } from 'lucide-react';

// ── Sample recipe data ──────────────────────────────────────────────────────
const RECIPES = [
  {
    id: 1,
    name: 'Garlic Butter Chicken & Rice',
    description: 'Tender chicken thighs in a rich garlic butter sauce served over fluffy white rice. A weeknight favourite that tastes expensive but costs almost nothing.',
    emoji: '🍗',
    gradient: 'from-orange-400 to-amber-500',
    category: 'Dinner',
    time: '30 min',
    servings: '4',
    calories: 620,
    costPerServing: 55,
    liked: false,
    ingredients: [
      { name: 'Chicken thighs', amount: '500g', cost: 90 },
      { name: 'White rice', amount: '2 cups', cost: 30 },
      { name: 'Garlic', amount: '6 cloves', cost: 10 },
      { name: 'Butter', amount: '3 tbsp', cost: 15 },
      { name: 'Soy sauce', amount: '2 tbsp', cost: 5 },
      { name: 'Spring onions', amount: '3 stalks', cost: 10 },
    ],
    steps: [
      'Season chicken thighs with salt, pepper, and a splash of soy sauce. Let marinate for 10 minutes.',
      'Heat a pan over medium-high heat. Sear chicken skin-side down for 6–7 minutes until golden and crispy.',
      'Flip and cook for another 5 minutes. Remove and set aside.',
      'In the same pan, melt butter and sauté minced garlic until fragrant, about 2 minutes.',
      'Return chicken to the pan, spoon garlic butter over it, and cook 3 more minutes.',
      'Serve over cooked rice and garnish with chopped spring onions.',
    ],
  },
  {
    id: 2,
    name: 'Egg Fried Rice',
    description: 'Classic Filipino-style fried rice loaded with eggs and vegetables. The ultimate budget meal that comes together in under 15 minutes.',
    emoji: '🍳',
    gradient: 'from-yellow-400 to-orange-400',
    category: 'Breakfast',
    time: '15 min',
    servings: '2',
    calories: 380,
    costPerServing: 20,
    liked: true,
    ingredients: [
      { name: 'Day-old rice', amount: '2 cups', cost: 15 },
      { name: 'Eggs', amount: '3 pcs', cost: 18 },
      { name: 'Garlic', amount: '4 cloves', cost: 5 },
      { name: 'Soy sauce', amount: '1.5 tbsp', cost: 3 },
      { name: 'Cooking oil', amount: '2 tbsp', cost: 4 },
    ],
    steps: [
      'Break up cold day-old rice so there are no clumps.',
      'Heat oil in a wok or large pan on high heat. Fry garlic until golden.',
      'Push garlic to the side, crack in eggs and scramble lightly.',
      'Add rice and toss everything together over high heat for 3–4 minutes.',
      'Season with soy sauce and a pinch of pepper. Serve hot.',
    ],
  },
  {
    id: 3,
    name: 'Monggo Guisado',
    description: 'Hearty Filipino mung bean stew with pork and vegetables — a protein-packed, deeply nourishing dish that stretches a small budget far.',
    emoji: '🫘',
    gradient: 'from-green-500 to-emerald-600',
    category: 'Dinner',
    time: '45 min',
    servings: '5',
    calories: 340,
    costPerServing: 35,
    liked: false,
    ingredients: [
      { name: 'Mung beans', amount: '1 cup', cost: 30 },
      { name: 'Pork belly', amount: '150g', cost: 50 },
      { name: 'Spinach / malunggay', amount: '1 bunch', cost: 15 },
      { name: 'Tomatoes', amount: '2 pcs', cost: 10 },
      { name: 'Onion & garlic', amount: 'to taste', cost: 8 },
      { name: 'Fish sauce', amount: '2 tbsp', cost: 5 },
    ],
    steps: [
      'Rinse mung beans and boil in 4 cups water for 20 minutes until soft.',
      'In a separate pan, sauté garlic and onion in oil. Add pork and cook until browned.',
      'Add chopped tomatoes and fish sauce; stir for 2 minutes.',
      'Combine pork mixture with softened mung beans and simmer 10 minutes.',
      'Add spinach or malunggay leaves, stir, and cook 2 more minutes. Serve with rice.',
    ],
  },
  {
    id: 4,
    name: 'Banana Oat Pancakes',
    description: 'Two-ingredient wonder pancakes — naturally sweet, gluten-free, and unbelievably cheap. Top with honey or fresh fruit for a satisfying breakfast.',
    emoji: '🥞',
    gradient: 'from-yellow-300 to-yellow-500',
    category: 'Breakfast',
    time: '12 min',
    servings: '2',
    calories: 260,
    costPerServing: 18,
    liked: false,
    ingredients: [
      { name: 'Ripe bananas', amount: '2 large', cost: 10 },
      { name: 'Rolled oats', amount: '1 cup', cost: 15 },
      { name: 'Eggs', amount: '2 pcs', cost: 12 },
      { name: 'Pinch of salt', amount: 'to taste', cost: 1 },
    ],
    steps: [
      'Mash bananas in a bowl until completely smooth.',
      'Mix in oats, eggs, and a pinch of salt. Let batter rest 2 minutes.',
      'Heat a non-stick pan on medium-low and grease lightly.',
      'Pour small rounds of batter and cook 2–3 minutes per side until golden.',
      'Serve with honey, sliced banana, or fresh fruit.',
    ],
  },
  {
    id: 5,
    name: 'Tuna Pasta Arrabbiata',
    description: 'Canned tuna meets spicy tomato sauce for a quick, filling pasta that packs flavour and protein without breaking the bank.',
    emoji: '🍝',
    gradient: 'from-red-400 to-rose-500',
    category: 'Lunch',
    time: '20 min',
    servings: '3',
    calories: 490,
    costPerServing: 42,
    liked: false,
    ingredients: [
      { name: 'Pasta (spaghetti)', amount: '250g', cost: 35 },
      { name: 'Canned tuna', amount: '1 can (180g)', cost: 40 },
      { name: 'Canned tomatoes', amount: '1 can', cost: 30 },
      { name: 'Chili flakes', amount: '1 tsp', cost: 3 },
      { name: 'Garlic', amount: '4 cloves', cost: 5 },
      { name: 'Olive / cooking oil', amount: '2 tbsp', cost: 10 },
    ],
    steps: [
      'Cook pasta in salted boiling water until al dente. Reserve ½ cup pasta water.',
      'Sauté garlic and chili flakes in oil over medium heat for 1 minute.',
      'Add canned tomatoes, crush gently, and simmer 8 minutes.',
      'Drain tuna and fold into the sauce. Cook 2 minutes.',
      'Toss in drained pasta with a splash of reserved pasta water. Serve immediately.',
    ],
  },
  {
    id: 6,
    name: 'Cucumber & Tomato Salad',
    description: 'Crisp, refreshing, and zero-cook. This vibrant salad doubles as a side or a light lunch and costs barely anything to put together.',
    emoji: '🥗',
    gradient: 'from-teal-400 to-emerald-500',
    category: 'Snacks',
    time: '5 min',
    servings: '2',
    calories: 95,
    costPerServing: 15,
    liked: false,
    ingredients: [
      { name: 'Cucumber', amount: '1 large', cost: 15 },
      { name: 'Tomatoes', amount: '2 pcs', cost: 12 },
      { name: 'Red onion', amount: '½ small', cost: 5 },
      { name: 'Vinegar / calamansi', amount: '2 tbsp', cost: 3 },
      { name: 'Salt & pepper', amount: 'to taste', cost: 1 },
    ],
    steps: [
      'Slice cucumber and tomatoes into bite-sized pieces.',
      'Thinly slice red onion and rinse under cold water to reduce sharpness.',
      'Combine all vegetables in a bowl.',
      'Drizzle with vinegar or calamansi juice; season with salt and pepper. Toss and serve.',
    ],
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
function applyFilters(recipes, search, category, sortBy) {
  let out = [...recipes];
  if (search) {
    const q = search.toLowerCase();
    out = out.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }
  if (category && category !== 'All') {
    if (category === 'Budget Picks') {
      out = out.filter((r) => r.costPerServing <= 25);
    } else {
      out = out.filter((r) => r.category === category);
    }
  }
  if (sortBy === 'Cheapest') out.sort((a, b) => a.costPerServing - b.costPerServing);
  else if (sortBy === 'Quickest') out.sort((a, b) => parseInt(a.time) - parseInt(b.time));
  else if (sortBy === 'Lowest Cal') out.sort((a, b) => a.calories - b.calories);
  return out;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function RecipePage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const { darkMode } = useDarkMode();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Cheapest');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const filtered = useMemo(
    () => applyFilters(RECIPES, search, category, sortBy),
    [search, category, sortBy]
  );

  const cheapest = [...RECIPES].sort((a, b) => a.costPerServing - b.costPerServing)[0];
  const avgCost = Math.round(RECIPES.reduce((s, r) => s + r.costPerServing, 0) / RECIPES.length);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800'
          : 'bg-linear-to-br from-emerald-50 via-teal-50/40 to-cyan-50/30'
      }`}
    >
      <Sidebar onLogout={handleLogout} activeSection="recipes" />

      <div className="flex-1 mt-5 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Page header */}
        <div className="mb-5 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-3 bg-linear-to-r from-rose-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
            Recipes
          </h1>
          <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Budget-friendly meals that don't compromise on taste
          </p>
        </div>

        {/* Highlight bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-8">
          {[
            { icon: ChefHat, label: 'Total Recipes', value: RECIPES.length, gradient: 'from-emerald-400 to-emerald-600' },
            { icon: TrendingDown, label: 'Cheapest', value: `₱${cheapest.costPerServing}`, gradient: 'from-teal-400 to-cyan-500' },
            { icon: Sparkles, label: 'Avg Cost', value: `₱${avgCost}`, gradient: 'from-blue-400 to-indigo-500' },
          ].map((s, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-3 sm:p-5 border shadow-lg overflow-hidden ${
                darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
              }`}
            >
              <div className={`absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br ${s.gradient} opacity-10 rounded-full blur-xl`} />
              <div className={`w-7 h-7 sm:w-9 sm:h-9 bg-linear-to-br ${s.gradient} rounded-xl flex items-center justify-center shadow-md mb-2`}>
                <s.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className={`text-lg sm:text-2xl font-black leading-none mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {s.value}
              </div>
              <div className={`text-[10px] sm:text-xs font-semibold leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <RecipeFilters
            search={search}
            onSearch={setSearch}
            activeCategory={category}
            onCategory={setCategory}
            sortBy={sortBy}
            onSort={setSortBy}
          />
        </div>

        {/* Results count */}
        <div className={`text-xs font-semibold mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {filtered.length} recipe{filtered.length !== 1 ? 's' : ''} found
        </div>

        {/* Recipe Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-20 rounded-3xl border ${
              darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-gray-100'
            }`}
          >
            <span className="text-5xl mb-4 block">🍽️</span>
            <p className={`font-bold text-lg mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No recipes found
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onAddToGrocery={(recipe) => {
            console.log('Adding to grocery:', recipe.name);
          }}
        />
      )}
    </div>
  );
}