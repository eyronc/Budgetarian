import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Calendar as CalendarIcon, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, LayoutGrid, CalendarDays, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function BudgetTrackerPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const formatPhilippineTime = (date: Date) => {
    return date.toLocaleString('en-PH', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatPhilippineDate = (date: Date) => {
    return date.toLocaleDateString('en-PH', {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const weeklySpending = [
    { week: 'Week 1', amount: 145, budget: 150, date: 'Feb 1-7' },
    { week: 'Week 2', amount: 132, budget: 150, date: 'Feb 8-14' },
    { week: 'Week 3', amount: 158, budget: 150, date: 'Feb 15-21' },
    { week: 'Week 4', amount: 140, budget: 150, date: 'Feb 22-28' },
  ];

  const recentTransactions = [
    { name: 'Whole Foods Market', amount: 45.32, date: 'Feb 15', time: '2:30 PM', category: 'Groceries', color: 'emerald' },
    { name: 'Trader Joe\'s', amount: 32.18, date: 'Feb 13', time: '11:45 AM', category: 'Groceries', color: 'blue' },
    { name: 'Local Farmers Market', amount: 28.50, date: 'Feb 11', time: '9:15 AM', category: 'Produce', color: 'green' },
    { name: 'Costco', amount: 89.99, date: 'Feb 9', time: '4:20 PM', category: 'Bulk', color: 'orange' },
    { name: 'Starbucks', amount: 12.50, date: 'Feb 8', time: '8:00 AM', category: 'Coffee', color: 'amber' },
    { name: 'Amazon Fresh', amount: 67.80, date: 'Feb 6', time: '3:45 PM', category: 'Delivery', color: 'purple' },
  ];

  const calendarTransactions: { [key: string]: typeof recentTransactions } = {
    '15': [recentTransactions[0]],
    '13': [recentTransactions[1]],
    '11': [recentTransactions[2]],
    '9': [recentTransactions[3]],
    '8': [recentTransactions[4]],
    '6': [recentTransactions[5]],
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800' 
        : 'bg-linear-to-br from-amber-50 via-orange-50/40 to-rose-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="budget" />
      
      <div className="flex-1 mt-5 pt-20 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-3 transition-colors ${
                darkMode
                  ? 'bg-linear-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent'
                  : 'bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent'
              }`}>
                Budget Tracker
              </h1>
              <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Monitor your spending and stay on track
              </p>
              
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <div className={`flex items-center gap-2 px-3 py-1.5 backdrop-blur-sm rounded-full shadow-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-800/80 border border-orange-700/50' 
                    : 'bg-white/80 border border-orange-200/50'
                }`}>
                  <Clock className="w-4 h-4 text-orange-600 animate-pulse" />
                  <span className={`font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-900'}`}>
                    {formatPhilippineTime(currentTime)}
                  </span>
                </div>
                <div className={`px-3 py-1.5 backdrop-blur-sm rounded-full shadow-sm transition-colors ${
                  darkMode 
                    ? 'bg-gray-800/80 border border-orange-700/50 text-gray-300' 
                    : 'bg-white/80 border border-orange-200/50 text-gray-700'
                }`}>
                  <span className="font-medium">{formatPhilippineDate(currentTime)}</span>
                </div>
              </div>
            </div>

            <div className={`flex gap-2 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg self-start transition-colors ${
              darkMode 
                ? 'bg-gray-800/80 border border-gray-700/50' 
                : 'bg-white/80 border border-gray-200/50'
            }`}>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : darkMode 
                      ? 'text-gray-400 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">List View</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  viewMode === 'calendar'
                    ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : darkMode 
                      ? 'text-gray-400 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Calendar</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {[
                { label: 'Monthly Budget', value: 600, icon: '₱', gradient: 'from-emerald-400 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100/50', change: '+5%', up: true },
                { label: 'Spent This Month', value: 475, icon: '₱', gradient: 'from-blue-400 to-blue-600', bgGradient: 'from-blue-50 to-blue-100/50', change: '-12%', up: false },
                { label: 'Remaining', value: 125, icon: '₱', gradient: 'from-orange-400 to-orange-600', bgGradient: 'from-orange-50 to-orange-100/50', change: '+8%', up: true },
                { label: 'Avg Per Week', value: 118.75, icon: CalendarIcon, gradient: 'from-purple-400 to-purple-600', bgGradient: 'from-purple-50 to-purple-100/50', change: '-3%', up: false },
              ].map((stat, idx) => {
                const isTextIcon = typeof stat.icon === 'string';
                const Icon = !isTextIcon ? stat.icon as typeof CalendarIcon : null;
                
                return (
                  <div 
                    key={idx} 
                    className={`group relative backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                      darkMode
                        ? 'bg-gray-800/90 border-gray-700/50'
                        : `bg-linear-to-br ${stat.bgGradient} border-white/60`
                    }`}
                  >
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          {isTextIcon ? (
                            <span className="text-xl sm:text-2xl font-black text-white">{stat.icon as string}</span>
                          ) : Icon && (
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                          stat.up ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {stat.change}
                        </div>
                      </div>
                      <div className={`text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 transition-colors ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{stat.label}</div>
                      <div className="flex items-baseline gap-1">
                        {isTextIcon && <span className={`text-xl sm:text-2xl font-black transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>₱</span>}
                        <span className={`text-2xl sm:text-3xl font-black transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{stat.value}</span>
                      </div>
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
                <h3 className={`text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2 transition-colors ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <div className="w-1.5 h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Weekly Spending
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  {weeklySpending.map((week, idx) => {
                    const percentage = (week.amount / week.budget) * 100;
                    const isOverBudget = week.amount > week.budget;
                    return (
                      <div key={idx} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className={`text-sm sm:text-base font-bold transition-colors ${
                              darkMode ? 'text-gray-200' : 'text-gray-900'
                            }`}>{week.week}</span>
                            <span className={`text-xs ml-2 transition-colors ${
                              darkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>{week.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm sm:text-base font-black ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                              ₱{week.amount}
                            </span>
                            <span className={`text-xs sm:text-sm font-medium transition-colors ${
                              darkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>/ ₱{week.budget}</span>
                          </div>
                        </div>
                        <div className={`relative w-full rounded-full h-3 sm:h-4 overflow-hidden shadow-inner ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                              isOverBudget 
                                ? 'bg-linear-to-r from-red-400 via-red-500 to-red-600' 
                                : 'bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600'
                            } shadow-md group-hover:shadow-lg`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
                darkMode 
                  ? 'bg-gray-800/90 border-gray-700/50' 
                  : 'bg-white/90 border-gray-200/50'
              }`}>
                <h3 className={`text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2 transition-colors ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <div className="w-1.5 h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Recent
                </h3>
                <div className="space-y-2 sm:space-y-3 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
                  {recentTransactions.map((transaction, idx) => (
                    <div 
                      key={idx} 
                      className={`group p-3 sm:p-4 rounded-xl sm:rounded-2xl border hover:shadow-lg transition-all duration-300 cursor-pointer ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600/50 hover:border-orange-500/50'
                          : 'bg-linear-to-r from-gray-50 via-white to-gray-50/50 border-gray-200/50 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-bold text-sm sm:text-base transition-colors ${
                          darkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>{transaction.name}</span>
                        <span className={`font-black text-sm sm:text-base transition-colors ${
                          darkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>₱{transaction.amount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{transaction.date}</span>
                          <span className={`transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                          <span className={`transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{transaction.time}</span>
                        </div>
                        <span className={`font-bold bg-${transaction.color}-100 text-${transaction.color}-700 px-2 py-1 rounded-lg`}>
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border shadow-xl transition-colors ${
            darkMode 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className={`text-2xl sm:text-3xl font-black transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{monthName}</h3>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => changeMonth('prev')}
                  className={`p-2 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer group border ${
                    darkMode 
                      ? 'hover:bg-gray-700 border-gray-600 hover:border-orange-500' 
                      : 'hover:bg-orange-50 border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <ChevronLeft className={`w-5 h-5 transition-colors ${
                    darkMode 
                      ? 'text-gray-400 group-hover:text-orange-400' 
                      : 'text-gray-600 group-hover:text-orange-600'
                  }`} />
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
                >
                  Today
                </button>
                <button
                  onClick={() => changeMonth('next')}
                  className={`p-2 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer group border ${
                    darkMode 
                      ? 'hover:bg-gray-700 border-gray-600 hover:border-orange-500' 
                      : 'hover:bg-orange-50 border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <ChevronRight className={`w-5 h-5 transition-colors ${
                    darkMode 
                      ? 'text-gray-400 group-hover:text-orange-400' 
                      : 'text-gray-600 group-hover:text-orange-600'
                  }`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className={`text-center font-bold text-xs sm:text-sm py-2 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.charAt(0)}</span>
                </div>
              ))}

              {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const dayTransactions = calendarTransactions[day.toString()] || [];
                const hasTransactions = dayTransactions.length > 0;
                const isToday = day === new Date().getDate() && 
                               selectedDate.getMonth() === new Date().getMonth() &&
                               selectedDate.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`aspect-square p-1 sm:p-2 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      isToday
                        ? 'border-orange-500 bg-linear-to-br from-orange-50 to-amber-50 shadow-lg'
                        : hasTransactions
                        ? darkMode
                          ? 'border-emerald-600 bg-emerald-900/20 hover:border-emerald-500 hover:shadow-md'
                          : 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:shadow-md'
                        : darkMode
                        ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`font-bold text-xs sm:text-sm mb-1 transition-colors ${
                      isToday 
                        ? 'text-orange-600' 
                        : darkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-900'
                    }`}>
                      {day}
                    </div>
                    {hasTransactions && (
                      <div className="space-y-0.5 sm:space-y-1">
                        {dayTransactions.slice(0, 2).map((transaction, tIdx) => (
                          <div
                            key={tIdx}
                            className={`text-[10px] sm:text-xs font-semibold truncate px-1 sm:px-1.5 py-0.5 sm:py-1 rounded border ${
                              darkMode
                                ? 'bg-gray-700/80 border-gray-600'
                                : 'bg-white/80 border-gray-200'
                            }`}
                          >
                            ₱{transaction.amount}
                          </div>
                        ))}
                        {dayTransactions.length > 2 && (
                          <div className={`text-[10px] font-semibold transition-colors ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            +{dayTransactions.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-orange-500 bg-linear-to-br from-orange-50 to-amber-50"></div>
                <span className={`font-semibold transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 ${
                  darkMode 
                    ? 'border-emerald-600 bg-emerald-900/20' 
                    : 'border-emerald-200 bg-emerald-50/50'
                }`}></div>
                <span className={`font-semibold transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Has Transactions</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#f1f1f1'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #f59e0b);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #d97706);
        }
      `}</style>
    </div>
  );
}