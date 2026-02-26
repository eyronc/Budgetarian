import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { StatCard } from '../components/analytics/StatCard';
import { SpendingChart } from '../components/analytics/SpendingChart';
import { NutritionChart } from '../components/analytics/NutritionChart';
import { CategoryBreakdown } from '../components/analytics/CategoryBreakdown';
import { SavingsTracker } from '../components/analytics/SavingsTracker';
import { TopRecipes } from '../components/analytics/TopRecipes';
import { useDarkMode } from '../contexts/DarkModeContext';
import {
  BarChart2, Wallet, Flame, ShoppingBag, TrendingUp, Leaf, Star
} from 'lucide-react';

const STAT_CARDS = [
  {
    icon: Wallet,
    label: 'Monthly Spend',
    value: '₱475',
    sub: 'of ₱1,000 budget',
    gradient: 'from-emerald-400 to-emerald-600',
    change: -8,
    changeLabel: 'vs last month',
  },
  {
    icon: Flame,
    label: 'Avg Daily Calories',
    value: '1,740',
    sub: 'kcal per day',
    gradient: 'from-orange-400 to-rose-500',
    change: 3,
    changeLabel: 'vs last week',
  },
  {
    icon: ShoppingBag,
    label: 'Grocery Trips',
    value: '8',
    sub: 'this month',
    gradient: 'from-purple-400 to-purple-600',
    change: -2,
    changeLabel: 'vs last month',
  },
  {
    icon: Leaf,
    label: 'Budget Saved',
    value: '₱525',
    sub: 'from budget this month',
    gradient: 'from-teal-400 to-cyan-500',
    change: 25,
    changeLabel: 'vs last month',
  },
];

export function AnalyticsPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const { darkMode } = useDarkMode();
  const [spendView, setSpendView] = useState('weekly');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800'
        : 'bg-linear-to-br from-violet-50 via-indigo-50/40 to-cyan-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="analytics" />

      <div className="flex-1 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

        {/* Header */}
        <div className="mb-5 sm:mb-8">
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-2 tracking-tight pb-3 bg-linear-to-r bg-clip-text text-transparent ${
            darkMode
              ? 'from-violet-400 via-indigo-400 to-cyan-400'
              : 'from-violet-600 via-indigo-600 to-cyan-600'
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

          {/* Spending Chart */}
          <div className={`lg:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Spending Overview
                </h2>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Budget vs actual spend
                </p>
              </div>
              {/* Toggle */}
              <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {['weekly', 'monthly'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setSpendView(v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      spendView === v
                        ? darkMode
                          ? 'bg-gray-600 text-gray-100 shadow'
                          : 'bg-white text-gray-900 shadow'
                        : darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <SpendingChart view={spendView} />
          </div>

          {/* Category Breakdown */}
          <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="mb-5">
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                By Category
              </h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Where your grocery money goes
              </p>
            </div>
            <CategoryBreakdown />
          </div>
        </div>

        {/* Row 2: Savings Tracker + Nutrition + Top Recipes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Savings Tracker */}
          <div className={`lg:col-span-2 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="mb-5">
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Savings Tracker
              </h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Monthly savings vs ₱200 target
              </p>
            </div>
            <SavingsTracker />
          </div>

          {/* Nutrition */}
          <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="mb-5">
              <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Nutrition
              </h2>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Today's macro breakdown
              </p>
            </div>
            <NutritionChart />
          </div>

          {/* Top Recipes - full width */}
          <div className={`lg:col-span-3 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-lg ${
            darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-white/60'
          }`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-linear-to-br from-rose-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Top Recipes
                </h2>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Most cooked this month + money saved
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <TopRecipes />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}