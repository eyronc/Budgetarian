import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Calendar, Plus, ChevronLeft, ChevronRight, Flame, Clock, Users } from 'lucide-react';
import { useState } from 'react';

export function MealPlansPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [selectedDay, setSelectedDay] = useState(0);

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

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30">
      <Sidebar onLogout={handleLogout} activeSection="meal-plans" />
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 tracking-tight pb-3">
                Meal Plans
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Plan your weekly meals and track nutrition</p>
            </div>
            <button className="px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-300/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base">
              <Plus className="w-5 h-5" />
              Generate Plan
            </button>
          </div>
        </div>

        {/* Week Navigator */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-blue-200/50 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button className="p-2 sm:p-3 hover:bg-blue-50 rounded-xl transition-all cursor-pointer group border border-gray-200 hover:border-blue-300">
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="font-black text-base sm:text-lg text-gray-900">Feb 15 - Feb 21, 2026</span>
            </div>
            <button className="p-2 sm:p-3 hover:bg-blue-50 rounded-xl transition-all cursor-pointer group border border-gray-200 hover:border-blue-300">
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {daysOfWeek.map((day, idx) => (
              <button
                key={day.short}
                onClick={() => setSelectedDay(idx)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer min-w-[70px] sm:min-w-[80px] ${
                  selectedDay === idx
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <span className={`text-xs sm:text-sm font-bold ${selectedDay === idx ? 'text-blue-600' : 'text-gray-500'}`}>
                  {day.short}
                </span>
                <span className={`text-xl sm:text-2xl font-black ${selectedDay === idx ? 'text-blue-600' : 'text-gray-900'}`}>
                  {day.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Meals for Selected Day */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/50 shadow-xl">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  {daysOfWeek[selectedDay].full}, Feb {daysOfWeek[selectedDay].date}
                </h2>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span className="font-black text-sm sm:text-base text-gray-900">{totalCalories} cal</span>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-r from-white via-gray-50/50 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Emoji Icon */}
                      <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${meal.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {meal.emoji}
                      </div>

                      {/* Meal Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">{meal.time}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {meal.timeSlot}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2">{meal.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{meal.description}</p>

                        {/* Nutrition Info */}
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
          </div>

          {/* Daily Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-200/50 shadow-xl lg:sticky lg:top-8 space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-5">Daily Summary</h3>
                
                {/* Total Calories */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 mb-4 sm:mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm sm:text-base font-bold text-gray-700">Total Calories</span>
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {totalCalories}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">calories</div>
                </div>

                {/* Macros Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                    <div className="text-xl sm:text-2xl font-black text-blue-600">{totalProtein}g</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 font-bold mt-1">Protein</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                    <div className="text-xl sm:text-2xl font-black text-green-600">
                      {meals.reduce((sum, meal) => sum + meal.carbs, 0)}g
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600 font-bold mt-1">Carbs</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
                    <div className="text-xl sm:text-2xl font-black text-amber-600">
                      {meals.reduce((sum, meal) => sum + meal.fat, 0)}g
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600 font-bold mt-1">Fat</div>
                  </div>
                </div>

                {/* Meal Distribution */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm sm:text-base font-bold text-gray-700">Meal Distribution</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {meals.map((meal, idx) => {
                      const percentage = (meal.calories / totalCalories) * 100;
                      return (
                        <div key={idx}>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="font-semibold text-gray-700">{meal.time}</span>
                            <span className="font-bold text-gray-900">{Math.round(percentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`bg-gradient-to-r ${meal.gradient} h-2 rounded-full transition-all duration-700`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-300/50 hover:scale-105 transition-all text-sm sm:text-base cursor-pointer">
                  Edit Today's Plan
                </button>
                <button className="w-full py-3 sm:py-3.5 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all text-sm sm:text-base cursor-pointer">
                  View Recipes
                </button>
              </div>

              {/* Weekly Progress */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm sm:text-base font-bold text-gray-700">Weekly Progress</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-600 mb-1">5/7</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Days planned this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}