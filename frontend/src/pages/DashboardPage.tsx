import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TrendingUp, Calendar, ShoppingCart, Utensils, DollarSign, ArrowUp, Sparkles } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Extract first name from email
  const firstName = userEmail.split('@')[0] || 'User';
  const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/40 to-cyan-50/30">
      <Sidebar onLogout={handleLogout} activeSection="dashboard" />
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent mb-2 tracking-tight pb-1">
            Welcome back, {capitalizedName}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Here's your budget overview and meal planning summary</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {[
            { label: 'Weekly Budget', value: '₱150', status: '21% left', icon: DollarSign, gradient: 'from-emerald-400 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100/50', link: '/budget' },
            { label: 'Meals Planned', value: '18', status: 'This week', icon: Calendar, gradient: 'from-blue-400 to-blue-600', bgGradient: 'from-blue-50 to-blue-100/50', link: '/meal-plans' },
            { label: 'Grocery Items', value: '12', status: '4 checked', icon: ShoppingCart, gradient: 'from-purple-400 to-purple-600', bgGradient: 'from-purple-50 to-purple-100/50', link: '/grocery' },
            { label: 'Saved This Month', value: '₱125', status: '+15%', icon: ArrowUp, gradient: 'from-orange-400 to-orange-600', bgGradient: 'from-orange-50 to-orange-100/50', link: '/budget' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                onClick={() => navigate(stat.link)}
                className={`group relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Decorative gradient orb */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3 sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide mb-1">{stat.label}</div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-semibold">{stat.status}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Today's Meals */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/50 shadow-xl">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Today's Meals
              </h3>
              <button 
                onClick={() => navigate('/meal-plans')}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
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
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:scale-110 transition-transform">
                    {meal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{meal.time}</div>
                    <div className="font-bold text-sm sm:text-base text-gray-900">{meal.name}</div>
                  </div>
                  <div className="text-sm font-black text-emerald-600">{meal.calories} cal</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 sm:space-y-5">
            {/* Budget Status */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-200/50 shadow-xl">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">Budget Status</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Monthly Progress</span>
                  <span className="text-lg font-black text-emerald-600">79%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-700" style={{ width: '79%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <span className="text-sm font-bold text-gray-700">Remaining</span>
                <span className="text-xl font-black text-emerald-700">₱125</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-200/50 shadow-xl">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/meal-plans')}
                  className="w-full p-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between"
                >
                  <span>Plan Meals</span>
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/grocery')}
                  className="w-full p-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between"
                >
                  <span>Grocery List</span>
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/budget')}
                  className="w-full p-3 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 font-bold rounded-xl hover:shadow-md transition-all text-sm cursor-pointer flex items-center justify-between"
                >
                  <span>Track Budget</span>
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekly Tip */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl text-white">
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