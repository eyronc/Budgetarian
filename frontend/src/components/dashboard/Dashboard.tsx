import { TrendingUp, Calendar, Utensils, Apple, Flame, DollarSign, ChevronRight, Clock, Target, Sparkles, Award, TrendingDown } from 'lucide-react';

interface DashboardProps {
  userEmail: string;
}

export function Dashboard({ userEmail }: DashboardProps) {
  const firstName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-blue-200/30 to-transparent rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
      
      <div className="relative">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Welcome back, {firstName}!
                </h1>
                <span className="text-3xl sm:text-4xl animate-wave">👋</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base font-medium">
                Here's your meal planning overview for this week
              </p>
            </div>
            <button className="group w-full sm:w-auto px-6 py-3.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-emerald-700 hover:shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Plan Week
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Budget Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-emerald-100/50 hover:border-emerald-300/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-400/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-emerald-300/50">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Weekly Budget</h3>
              <p className="text-4xl font-black bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">$150</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  $45 remaining
                </p>
                <div className="text-xs text-gray-500 font-semibold px-2 py-1 bg-gray-100 rounded-lg">70% used</div>
              </div>
              <div className="w-full bg-linear-to-r from-gray-100 to-gray-50 rounded-full h-2.5 overflow-hidden shadow-inner">
                <div className="bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600 h-2.5 rounded-full transition-all duration-1000 shadow-md relative overflow-hidden" style={{ width: '70%' }}>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Meals Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100/50 hover:border-blue-300/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-300/50">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Meals Planned</h3>
              <p className="text-4xl font-black bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">21</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-blue-600 font-bold flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  7 days covered
                </p>
                <div className="text-xs text-gray-500 font-semibold px-2 py-1 bg-gray-100 rounded-lg">100%</div>
              </div>
              <div className="flex gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-2.5 bg-linear-to-t from-blue-500 to-blue-400 rounded-full shadow-sm group-hover:scale-y-125 transition-transform duration-300"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Calories Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-orange-100/50 hover:border-orange-300/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-400/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-orange-300/50">
                <Flame className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Avg Calories</h3>
              <p className="text-4xl font-black bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">2,100</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-orange-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  On track
                </p>
                <div className="text-xs text-gray-500 font-semibold px-2 py-1 bg-gray-100 rounded-lg">Target: 2,000</div>
              </div>
              <div className="w-full bg-linear-to-r from-gray-100 to-gray-50 rounded-full h-2.5 overflow-hidden shadow-inner">
                <div className="bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-1000 shadow-md" style={{ width: '105%' }}></div>
              </div>
            </div>
          </div>

          {/* Nutrition Card */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100/50 hover:border-green-300/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-400/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-green-300/50">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Nutrition Score</h3>
              <p className="text-4xl font-black bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">85%</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-green-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Excellent
                </p>
                <div className="text-xs text-gray-500 font-semibold px-2 py-1 bg-gray-100 rounded-lg">+5% this week</div>
              </div>
              <div className="flex gap-2">
                {[
                  { label: 'Protein', value: 'High', color: 'emerald' },
                  { label: 'Fiber', value: 'Good', color: 'emerald' },
                  { label: 'Vitamins', value: 'Med', color: 'orange' }
                ].map((item, i) => (
                  <div key={i} className="flex-1 text-center bg-linear-to-br from-gray-50 to-white rounded-xl p-2 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1 font-semibold">{item.label}</div>
                    <div className={`text-xs font-black text-${item.color}-600`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Meals */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-300/50">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Today's Meals
              </h2>
              <button className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-all hover:scale-105 flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-emerald-50">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { meal: 'Breakfast', name: 'Avocado Toast & Eggs', time: '8:00 AM', calories: 450, emoji: '🥑', gradient: 'from-yellow-400 to-yellow-600' },
                { meal: 'Lunch', name: 'Grilled Chicken Salad', time: '12:30 PM', calories: 520, emoji: '🥗', gradient: 'from-blue-400 to-blue-600' },
                { meal: 'Dinner', name: 'Salmon with Vegetables', time: '7:00 PM', calories: 680, emoji: '🐟', gradient: 'from-purple-400 to-purple-600' }
              ].map((item, index) => (
                <div key={index} className="group flex items-center gap-4 p-5 rounded-2xl bg-linear-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-emerald-200 hover:shadow-lg">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-linear-to-br ${item.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 py-1 bg-gray-100 rounded-lg">{item.meal}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-base">{item.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      {item.calories} calories
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-300/50">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Weekly Goals
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Budget Target', current: 70, target: 100, color: 'emerald', unit: '%', gradient: 'from-emerald-400 to-emerald-600' },
                { label: 'Meal Prep', current: 5, target: 7, color: 'blue', unit: 'days', gradient: 'from-blue-400 to-blue-600' },
                { label: 'Calorie Goal', current: 2100, target: 2000, color: 'orange', unit: 'kcal', gradient: 'from-orange-400 to-orange-600' }
              ].map((goal, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-gray-700">{goal.label}</span>
                    <span className="text-sm font-black bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {goal.current}{goal.unit === '%' ? '' : ` ${goal.unit}`} / {goal.target}{goal.unit === '%' ? '%' : ` ${goal.unit}`}
                    </span>
                  </div>
                  <div className="w-full bg-linear-to-r from-gray-100 to-gray-50 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className={`bg-linear-to-r ${goal.gradient} h-3 rounded-full transition-all duration-1000 shadow-md group-hover:shadow-lg relative overflow-hidden`}
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-linear-to-br from-emerald-50 via-emerald-50/50 to-white rounded-2xl border-2 border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-300/50 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Great Progress!</h3>
                  <p className="text-xs text-emerald-700 font-semibold">Keep up the good work</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                You're staying on budget and hitting your nutrition goals. 🎉
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Add Meal', gradient: 'from-emerald-400 to-emerald-600', hover: 'hover:border-emerald-300' },
            { icon: TrendingUp, label: 'Track Expense', gradient: 'from-blue-400 to-blue-600', hover: 'hover:border-blue-300' },
            { icon: Utensils, label: 'View Recipes', gradient: 'from-purple-400 to-purple-600', hover: 'hover:border-purple-300' },
            { icon: Apple, label: 'Nutrition Tips', gradient: 'from-orange-400 to-orange-600', hover: 'hover:border-orange-300' }
          ].map((action, index) => (
            <button
              key={index}
              className={`group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-gray-100/50 ${action.hover} hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105`}
            >
              <div className={`w-12 h-12 bg-linear-to-br ${action.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-bold text-gray-700 text-center">{action.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}