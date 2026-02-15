import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TrendingUp, DollarSign, Calendar as CalendarIcon, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, LayoutGrid, CalendarDays, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function BudgetTrackerPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Update time every second for real-time display
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

  // Format time in Philippine timezone
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

  // Calendar data - transactions by day
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
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-rose-50/30">
      <Sidebar onLogout={handleLogout} activeSection="budget" />
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Header with Real-Time Clock */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent mb-2 tracking-tight pb-3">
                Budget Tracker
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Monitor your spending and stay on track</p>
              
              {/* Real-time Philippine Time Display */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-sm">
                  <Clock className="w-4 h-4 text-orange-600 animate-pulse" />
                  <span className="font-semibold text-orange-900">{formatPhilippineTime(currentTime)}</span>
                </div>
                <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200/50 shadow-sm">
                  <span className="text-gray-700 font-medium">{formatPhilippineDate(currentTime)}</span>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200/50 shadow-lg self-start">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
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
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
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
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {[
                { label: 'Monthly Budget', value: '₱600', change: '+5%', icon: DollarSign, gradient: 'from-emerald-400 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100/50' },
                { label: 'Spent This Month', value: '₱475', change: '-12%', icon: TrendingUp, gradient: 'from-blue-400 to-blue-600', bgGradient: 'from-blue-50 to-blue-100/50' },
                { label: 'Remaining', value: '₱125', change: '+8%', icon: ArrowUp, gradient: 'from-orange-400 to-orange-600', bgGradient: 'from-orange-50 to-orange-100/50' },
                { label: 'Avg Per Week', value: '₱118.75', change: '-3%', icon: CalendarIcon, gradient: 'from-purple-400 to-purple-600', bgGradient: 'from-purple-50 to-purple-100/50' },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={idx} 
                    className={`group relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Decorative gradient orb */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                          stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {stat.change.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {stat.change}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide mb-1">{stat.label}</div>
                      <div className="text-2xl sm:text-3xl font-black text-gray-900">{stat.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Weekly Spending Chart */}
              <div className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/50 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
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
                            <span className="text-sm sm:text-base font-bold text-gray-900">{week.week}</span>
                            <span className="text-xs text-gray-500 ml-2">{week.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm sm:text-base font-black ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                              ₱{week.amount}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 font-medium">/ ₱{week.budget}</span>
                          </div>
                        </div>
                        <div className="relative w-full bg-gray-100 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                              isOverBudget 
                                ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600' 
                                : 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600'
                            } shadow-md group-hover:shadow-lg`}
                            style={{ 
                              width: `${Math.min(percentage, 100)}%`,
                              animationDelay: `${idx * 150}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/50 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Recent
                </h3>
                <div className="space-y-2 sm:space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {recentTransactions.map((transaction, idx) => (
                    <div 
                      key={idx} 
                      className="group p-3 sm:p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50/50 rounded-xl sm:rounded-2xl border border-gray-200/50 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900 text-sm sm:text-base">{transaction.name}</span>
                        <span className="font-black text-gray-900 text-sm sm:text-base">₱{transaction.amount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{transaction.date}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500">{transaction.time}</span>
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
          /* Calendar View */
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200/50 shadow-xl">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">{monthName}</h3>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => changeMonth('prev')}
                  className="p-2 sm:p-3 hover:bg-orange-50 rounded-xl transition-all duration-200 cursor-pointer group border border-gray-200 hover:border-orange-300"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base cursor-pointer"
                >
                  Today
                </button>
                <button
                  onClick={() => changeMonth('next')}
                  className="p-2 sm:p-3 hover:bg-orange-50 rounded-xl transition-all duration-200 cursor-pointer group border border-gray-200 hover:border-orange-300"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-gray-600 text-xs sm:text-sm py-2">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.charAt(0)}</span>
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square"></div>
              ))}

              {/* Calendar days */}
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
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg'
                        : hasTransactions
                        ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm mb-1" className={isToday ? 'text-orange-600' : 'text-gray-900'}>
                      {day}
                    </div>
                    {hasTransactions && (
                      <div className="space-y-0.5 sm:space-y-1">
                        {dayTransactions.slice(0, 2).map((transaction, tIdx) => (
                          <div
                            key={tIdx}
                            className="text-[10px] sm:text-xs font-semibold truncate bg-white/80 px-1 sm:px-1.5 py-0.5 sm:py-1 rounded border border-gray-200"
                          >
                            ₱{transaction.amount}
                          </div>
                        ))}
                        {dayTransactions.length > 2 && (
                          <div className="text-[10px] text-gray-500 font-semibold">
                            +{dayTransactions.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50"></div>
                <span className="text-gray-600 font-semibold">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-emerald-200 bg-emerald-50/50"></div>
                <span className="text-gray-600 font-semibold">Has Transactions</span>
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
          background: #f1f1f1;
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