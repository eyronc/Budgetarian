import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import React from 'react';
import { TrendingUp, Calendar, ShoppingCart, Sparkles } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function DashboardPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const { darkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const firstName = userEmail.split('@')[0] || 'User';
  const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800' 
        : 'bg-linear-to-br from-emerald-50 via-teal-50/40 to-cyan-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="dashboard" />
      
      <div className="flex-1 mt-5 pt-20 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-1 transition-colors ${
            darkMode
              ? 'bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent'
              : 'bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent'
          }`}>
            Welcome back, {capitalizedName}!
          </h1>
          <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's your budget overview and meal planning summary
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {[
            { label: 'Weekly Budget', value: '₱150', status: '21% left', icon: '₱', gradient: 'from-emerald-400 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100/50', link: '/budget' },
            { label: 'Meals Planned', value: '18', status: 'This week', icon: Calendar, gradient: 'from-blue-400 to-blue-600', bgGradient: 'from-blue-50 to-blue-100/50', link: '/meal-plans' },
            { label: 'Grocery Items', value: '12', status: '4 checked', icon: ShoppingCart, gradient: 'from-purple-400 to-purple-600', bgGradient: 'from-purple-50 to-purple-100/50', link: '/grocery' },
            { label: 'Saved This Month', value: '₱125', status: '+15%', icon: '₱', gradient: 'from-orange-400 to-orange-600', bgGradient: 'from-orange-50 to-orange-100/50', link: '/budget' },
          ].map((stat, idx) => {
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
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3 sm:mb-4`}>
                    {isTextIcon ? (
                      <span className="text-xl sm:text-2xl font-black text-white">{stat.icon as string}</span>
                    ) : (
                      React.createElement(stat.icon as React.ComponentType<any>, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" })
                    )}
                  </div>
                  <div className={`text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{stat.label}</div>
                  <div className={`text-2xl sm:text-3xl font-black mb-1 transition-colors ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{stat.value}</div>
                  <div className={`text-xs font-semibold transition-colors ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>{stat.status}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className={`lg:col-span-2 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
            darkMode 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className={`text-xl sm:text-2xl font-black flex items-center gap-2 transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <div className="w-1.5 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Today's Meals
              </h3>
              <button 
                onClick={() => navigate('/meal-plans')}
                className={`text-sm font-semibold transition-colors cursor-pointer ${
                  darkMode 
                    ? 'text-emerald-400 hover:text-emerald-300' 
                    : 'text-emerald-600 hover:text-emerald-700'
                }`}
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                { name: 'Avocado Toast & Eggs', time: 'Breakfast', emoji: '🥑', calories: 450 },
                { name: 'Grilled Chicken Salad', time: 'Lunch', emoji: '🥗', calories: 520 },
                { name: 'Salmon with Vegetables', time: 'Dinner', emoji: '🐟', calories: 680 },
              ].map((meal, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('/meal-plans')}
                  className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                    darkMode
                      ? 'bg-linear-to-r from-gray-700/50 to-gray-700/30 border-gray-600 hover:border-emerald-500 hover:shadow-md'
                      : 'bg-linear-to-r from-gray-50 to-white border-gray-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:scale-110 transition-transform">
                    {meal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className={`text-xs font-bold uppercase tracking-wide mb-1 transition-colors ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>{meal.time}</div>
                    <div className={`font-bold text-sm sm:text-base transition-colors ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{meal.name}</div>
                  </div>
                  <div className="text-sm font-black text-emerald-600">{meal.calories} cal</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-xl transition-colors ${
              darkMode 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-lg sm:text-xl font-black mb-4 transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Budget Status</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Monthly Progress</span>
                  <span className="text-lg font-black text-emerald-600">79%</span>
                </div>
                <div className={`w-full rounded-full h-3 overflow-hidden shadow-inner ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="bg-linear-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-700" style={{ width: '79%' }}></div>
                </div>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl border ${
                darkMode
                  ? 'bg-linear-to-r from-emerald-900/30 to-teal-900/20 border-emerald-700'
                  : 'bg-linear-to-r from-emerald-50 to-teal-50 border-emerald-200'
              }`}>
                <span className={`text-sm font-bold transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Remaining</span>
                <span className={`text-xl font-black ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-700'
                }`}>₱125</span>
              </div>
            </div>

            <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-xl transition-colors ${
              darkMode 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <h3 className={`text-lg sm:text-xl font-black mb-4 transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/meal-plans')}
                  className={`w-full p-3 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between ${
                    darkMode
                      ? 'bg-linear-to-r from-blue-900/40 to-indigo-900/30 text-blue-300 hover:from-blue-900/60 hover:to-indigo-900/50'
                      : 'bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700'
                  }`}
                >
                  <span>Plan Meals</span>
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/grocery')}
                  className={`w-full p-3 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between ${
                    darkMode
                      ? 'bg-linear-to-r from-purple-900/40 to-pink-900/30 text-purple-300 hover:from-purple-900/60 hover:to-pink-900/50'
                      : 'bg-linear-to-r from-purple-50 to-pink-50 text-purple-700'
                  }`}
                >
                  <span>Grocery List</span>
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/budget')}
                  className={`w-full p-3 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between ${
                    darkMode
                      ? 'bg-linear-to-r from-orange-900/40 to-amber-900/30 text-orange-300 hover:from-orange-900/60 hover:to-amber-900/50'
                      : 'bg-linear-to-r from-orange-50 to-amber-50 text-orange-700'
                  }`}
                >
                  <span>Track Budget</span>
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <h3 className="text-lg font-black">Weekly Tip</h3>
              </div>
              <p className="text-sm leading-relaxed opacity-95">
                Meal prep on Sundays can save you up to 4 hours during the week and reduce food waste by 30%!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}