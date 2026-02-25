import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Calendar, Plus, ChevronLeft, ChevronRight, Flame, Clock, Users, Dumbbell, Zap, Timer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { MealSlot } from '../components/meal/MealSlot';
import { RecipeSelectionModal } from '../components/meal/RecipeSelectionModal';
import { RecipeDetail } from '../components/recipe/RecipeDetail';

const RECIPES = [
  {
    id: 1,
    name: 'Garlic Butter Chicken & Rice',
    description: 'Tender chicken thighs in a rich garlic butter sauce served over fluffy white rice.',
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
    description: 'Classic Filipino-style fried rice loaded with eggs and vegetables.',
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
    description: 'Hearty Filipino mung bean stew with pork and vegetables.',
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
    description: 'Two-ingredient wonder pancakes — naturally sweet and cheap.',
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
    description: 'Canned tuna meets spicy tomato sauce for a quick, filling pasta.',
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
    description: 'Crisp, refreshing, and zero-cook. A vibrant side or light lunch.',
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

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

function buildEmptyPlan() {
  const plan = {};
  DAYS_OF_WEEK.forEach((day) => {
    plan[day] = { Breakfast: null, Lunch: null, Dinner: null };
  });
  return plan;
}

function loadPlan() {
  try {
    const saved = localStorage.getItem('mealPlan');
    if (!saved) return buildEmptyPlan();
    const parsed = JSON.parse(saved);
    const hydrated = buildEmptyPlan();
    DAYS_OF_WEEK.forEach((day) => {
      MEAL_TYPES.forEach((meal) => {
        const id = parsed?.[day]?.[meal];
        if (id) {
          const recipe = RECIPES.find((r) => r.id === id);
          if (recipe) hydrated[day][meal] = recipe;
        }
      });
    });
    return hydrated;
  } catch {
    return buildEmptyPlan();
  }
}

function savePlan(plan) {
  const slim = {};
  DAYS_OF_WEEK.forEach((day) => {
    slim[day] = {};
    MEAL_TYPES.forEach((meal) => {
      slim[day][meal] = plan[day][meal]?.id || null;
    });
  });
  localStorage.setItem('mealPlan', JSON.stringify(slim));
}

export function MealandWorkoutPlansPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [selectedDay, setSelectedDay] = useState(0);
  const { darkMode } = useDarkMode();

  // ── Recipe state ──────────────────────────────────────────────────────────
  const [mealPlan, setMealPlan] = useState(() => loadPlan());
  const [modal, setModal] = useState(null); // { mealType, day }
  const [detailRecipe, setDetailRecipe] = useState(null);

  useEffect(() => { savePlan(mealPlan); }, [mealPlan]);

  const handleAddRecipe = (mealType, dayKey) => setModal({ mealType, day: dayKey });

  const handleSelectRecipe = (recipe) => {
    if (!modal) return;
    setMealPlan((prev) => ({
      ...prev,
      [modal.day]: { ...prev[modal.day], [modal.mealType]: recipe },
    }));
    setModal(null);
  };

  const handleRemoveRecipe = (mealType, dayKey) => {
    setMealPlan((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], [mealType]: null },
    }));
  };
  // ─────────────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const daysOfWeek = [
    { short: 'Mon', full: 'Monday', date: 15 },
    { short: 'Tue', full: 'Tuesday', date: 16 },
    { short: 'Wed', full: 'Wednesday', date: 17 },
    { short: 'Thu', full: 'Thursday', date: 18 },
    { short: 'Fri', full: 'Friday', date: 19 },
    { short: 'Sat', full: 'Saturday', date: 20 },
    { short: 'Sun', full: 'Sunday', date: 21 },
  ];

  const currentDayKey = daysOfWeek[selectedDay].short;

  const meals = [
    {
      name: 'Avocado Toast & Scrambled Eggs',
      time: 'Breakfast',
      timeSlot: '8:00 AM',
      calories: 450,
      emoji: '🥑',
      protein: 18,
      carbs: 32,
      fat: 24,
      description: 'Whole grain toast topped with mashed avocado and perfectly scrambled eggs',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Grilled Chicken Caesar Salad',
      time: 'Lunch',
      timeSlot: '12:30 PM',
      calories: 520,
      emoji: '🥗',
      protein: 45,
      carbs: 28,
      fat: 22,
      description: 'Fresh romaine lettuce with grilled chicken breast and parmesan',
      gradient: 'from-lime-400 to-green-500'
    },
    {
      name: 'Baked Salmon with Roasted Vegetables',
      time: 'Dinner',
      timeSlot: '7:00 PM',
      calories: 680,
      emoji: '🐟',
      protein: 52,
      carbs: 45,
      fat: 28,
      description: 'Atlantic salmon with seasonal roasted vegetables and quinoa',
      gradient: 'from-orange-400 to-pink-500'
    },
  ];

  const workouts = [
    {
      name: 'Morning Run',
      type: 'Cardio',
      timeSlot: '6:30 AM',
      duration: 30,
      calories: 280,
      emoji: '🏃',
      gradient: 'from-blue-400 to-cyan-500',
      sets: null,
      reps: null,
      distance: '4 km',
      intensity: 'Moderate',
    },
    {
      name: 'Upper Body Strength',
      type: 'Strength',
      timeSlot: '10:00 AM',
      duration: 45,
      calories: 320,
      emoji: '💪',
      gradient: 'from-violet-400 to-purple-500',
      sets: 4,
      reps: 12,
      distance: null,
      intensity: 'High',
    },
    {
      name: 'Evening Yoga',
      type: 'Flexibility',
      timeSlot: '6:00 PM',
      duration: 30,
      calories: 120,
      emoji: '🧘',
      gradient: 'from-teal-400 to-emerald-500',
      sets: null,
      reps: null,
      distance: null,
      intensity: 'Low',
    },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalWorkoutCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalWorkoutMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

  const intensityColor = (intensity) => {
    if (intensity === 'High') return 'bg-red-50 border-red-200 text-red-700';
    if (intensity === 'Moderate') return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-green-50 border-green-200 text-green-700';
  };

  const intensityColorDark = (intensity) => {
    if (intensity === 'High') return 'bg-red-900/30 border-red-700 text-red-400';
    if (intensity === 'Moderate') return 'bg-yellow-900/30 border-yellow-700 text-yellow-400';
    return 'bg-green-900/30 border-green-700 text-green-400';
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800'
        : 'bg-linear-to-br from-blue-50 via-indigo-50/40 to-purple-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="meal-plans" />

      <div className="flex-1 mt-5 pt-20 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-3 transition-colors ${
                darkMode
                  ? 'bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent'
                  : 'bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                Meal and Workout Plans
              </h1>
              <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Plan your weekly meals, workout plans, and track nutrition
              </p>
            </div>
            <button className="px-4 sm:px-6 py-3 sm:py-3.5 bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-300/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base">
              <Plus className="w-5 h-5" />
              Generate Plan
            </button>
          </div>
        </div>

        {/* Week Selector */}
        <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl mb-6 transition-colors ${
          darkMode
            ? 'bg-gray-800/90 border-gray-700/50'
            : 'bg-white/90 border-blue-200/50'
        }`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button className={`p-2 sm:p-3 rounded-xl transition-all cursor-pointer group border ${
              darkMode
                ? 'hover:bg-gray-700 border-gray-600 hover:border-blue-500'
                : 'hover:bg-blue-50 border-gray-200 hover:border-blue-300'
            }`}>
              <ChevronLeft className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className={`font-black text-base sm:text-lg transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Feb 15 - Feb 21, 2026</span>
            </div>
            <button className={`p-2 sm:p-3 rounded-xl transition-all cursor-pointer group border ${
              darkMode
                ? 'hover:bg-gray-700 border-gray-600 hover:border-blue-500'
                : 'hover:bg-blue-50 border-gray-200 hover:border-blue-300'
            }`}>
              <ChevronRight className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {daysOfWeek.map((day, idx) => (
              <button
                key={day.short}
                onClick={() => setSelectedDay(idx)}
                className={`shrink-0 flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer min-w-17.5 sm:min-w-20 ${
                  selectedDay === idx
                    ? darkMode
                      ? 'border-blue-500 bg-linear-to-br from-blue-900/50 to-indigo-900/30 shadow-lg'
                      : 'border-blue-500 bg-linear-to-br from-blue-50 to-indigo-50 shadow-lg'
                    : darkMode
                    ? 'border-gray-700 bg-gray-800/50 hover:border-blue-500 hover:shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <span className={`text-xs sm:text-sm font-bold ${selectedDay === idx ? 'text-blue-600' : darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {day.short}
                </span>
                <span className={`text-xl sm:text-2xl font-black ${selectedDay === idx ? 'text-blue-600' : darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {day.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left: Meals + Recipe Slots + Workouts */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">

            {/* Meals Section */}
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
              darkMode
                ? 'bg-gray-800/90 border-gray-700/50'
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h2 className={`text-xl sm:text-2xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {daysOfWeek[selectedDay].full}, Feb {daysOfWeek[selectedDay].date}
                </h2>
                <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border ${
                  darkMode
                    ? 'bg-linear-to-r from-orange-900/40 to-red-900/30 border-orange-700'
                    : 'bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200'
                }`}>
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className={`font-black text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{totalCalories} cal</span>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className={`group rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'bg-linear-to-r from-gray-700/50 via-gray-700/30 to-gray-700/50 border-gray-600 hover:border-blue-500'
                        : 'bg-linear-to-r from-white via-gray-50/50 to-white border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${meal.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {meal.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{meal.time}</span>
                          <span className={`text-xs transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                          <span className={`text-xs sm:text-sm flex items-center gap-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {meal.timeSlot}
                          </span>
                        </div>
                        <h3 className={`text-base sm:text-lg font-black mb-2 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{meal.name}</h3>
                        <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{meal.description}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-orange-50 border border-orange-200 rounded-lg">
                            <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                            <span className="text-xs sm:text-sm font-bold text-orange-900">{meal.calories}</span>
                          </div>
                          <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-lg">
                            <span className="text-xs sm:text-sm font-bold text-blue-900">P: {meal.protein}g</span>
                          </div>
                          <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-green-50 border border-green-200 rounded-lg">
                            <span className="text-xs sm:text-sm font-bold text-green-900">C: {meal.carbs}g</span>
                          </div>
                          <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-amber-50 border border-amber-200 rounded-lg">
                            <span className="text-xs sm:text-sm font-bold text-amber-900">F: {meal.fat}g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── My Recipes Section (NEW) ── */}
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
              darkMode
                ? 'bg-gray-800/90 border-gray-700/50'
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-1.5 h-8 bg-linear-to-b from-blue-500 to-indigo-500 rounded-full" />
                <h2 className={`text-xl sm:text-2xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  My Recipes for {daysOfWeek[selectedDay].short}
                </h2>
              </div>
              <div className="space-y-3">
                {MEAL_TYPES.map((mealType) => (
                  <MealSlot
                    key={mealType}
                    mealType={mealType}
                    day={currentDayKey}
                    recipe={mealPlan[currentDayKey][mealType]}
                    onAdd={handleAddRecipe}
                    onRemove={handleRemoveRecipe}
                    onViewDetail={setDetailRecipe}
                  />
                ))}
              </div>
            </div>

            {/* Workout Plan Section */}
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
              darkMode
                ? 'bg-gray-800/90 border-gray-700/50'
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Dumbbell className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Workout Plan
                  </h2>
                </div>
                <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border ${
                  darkMode
                    ? 'bg-linear-to-r from-violet-900/40 to-purple-900/30 border-violet-700'
                    : 'bg-linear-to-r from-violet-50 to-purple-50 border-violet-200'
                }`}>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
                  <span className={`font-black text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{totalWorkoutCalories} cal</span>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {workouts.map((workout, idx) => (
                  <div
                    key={idx}
                    className={`group rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'bg-linear-to-r from-gray-700/50 via-gray-700/30 to-gray-700/50 border-gray-600 hover:border-violet-500'
                        : 'bg-linear-to-r from-white via-gray-50/50 to-white border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${workout.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {workout.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{workout.type}</span>
                          <span className={`text-xs transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                          <span className={`text-xs sm:text-sm flex items-center gap-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {workout.timeSlot}
                          </span>
                        </div>
                        <h3 className={`text-base sm:text-lg font-black mb-3 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{workout.name}</h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-violet-50 border border-violet-200 rounded-lg">
                            <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
                            <span className="text-xs sm:text-sm font-bold text-violet-900">{workout.calories} cal</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-lg">
                            <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                            <span className="text-xs sm:text-sm font-bold text-blue-900">{workout.duration} min</span>
                          </div>
                          {workout.sets && (
                            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <span className="text-xs sm:text-sm font-bold text-indigo-900">{workout.sets} sets × {workout.reps} reps</span>
                            </div>
                          )}
                          {workout.distance && (
                            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-cyan-50 border border-cyan-200 rounded-lg">
                              <span className="text-xs sm:text-sm font-bold text-cyan-900">{workout.distance}</span>
                            </div>
                          )}
                          <div className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border rounded-lg ${
                            darkMode ? intensityColorDark(workout.intensity) : intensityColor(workout.intensity)
                          }`}>
                            <span className="text-xs sm:text-sm font-bold">{workout.intensity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-xl lg:sticky lg:top-8 space-y-5 sm:space-y-6 transition-colors ${
              darkMode
                ? 'bg-gray-800/90 border-gray-700/50'
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <div>
                <h3 className={`text-xl sm:text-2xl font-black mb-4 sm:mb-5 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Daily Summary</h3>

                <div className={`p-4 sm:p-5 rounded-2xl border-2 mb-4 sm:mb-5 ${
                  darkMode
                    ? 'bg-linear-to-br from-orange-900/30 to-red-900/20 border-orange-700'
                    : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm sm:text-base font-bold transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Calories</span>
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div className={`text-3xl sm:text-4xl font-black ${
                    darkMode
                      ? 'bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent'
                      : 'bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'
                  }`}>{totalCalories}</div>
                  <div className={`text-xs sm:text-sm font-semibold mt-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>calories (food)</div>
                </div>

                {/* Workout Summary */}
                <div className={`p-4 sm:p-5 rounded-2xl border-2 mb-4 sm:mb-5 ${
                  darkMode
                    ? 'bg-linear-to-br from-violet-900/30 to-purple-900/20 border-violet-700'
                    : 'bg-linear-to-br from-violet-50 to-purple-50 border-violet-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm sm:text-base font-bold transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Workout Burn</span>
                    <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                  </div>
                  <div className={`text-3xl sm:text-4xl font-black ${
                    darkMode
                      ? 'bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent'
                      : 'bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
                  }`}>{totalWorkoutCalories}</div>
                  <div className={`text-xs sm:text-sm font-semibold mt-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    calories burned · {totalWorkoutMinutes} min total
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className={`text-center p-3 sm:p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-linear-to-br from-blue-900/30 to-blue-900/20 border-blue-700'
                      : 'bg-linear-to-br from-blue-50 to-blue-100/50 border-blue-200'
                  }`}>
                    <div className="text-xl sm:text-2xl font-black text-blue-600">{totalProtein}g</div>
                    <div className={`text-[10px] sm:text-xs font-bold mt-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>Protein</div>
                  </div>
                  <div className={`text-center p-3 sm:p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-linear-to-br from-green-900/30 to-green-900/20 border-green-700'
                      : 'bg-linear-to-br from-green-50 to-green-100/50 border-green-200'
                  }`}>
                    <div className="text-xl sm:text-2xl font-black text-green-600">
                      {meals.reduce((sum, meal) => sum + meal.carbs, 0)}g
                    </div>
                    <div className={`text-[10px] sm:text-xs font-bold mt-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>Carbs</div>
                  </div>
                  <div className={`text-center p-3 sm:p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-linear-to-br from-amber-900/30 to-amber-900/20 border-amber-700'
                      : 'bg-linear-to-br from-amber-50 to-amber-100/50 border-amber-200'
                  }`}>
                    <div className="text-xl sm:text-2xl font-black text-amber-600">
                      {meals.reduce((sum, meal) => sum + meal.fat, 0)}g
                    </div>
                    <div className={`text-[10px] sm:text-xs font-bold mt-1 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>Fat</div>
                  </div>
                </div>

                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  darkMode
                    ? 'bg-linear-to-br from-gray-700/50 to-gray-700/30 border-gray-600'
                    : 'bg-linear-to-br from-gray-50 to-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm sm:text-base font-bold transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Meal Distribution</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {meals.map((meal, idx) => {
                      const percentage = (meal.calories / totalCalories) * 100;
                      return (
                        <div key={idx}>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className={`font-semibold transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{meal.time}</span>
                            <span className={`font-bold transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{Math.round(percentage)}%</span>
                          </div>
                          <div className={`w-full rounded-full h-2 overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                              className={`bg-linear-to-r ${meal.gradient} h-2 rounded-full transition-all duration-700`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <button className="w-full py-3 sm:py-3.5 bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-300/50 hover:scale-105 transition-all text-sm sm:text-base cursor-pointer">
                  Edit Today's Plan
                </button>
                <button className={`w-full py-3 sm:py-3.5 font-bold rounded-xl border-2 hover:shadow-md transition-all text-sm sm:text-base cursor-pointer ${
                  darkMode
                    ? 'bg-gray-700/50 text-gray-200 border-gray-600 hover:bg-gray-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}>
                  View Recipes
                </button>
              </div>

              <div className={`p-4 sm:p-5 rounded-2xl border ${
                darkMode
                  ? 'bg-linear-to-br from-purple-900/30 to-indigo-900/20 border-purple-700'
                  : 'bg-linear-to-br from-purple-50 to-indigo-50 border-purple-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className={`text-sm sm:text-base font-bold transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weekly Progress</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-600 mb-1">5/7</div>
                <div className={`text-xs sm:text-sm font-semibold transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>Days planned this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Selection Modal */}
      {modal && (
        <RecipeSelectionModal
          recipes={RECIPES}
          onSelect={handleSelectRecipe}
          onClose={() => setModal(null)}
          mealType={modal.mealType}
          day={modal.day}
        />
      )}

      {/* Recipe Detail Modal */}
      {detailRecipe && (
        <RecipeDetail
          recipe={detailRecipe}
          onClose={() => setDetailRecipe(null)}
          onAddToGrocery={() => {}}
        />
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}