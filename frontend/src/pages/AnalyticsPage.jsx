import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { StatCard } from '../components/analytics/StatCard';
import { SpendingChart } from '../components/analytics/SpendingChart';
import { NutritionChart } from '../components/analytics/NutritionChart';
import { CategoryBreakdown } from '../components/analytics/CategoryBreakdown';
import { SavingsTracker } from '../components/analytics/SavingsTracker';
import { TopRecipes } from '../components/analytics/TopRecipes';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Wallet, Flame, ShoppingBag, Leaf, Star } from 'lucide-react';

// ── Storage keys — must match other pages exactly ──────────────────────────
const BUDGET_TXS_KEY   = 'budgetTransactions';
const BUDGET_LIMIT_KEY = 'budgetMonthlyLimit';
const MEAL_PLAN_KEY    = 'mealPlan';

// ── Helpers ────────────────────────────────────────────────────────────────
function getMonthISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function loadAnalyticsData() {
  try {
    const txs           = JSON.parse(localStorage.getItem(BUDGET_TXS_KEY)  || '[]');
    const limit         = localStorage.getItem(BUDGET_LIMIT_KEY);
    const monthlyBudget = limit ? parseFloat(limit) : 1000;
    const now           = new Date();

    // ── Current month ──────────────────────────────────────────────────────
    const currentMonthISO = getMonthISO(now);
    const monthTxs        = txs.filter(t => t.date && t.date.startsWith(currentMonthISO));
    const totalSpent      = monthTxs.reduce((s, t) => s + t.amount, 0);
    const remaining       = monthlyBudget - totalSpent;

    // ── Previous month spend (for % change) ───────────────────────────────
    const prevDate      = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthISO  = getMonthISO(prevDate);
    const prevMonthTxs  = txs.filter(t => t.date && t.date.startsWith(prevMonthISO));
    const prevSpent     = prevMonthTxs.reduce((s, t) => s + t.amount, 0);
    const spendChange   = prevSpent > 0
      ? Math.round(((totalSpent - prevSpent) / prevSpent) * 100)
      : 0;

    // ── Grocery "trips" = unique dates with transactions this month ────────
    const uniqueDates  = [...new Set(monthTxs.map(t => t.date))];
    const groceryTrips = uniqueDates.length;

    // ── Avg daily calories from meal plan ─────────────────────────────────
    const mealPlan   = JSON.parse(localStorage.getItem(MEAL_PLAN_KEY) || '{}');
    const DAYS       = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];
    let totalCals = 0, mealCount = 0;
    DAYS.forEach(day => {
      MEAL_TYPES.forEach(meal => {
        const entry = mealPlan?.[day]?.[meal];
        if (entry?.calories) { totalCals += parseInt(entry.calories) || 0; mealCount++; }
      });
    });
    // Average per meal-slot, times 3 slots = average full day
    const avgDailyCalories = mealCount > 0 ? Math.round((totalCals / mealCount) * 3) : 0;

    // ── Category breakdown from current-month transactions ────────────────
    const categoryMap = {};
    monthTxs.forEach(t => {
      const cat = t.category || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + t.amount;
    });

    // ── Savings history (last 6 months) ───────────────────────────────────
    const savingsHistory = [];
    for (let i = 5; i >= 0; i--) {
      const d      = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const iso    = getMonthISO(d);
      const mTxs   = txs.filter(t => t.date && t.date.startsWith(iso));
      const mSpent = mTxs.reduce((s, t) => s + t.amount, 0);
      savingsHistory.push({
        month:   d.toLocaleString('default', { month: 'short' }),
        savings: Math.round(Math.max(0, monthlyBudget - mSpent)),
        target:  200,
      });
    }

    // ── Weekly spending data ───────────────────────────────────────────────
    const weeklyBudget = monthlyBudget / 4;
    const weeklyData = [0, 1, 2, 3].map(w => {
      const weekTxs = monthTxs.filter(t => {
        const day = parseInt(t.date?.split('-')[2] || '0');
        return day >= w * 7 + 1 && day <= (w + 1) * 7;
      });
      return {
        week:   `Week ${w + 1}`,
        spent:  Math.round(weekTxs.reduce((s, t) => s + t.amount, 0)),
        budget: Math.round(weeklyBudget),
      };
    });

    // ── Monthly spending data (last 6 months) ─────────────────────────────
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const d    = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const iso  = getMonthISO(d);
      const mTxs = txs.filter(t => t.date && t.date.startsWith(iso));
      monthlyData.push({
        month: d.toLocaleString('default', { month: 'short' }),
        spent: Math.round(mTxs.reduce((s, t) => s + t.amount, 0)),
      });
    }

    // ── Top recipes from meal plan ─────────────────────────────────────────
    const recipeMap = {};
    DAYS.forEach(day => {
      MEAL_TYPES.forEach(meal => {
        const entry = mealPlan?.[day]?.[meal];
        if (entry?.name) {
          if (!recipeMap[entry.name]) recipeMap[entry.name] = { ...entry, cooked: 0 };
          recipeMap[entry.name].cooked++;
        }
      });
    });
    const topRecipes = Object.values(recipeMap).sort((a, b) => b.cooked - a.cooked).slice(0, 5);

    return {
      monthlyBudget, totalSpent, remaining, spendChange,
      groceryTrips, avgDailyCalories, categoryMap,
      savingsHistory, weeklyData, monthlyData, topRecipes,
    };
  } catch {
    return {
      monthlyBudget: 1000, totalSpent: 0, remaining: 1000, spendChange: 0,
      groceryTrips: 0, avgDailyCalories: 0, categoryMap: {},
      savingsHistory: [], weeklyData: [], monthlyData: [], topRecipes: [],
    };
  }
}

// ── Page ──────────────────────────────────────────────────────────────────
export function AnalyticsPage() {
  const navigate         = useNavigate();
  const isAuthenticated  = localStorage.getItem('isAuthenticated') === 'true';
  const { darkMode }     = useDarkMode();
  const [spendView, setSpendView] = useState('weekly');
  const [data, setData]  = useState(loadAnalyticsData);

  const refresh = () => setData(loadAnalyticsData());

  useEffect(() => {
    window.addEventListener('focus',   refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('focus',   refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const {
    monthlyBudget, totalSpent, remaining, spendChange,
    groceryTrips, avgDailyCalories, categoryMap,
    savingsHistory, weeklyData, monthlyData, topRecipes,
  } = data;

  const STAT_CARDS = [
    {
      icon: Wallet,
      label: 'Monthly Spend',
      value: `₱${totalSpent.toFixed(0)}`,
      sub: `of ₱${monthlyBudget.toFixed(0)} budget`,
      gradient: 'from-emerald-400 to-emerald-600',
      change: spendChange !== 0 ? -spendChange : 0,
      changeLabel: 'vs last month',
    },
    {
      icon: Flame,
      label: 'Avg Daily Calories',
      value: avgDailyCalories > 0 ? avgDailyCalories.toLocaleString() : '—',
      sub: avgDailyCalories > 0 ? 'kcal per day' : 'Plan meals to track',
      gradient: 'from-orange-400 to-rose-500',
      change: undefined,
      changeLabel: '',
    },
    {
      icon: ShoppingBag,
      label: 'Grocery Trips',
      value: String(groceryTrips),
      sub: 'this month',
      gradient: 'from-purple-400 to-purple-600',
      change: undefined,
      changeLabel: '',
    },
    {
      icon: Leaf,
      label: 'Budget Saved',
      value: `₱${Math.max(0, remaining).toFixed(0)}`,
      sub: 'from budget this month',
      gradient: 'from-teal-400 to-cyan-500',
      change: remaining > 0 ? Math.round((remaining / monthlyBudget) * 100) : 0,
      changeLabel: 'of budget',
    },
  ];

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800'
        : 'bg-linear-to-br from-violet-50 via-indigo-50/40 to-cyan-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="analytics" />

      <div className="flex-1 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

        {/* Header */}
        <div className="mb-5 mt-5 sm:mb-8">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-3 bg-linear-to-r bg-clip-text text-transparent ${
            darkMode ? 'from-violet-400 via-indigo-400 to-cyan-400' : 'from-violet-600 via-indigo-600 to-cyan-600'
          }`}>
            Analytics
          </h1>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your spending, nutrition, and savings over time
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        {/* Row 1: Spending Chart + Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className={`lg:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Spending Overview</h2>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Budget vs actual spend</p>
              </div>
              <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {['weekly', 'monthly'].map((v) => (
                  <button key={v} onClick={() => setSpendView(v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      spendView === v
                        ? darkMode ? 'bg-gray-600 text-gray-100 shadow' : 'bg-white text-gray-900 shadow'
                        : darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <SpendingChart view={spendView} weeklyData={weeklyData} monthlyData={monthlyData} />
          </div>

          <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="mb-5">
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>By Category</h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Where your grocery money goes</p>
            </div>
            <CategoryBreakdown categoryMap={categoryMap} totalSpent={totalSpent} />
          </div>
        </div>

        {/* Row 2: Savings Tracker + Nutrition */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className={`lg:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="mb-5">
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Savings Tracker</h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Monthly savings vs ₱200 target</p>
            </div>
            <SavingsTracker savingsHistory={savingsHistory} />
          </div>

          <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="mb-5">
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Nutrition</h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Weekly macro breakdown</p>
            </div>
            <NutritionChart />
          </div>
        </div>

        {/* Row 3: Top Recipes */}
        <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
          darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-linear-to-br from-rose-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Top Recipes</h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Most planned this week + meal variety</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <TopRecipes topRecipes={topRecipes} />
          </div>
        </div>

      </div>
    </div>
  );
}