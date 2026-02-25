import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import React, { useState, useEffect } from 'react';
import { Calendar, ShoppingCart, Sparkles } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

// ── Storage keys — must match the other pages exactly ──────────────────────
const BUDGET_TXS_KEY = 'budgetTransactions';
const BUDGET_LIMIT_KEY = 'budgetMonthlyLimit';
const MEAL_PLAN_KEY = 'mealPlan';
const GROCERY_CHECKED_KEY = 'groceryCheckedItems';

// ── Helpers ─────────────────────────────────────────────────────────────────
function getMonthISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function loadBudgetData() {
  try {
    const txs = JSON.parse(localStorage.getItem(BUDGET_TXS_KEY) || '[]');
    const limit = localStorage.getItem(BUDGET_LIMIT_KEY);
    const monthlyBudget = limit ? parseFloat(limit) : null;
    const currentMonthISO = getMonthISO(new Date());
    const monthTxs = txs.filter(t => t.date && t.date.startsWith(currentMonthISO));
    const totalSpent = monthTxs.reduce((s, t) => s + t.amount, 0);
    const remaining = monthlyBudget !== null ? monthlyBudget - totalSpent : null;
    const percentUsed = monthlyBudget ? Math.min(Math.round((totalSpent / monthlyBudget) * 100), 100) : null;

    // Weekly spent (this week Mon–Sun)
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weeklySpent = txs
      .filter(t => new Date(t.date + 'T00:00:00') >= weekStart)
      .reduce((s, t) => s + t.amount, 0);
    const weeklyBudget = monthlyBudget ? monthlyBudget / 4 : null;
    const weeklyRemaining = weeklyBudget !== null ? weeklyBudget - weeklySpent : null;
    const weeklyPct = weeklyBudget ? Math.round(((weeklyBudget - weeklySpent) / weeklyBudget) * 100) : null;

    return { monthlyBudget, totalSpent, remaining, percentUsed, weeklyBudget, weeklySpent, weeklyRemaining, weeklyPct };
  } catch {
    return { monthlyBudget: null, totalSpent: 0, remaining: null, percentUsed: null, weeklyBudget: null, weeklySpent: 0, weeklyRemaining: null, weeklyPct: null };
  }
}

function loadGroceryData() {
  try {
    // GroceryListPage stores checked items in component state only.
    // We read from GROCERY_CHECKED_KEY if you persist it; otherwise default to 12 total.
    const checked = JSON.parse(localStorage.getItem(GROCERY_CHECKED_KEY) || '[]');
    const TOTAL_ITEMS = 12;
    return { totalItems: TOTAL_ITEMS, checkedCount: checked.length };
  } catch {
    return { totalItems: 12, checkedCount: 0 };
  }
}

function loadMealPlanData() {
  try {
    const saved = JSON.parse(localStorage.getItem(MEAL_PLAN_KEY) || '{}');
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];
    let count = 0;
    DAYS.forEach(day => {
      MEAL_TYPES.forEach(meal => {
        if (saved?.[day]?.[meal]) count++;
      });
    });

    // Today's day key
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayKey = dayNames[new Date().getDay()];
    const todayPlan = saved?.[todayKey] || {};

    return { mealsPlannedCount: count, todayPlan };
  } catch {
    return { mealsPlannedCount: 0, todayPlan: {} };
  }
}

const MEAL_GRADIENTS = {
  Breakfast: 'from-green-400 to-emerald-500',
  Lunch: 'from-lime-400 to-green-500',
  Dinner: 'from-orange-400 to-pink-500',
};
const MEAL_EMOJIS = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙' };

// ── Page ─────────────────────────────────────────────────────────────────────
export function DashboardPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const { darkMode } = useDarkMode();

  const [budgetData, setBudgetData] = useState(loadBudgetData);
  const [groceryData, setGroceryData] = useState(loadGroceryData);
  const [mealData, setMealData] = useState(loadMealPlanData);

  const refresh = () => {
    setBudgetData(loadBudgetData());
    setGroceryData(loadGroceryData());
    setMealData(loadMealPlanData());
  };

  useEffect(() => {
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    navigate('/');
  };

  if (!isAuthenticated) return <Navigate to="/" replace />;

  // User name
  const storedName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail') || '';
  const displayName = storedName || userEmail.split('@')[0] || 'User';
  const firstName = displayName.split(' ')[0];
  const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const { monthlyBudget, totalSpent, remaining, percentUsed, weeklyBudget, weeklyPct } = budgetData;
  const { totalItems, checkedCount } = groceryData;
  const { mealsPlannedCount, todayPlan } = mealData;

  const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];
  const todayMeals = MEAL_TYPES.map(t => ({ type: t, recipe: todayPlan[t] || null })).filter(m => m.recipe);

  const stats = [
    {
      label: 'Weekly Budget',
      value: weeklyBudget ? `₱${weeklyBudget.toFixed(0)}` : '—',
      status: weeklyPct !== null ? `${weeklyPct}% left` : 'Set in Budget',
      icon: '₱',
      gradient: 'from-emerald-400 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100/50',
      link: '/budget',
    },
    {
      label: 'Meals Planned',
      value: String(mealsPlannedCount),
      status: 'This week',
      icon: Calendar,
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100/50',
      link: '/meal-plans',
    },
    {
      label: 'Grocery Items',
      value: String(totalItems),
      status: `${checkedCount} checked`,
      icon: ShoppingCart,
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100/50',
      link: '/grocery',
    },
    {
      label: 'Remaining Budget',
      value: remaining !== null ? `₱${Math.abs(remaining).toFixed(0)}` : '—',
      status: remaining !== null && remaining < 0 ? '⚠️ Over budget' : 'This month',
      icon: '₱',
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100/50',
      link: '/budget',
    },
  ];

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800'
        : 'bg-linear-to-br from-emerald-50 via-teal-50/40 to-lime-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="dashboard" />

      <div className="flex-1 mt-5 pt-20 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

        {/* Greeting */}
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-1 transition-colors ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Welcome back,{' '}
            <span className={darkMode
              ? 'bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent'
              : 'bg-linear-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent'
            }>{capitalizedName}!</span>
          </h1>
          <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's your budget overview and meal planning summary
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const isTextIcon = typeof stat.icon === 'string';
            return (
              <div
                key={idx}
                onClick={() => navigate(stat.link)}
                className={`group relative backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                  darkMode
                    ? 'bg-gray-800/90 border-gray-700/50'
                    : `bg-linear-to-br ${stat.bgGradient} border-white/60`
                }`}
              >
                <div className={`absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br ${stat.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`} />
                <div className={`w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-3 sm:mb-4`}>
                  {isTextIcon
                    ? <span className="text-white font-black text-sm sm:text-base">{stat.icon}</span>
                    : React.createElement(stat.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6 text-white' })
                  }
                </div>
                <div className={`text-xs sm:text-sm font-semibold mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
                <div className={`text-2xl sm:text-3xl font-black ${
                  stat.label === 'Remaining Budget' && remaining !== null && remaining < 0
                    ? 'text-red-500'
                    : darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm font-semibold mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Today's Meals — from mealPlan localStorage */}
          <div className={`lg:col-span-2 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h2 className={`text-xl sm:text-2xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Today's Meals
              </h2>
              <button
                onClick={() => navigate('/meal-plans')}
                className={`text-sm font-semibold cursor-pointer ${
                  darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                }`}
              >
                View All →
              </button>
            </div>

            {todayMeals.length === 0 ? (
              <div className={`text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <p className="text-4xl mb-3">🍽️</p>
                <p className="text-sm font-semibold mb-3">No meals planned for today</p>
                <button
                  onClick={() => navigate('/meal-plans')}
                  className="px-4 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white text-xs font-bold rounded-xl cursor-pointer hover:scale-105 transition-all"
                >
                  Plan Today's Meals →
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {todayMeals.map(({ type, recipe }) => (
                  <div
                    key={type}
                    onClick={() => navigate('/meal-plans')}
                    className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                      darkMode
                        ? 'bg-linear-to-r from-gray-700/50 to-gray-700/30 border-gray-600 hover:border-emerald-500 hover:shadow-md'
                        : 'bg-linear-to-r from-gray-50 to-white border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:scale-110 transition-transform bg-linear-to-br ${MEAL_GRADIENTS[type]}`}>
                      {recipe.emoji || MEAL_EMOJIS[type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {type}
                      </div>
                      <div className={`font-bold text-sm sm:text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {recipe.name}
                      </div>
                    </div>
                    <div className={`shrink-0 flex items-center gap-1 text-sm font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                      🔥 {recipe.calories} cal
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-5">

            {/* Budget Status — live from BudgetTrackerPage data */}
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border shadow-xl transition-colors ${
              darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-lg sm:text-xl font-black mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Budget Status
              </h3>

              {monthlyBudget ? (
                <>
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border mb-3 ${
                    darkMode
                      ? 'bg-linear-to-br from-emerald-900/30 to-teal-900/20 border-emerald-700'
                      : 'bg-linear-to-br from-emerald-50 to-teal-50 border-emerald-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Progress</span>
                      <span className={`font-black ${percentUsed > 90 ? 'text-red-500' : 'text-emerald-600'}`}>
                        {percentUsed}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          percentUsed > 90
                            ? 'bg-linear-to-r from-red-400 to-red-500'
                            : 'bg-linear-to-r from-emerald-400 to-teal-500'
                        }`}
                        style={{ width: `${percentUsed}%` }}
                      />
                    </div>
                    <div className={`text-xs mt-1.5 font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      ₱{totalSpent.toFixed(2)} of ₱{monthlyBudget.toFixed(2)}
                    </div>
                  </div>
                  <div className={`flex justify-between items-center p-3 sm:p-4 rounded-xl border ${
                    darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <span className={`font-bold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remaining</span>
                    <span className={`text-2xl font-black ${remaining < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                      ₱{remaining.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className={`text-center py-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <p className="text-sm font-semibold mb-3">No budget set yet</p>
                  <button
                    onClick={() => navigate('/budget')}
                    className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer hover:scale-105 transition-all"
                  >
                    Set Budget →
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border shadow-xl transition-colors ${
              darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-lg sm:text-xl font-black mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { label: 'Plan Meals', path: '/meal-plans', colors: darkMode ? 'from-blue-900/40 to-indigo-900/30 text-blue-300 hover:from-blue-900/60' : 'from-blue-50 to-indigo-50 text-blue-700' },
                  { label: 'Grocery List', path: '/grocery', colors: darkMode ? 'from-purple-900/40 to-pink-900/30 text-purple-300 hover:from-purple-900/60' : 'from-purple-50 to-pink-50 text-purple-700' },
                  { label: 'Track Budget', path: '/budget', colors: darkMode ? 'from-orange-900/40 to-amber-900/30 text-orange-300 hover:from-orange-900/60' : 'from-orange-50 to-amber-50 text-orange-700' },
                ].map(btn => (
                  <button
                    key={btn.label}
                    onClick={() => navigate(btn.path)}
                    className={`w-full p-3 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between bg-linear-to-r ${btn.colors}`}
                  >
                    {btn.label} <span>→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Tip */}
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border shadow-xl transition-colors ${
              darkMode
                ? 'bg-linear-to-br from-amber-900/20 to-yellow-900/10 border-amber-700/50'
                : 'bg-linear-to-br from-amber-50 to-yellow-50 border-amber-200/50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                  Weekly Tip
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Meal prep on Sundays can save you up to 4 hours during the week and reduce food waste by 30%!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}