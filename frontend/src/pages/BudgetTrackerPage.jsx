import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Calendar as CalendarIcon, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, LayoutGrid, CalendarDays, Clock, Plus, X, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

// ── Storage helpers ───────────────────────────────────────────────────────────
const STORAGE_KEY = 'budgetTransactions';
const MONTHLY_BUDGET_KEY = 'budgetMonthlyLimit';

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveTransactions(txs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
}

function loadMonthlyBudget() {
  const saved = localStorage.getItem(MONTHLY_BUDGET_KEY);
  return saved ? parseFloat(saved) : null;
}

function saveMonthlyBudget(val) {
  if (val === null) {
    localStorage.removeItem(MONTHLY_BUDGET_KEY);
  } else {
    localStorage.setItem(MONTHLY_BUDGET_KEY, String(val));
  }
}

// ── Category colours ──────────────────────────────────────────────────────────
const CATEGORIES = ['Groceries', 'Produce', 'Bulk', 'Coffee', 'Delivery', 'Dining', 'Transport', 'Other'];

const categoryColor = {
  Groceries: 'emerald', Produce: 'green', Bulk: 'orange',
  Coffee: 'amber', Delivery: 'purple', Dining: 'rose',
  Transport: 'blue', Other: 'gray',
};

const categoryBadgeLight = {
  emerald: 'bg-emerald-100 text-emerald-700', blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700', orange: 'bg-orange-100 text-orange-700',
  amber: 'bg-amber-100 text-amber-700', purple: 'bg-purple-100 text-purple-700',
  rose: 'bg-rose-100 text-rose-700', gray: 'bg-gray-100 text-gray-700',
};

const categoryBadgeDark = {
  emerald: 'bg-emerald-900/40 text-emerald-400', blue: 'bg-blue-900/40 text-blue-400',
  green: 'bg-green-900/40 text-green-400', orange: 'bg-orange-900/40 text-orange-400',
  amber: 'bg-amber-900/40 text-amber-400', purple: 'bg-purple-900/40 text-purple-400',
  rose: 'bg-rose-900/40 text-rose-400', gray: 'bg-gray-700 text-gray-400',
};

const dotColor = {
  emerald: 'bg-emerald-500', blue: 'bg-blue-500', green: 'bg-green-500',
  orange: 'bg-orange-500', amber: 'bg-amber-500', purple: 'bg-purple-500',
  rose: 'bg-rose-500', gray: 'bg-gray-500',
};

// ── Date helpers ──────────────────────────────────────────────────────────────
function toDateKey(dateStr) {
  // dateStr is YYYY-MM-DD
  return dateStr;
}

function formatDisplayDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

function todayISO() {
  const now = new Date();
  return now.toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }); // YYYY-MM-DD
}

function getMonthISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

// ── Toast notification ────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border font-semibold text-sm animate-slide-up ${
      type === 'success'
        ? 'bg-emerald-500 border-emerald-400 text-white'
        : type === 'warning'
        ? 'bg-orange-500 border-orange-400 text-white'
        : 'bg-red-500 border-red-400 text-white'
    }`}>
      {type === 'success' ? <Check className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 opacity-80 hover:opacity-100 cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Add Expense Modal ─────────────────────────────────────────────────────────
function AddExpenseModal({ onAdd, onClose, darkMode }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Manila' });
  });
  const [dayBudget, setDayBudget] = useState('');
  const [error, setError] = useState('');
  const nameRef = useRef(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const handleSubmit = () => {
    if (!name.trim()) { setError('Please enter a store / item name.'); return; }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.'); return;
    }
    const color = categoryColor[category] || 'gray';
    onAdd({
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      color,
      date,
      time: time.trim() || '12:00 PM',
      dayBudget: dayBudget && !isNaN(parseFloat(dayBudget)) ? parseFloat(dayBudget) : null,
    });
  };

  const input = `w-full px-3 py-2.5 border rounded-xl font-semibold text-sm focus:outline-none focus:ring-2 transition-all ${
    darkMode
      ? 'bg-gray-700/60 border-gray-600 text-gray-200 focus:ring-orange-500 placeholder:text-gray-500'
      : 'bg-white border-gray-200 text-gray-900 focus:ring-orange-400 placeholder:text-gray-400'
  }`;

  const label = `text-xs font-bold mb-1.5 block ${darkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl transition-colors ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-100'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div>
            <h2 className={`text-lg font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Add Expense</h2>
            <p className={`text-xs font-semibold mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Log what you spent</p>
          </div>
          <button onClick={onClose} className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
          }`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className={label}>Store / Item Name *</label>
            <input ref={nameRef} type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Puregold, Jollibee..." className={input} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Amount (₱) *</label>
              <input type="number" min="0" step="0.01" value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00" className={input} />
            </div>
            <div>
              <label className={label}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className={input}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={input} />
            </div>
            <div>
              <label className={label}>Time</label>
              <input type="text" value={time} onChange={e => setTime(e.target.value)}
                placeholder="2:30 PM" className={input} />
            </div>
          </div>

          <div>
            <label className={label}>Day Budget (₱) <span className={`font-normal ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>— optional</span></label>
            <input type="number" min="0" step="0.01" value={dayBudget}
              onChange={e => setDayBudget(e.target.value)}
              placeholder="Leave blank for no limit" className={input} />
            <p className={`text-[11px] mt-1.5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Set a spending limit for this day to get a pass/fail notification.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function BudgetTrackerPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [viewMode, setViewMode] = useState('list');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const { darkMode } = useDarkMode();

  // Real data state
  const [transactions, setTransactions] = useState(() => loadTransactions());
  const [monthlyBudget, setMonthlyBudget] = useState(() => loadMonthlyBudget());
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');

  // Keep localStorage in sync
  useEffect(() => { saveTransactions(transactions); }, [transactions]);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) return <Navigate to="/" replace />;

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleAddExpense = (tx) => {
    const updated = [tx, ...transactions];
    setTransactions(updated);
    setShowAddModal(false);

    // Per-day budget notification
    if (tx.dayBudget !== null) {
      const dayTotal = updated
        .filter(t => t.date === tx.date)
        .reduce((s, t) => s + t.amount, 0);

      if (dayTotal <= tx.dayBudget) {
        showToast(`✅ Under budget for ${formatDisplayDate(tx.date)}! Spent ₱${dayTotal.toFixed(2)} of ₱${tx.dayBudget.toFixed(2)}`, 'success');
      } else {
        showToast(`⚠️ Over budget for ${formatDisplayDate(tx.date)}! Spent ₱${dayTotal.toFixed(2)} vs ₱${tx.dayBudget.toFixed(2)}`, 'warning');
      }
    } else {
      showToast(`Expense added — ₱${tx.amount.toFixed(2)} at ${tx.name}`, 'success');
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast('Expense removed.', 'success');
  };

  // ── Derived stats ────────────────────────────────────────────────────────────
  const currentMonthISO = getMonthISO(new Date());

  const monthTransactions = transactions.filter(t => t.date.startsWith(currentMonthISO));
  const totalSpent = monthTransactions.reduce((s, t) => s + t.amount, 0);
  const remaining = monthlyBudget !== null ? monthlyBudget - totalSpent : null;

  // Weekly spending (last 4 weeks)
  const getWeeklySpending = () => {
    const now = new Date();
    return [0, 1, 2, 3].map(i => {
      const end = new Date(now);
      end.setDate(now.getDate() - i * 7);
      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      const amount = transactions
        .filter(t => {
          const d = new Date(t.date + 'T00:00:00');
          return d >= start && d <= end;
        })
        .reduce((s, t) => s + t.amount, 0);

      const label = i === 0 ? 'This Week' : i === 1 ? 'Last Week' : `${i + 1} Wks Ago`;
      const startStr = start.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
      const endStr = end.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
      return { week: label, amount: parseFloat(amount.toFixed(2)), budget: monthlyBudget ? monthlyBudget / 4 : null, date: `${startStr}–${endStr}` };
    });
  };

  const weeklySpending = getWeeklySpending();

  // Average per week (last 4 weeks)
  const avgPerWeek = weeklySpending.reduce((s, w) => s + w.amount, 0) / 4;

  // Calendar helpers
  const { daysInMonth, startingDayOfWeek } = (() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDayOfWeek: firstDay.getDay() };
  })();

  const monthName = selectedDate.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });

  // Build calendarTransactions map: day -> txs for the viewed month
  const calendarTransactions = {};
  const viewedMonthISO = getMonthISO(selectedDate);
  transactions
    .filter(t => t.date.startsWith(viewedMonthISO))
    .forEach(t => {
      const day = parseInt(t.date.split('-')[2]);
      if (!calendarTransactions[day]) calendarTransactions[day] = [];
      calendarTransactions[day].push(t);
    });

  const changeMonth = (direction) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
    setSelectedCalendarDay(null);
  };

  const selectedDayTransactions = selectedCalendarDay
    ? (calendarTransactions[selectedCalendarDay] || [])
    : [];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const todayStr = todayISO();
  const todayDay = parseInt(todayStr.split('-')[2]);
  const isViewingCurrentMonth = viewedMonthISO === getMonthISO(new Date());

  // ── Budget save ──────────────────────────────────────────────────────────────
  const handleSaveBudget = () => {
    if (budgetInput === '') {
      setMonthlyBudget(null);
      saveMonthlyBudget(null);
      showToast('Monthly budget removed.', 'success');
    } else {
      const val = parseFloat(budgetInput);
      if (isNaN(val) || val <= 0) { showToast('Enter a valid budget amount.', 'error'); return; }
      setMonthlyBudget(val);
      saveMonthlyBudget(val);
      showToast(`Monthly budget set to ₱${val.toFixed(2)}`, 'success');
    }
    setEditingBudget(false);
    setBudgetInput('');
  };

  const formatPhilippineTime = (date) =>
    date.toLocaleString('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const formatPhilippineDate = (date) =>
    date.toLocaleDateString('en-PH', { timeZone: 'Asia/Manila', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Recent = last 20 transactions across all time, sorted newest first
  const recentTransactions = [...transactions]
    .sort((a, b) => b.id - a.id)
    .slice(0, 20);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800'
        : 'bg-linear-to-br from-amber-50 via-orange-50/40 to-rose-50/30'
    }`}>
      <Sidebar onLogout={handleLogout} activeSection="budget" />

      <div className="flex-1 mt-5 pt-20 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* ── Header ── */}
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
                  darkMode ? 'bg-gray-800/80 border border-orange-700/50' : 'bg-white/80 border border-orange-200/50'
                }`}>
                  <Clock className="w-4 h-4 text-orange-600 animate-pulse" />
                  <span className={`font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-900'}`}>
                    {formatPhilippineTime(currentTime)}
                  </span>
                </div>
                <div className={`px-3 py-1.5 backdrop-blur-sm rounded-full shadow-sm transition-colors ${
                  darkMode ? 'bg-gray-800/80 border border-orange-700/50 text-gray-300' : 'bg-white/80 border border-orange-200/50 text-gray-700'
                }`}>
                  <span className="font-medium">{formatPhilippineDate(currentTime)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              {/* View toggle */}
              <div className={`flex gap-2 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg self-start transition-colors ${
                darkMode ? 'bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'
              }`}>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md'
                      : darkMode ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-50'
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
                      : darkMode ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CalendarDays className="w-4 h-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </button>
              </div>

              {/* Add expense button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Expense
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {[
                {
                  label: 'Monthly Budget',
                  value: monthlyBudget !== null ? monthlyBudget : '—',
                  icon: '₱',
                  gradient: 'from-emerald-400 to-emerald-600',
                  bgGradient: 'from-emerald-50 to-emerald-100/50',
                  action: true,
                },
                {
                  label: 'Spent This Month',
                  value: totalSpent,
                  icon: '₱',
                  gradient: 'from-blue-400 to-blue-600',
                  bgGradient: 'from-blue-50 to-blue-100/50',
                },
                {
                  label: 'Remaining',
                  value: remaining !== null ? remaining : '—',
                  icon: '₱',
                  gradient: 'from-orange-400 to-orange-600',
                  bgGradient: 'from-orange-50 to-orange-100/50',
                },
                {
                  label: 'Avg Per Week',
                  value: avgPerWeek,
                  icon: CalendarIcon,
                  gradient: 'from-purple-400 to-purple-600',
                  bgGradient: 'from-purple-50 to-purple-100/50',
                },
              ].map((stat, idx) => {
                const isTextIcon = typeof stat.icon === 'string';
                const Icon = !isTextIcon ? stat.icon : null;
                const displayVal = typeof stat.value === 'number'
                  ? stat.value.toFixed(2)
                  : stat.value;

                return (
                  <div
                    key={idx}
                    onClick={stat.action ? () => { setEditingBudget(true); setBudgetInput(monthlyBudget !== null ? String(monthlyBudget) : ''); } : undefined}
                    className={`group relative backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                      stat.action ? 'cursor-pointer' : ''
                    } ${
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
                            <span className="text-xl sm:text-2xl font-black text-white">{stat.icon}</span>
                          ) : Icon && (
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        {stat.action && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-white/60 text-gray-500'}`}>
                            tap to set
                          </span>
                        )}
                      </div>
                      <div className={`text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                      <div className="flex items-baseline gap-1">
                        {isTextIcon && typeof stat.value === 'number' && (
                          <span className={`text-xl sm:text-2xl font-black transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>₱</span>
                        )}
                        <span className={`text-2xl sm:text-3xl font-black transition-colors ${
                          stat.label === 'Remaining' && remaining !== null && remaining < 0
                            ? 'text-red-500'
                            : darkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {displayVal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Budget edit inline */}
            {editingBudget && (
              <div className={`mb-6 flex items-center gap-3 p-4 rounded-2xl border shadow-lg transition-colors ${
                darkMode ? 'bg-gray-800/90 border-orange-700/50' : 'bg-white/90 border-orange-200'
              }`}>
                <span className={`text-sm font-bold shrink-0 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Budget (₱):</span>
                <input
                  type="number" min="0" step="0.01"
                  value={budgetInput}
                  onChange={e => setBudgetInput(e.target.value)}
                  placeholder="Leave blank to remove"
                  autoFocus
                  className={`flex-1 px-3 py-2 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
                <button onClick={handleSaveBudget} className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-sm cursor-pointer hover:scale-105 transition-all">Save</button>
                <button onClick={() => setEditingBudget(false)} className={`px-3 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>Cancel</button>
              </div>
            )}

            {/* ── Weekly + Recent ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Weekly Spending */}
              <div className={`lg:col-span-2 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
                darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
              }`}>
                <h3 className={`text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  <div className="w-1.5 h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Weekly Spending
                </h3>
                {weeklySpending.every(w => w.amount === 0) ? (
                  <div className={`text-center py-10 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    <p className="text-sm font-semibold">No transactions yet — add your first expense!</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-5">
                    {weeklySpending.map((week, idx) => {
                      const hasLimit = week.budget !== null;
                      const isOver = hasLimit && week.amount > week.budget;
                      const percentage = hasLimit
                        ? Math.min((week.amount / week.budget) * 100, 100)
                        : 100;
                      return (
                        <div key={idx} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className={`text-sm sm:text-base font-bold transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{week.week}</span>
                              <span className={`text-xs ml-2 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{week.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm sm:text-base font-black ${isOver ? 'text-red-600' : 'text-emerald-600'}`}>
                                ₱{week.amount.toFixed(2)}
                              </span>
                              {hasLimit && (
                                <span className={`text-xs sm:text-sm font-medium transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                  / ₱{week.budget.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`relative w-full rounded-full h-3 sm:h-4 overflow-hidden shadow-inner ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                isOver
                                  ? 'bg-linear-to-r from-red-400 via-red-500 to-red-600'
                                  : 'bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600'
                              } shadow-md`}
                              style={{ width: `${week.amount > 0 ? (hasLimit ? percentage : 100) : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Transactions */}
              <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
                darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
              }`}>
                <h3 className={`text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  <div className="w-1.5 h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Recent
                </h3>
                {recentTransactions.length === 0 ? (
                  <div className={`text-center py-10 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    <p className="text-sm font-semibold">No expenses yet</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="mt-3 px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer hover:scale-105 transition-all"
                    >
                      Add your first expense
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className={`group p-3 sm:p-4 rounded-xl sm:rounded-2xl border hover:shadow-lg transition-all duration-300 ${
                          darkMode
                            ? 'bg-gray-700/50 border-gray-600/50 hover:border-orange-500/50'
                            : 'bg-linear-to-r from-gray-50 via-white to-gray-50/50 border-gray-200/50 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-bold text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{transaction.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`font-black text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>₱{transaction.amount.toFixed(2)}</span>
                            <button
                              onClick={() => handleDeleteTransaction(transaction.id)}
                              className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg cursor-pointer ${
                                darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-500'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{formatDisplayDate(transaction.date)}</span>
                            <span className={`transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                            <span className={`transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{transaction.time}</span>
                          </div>
                          <span className={`font-bold px-2 py-1 rounded-lg ${
                            darkMode
                              ? categoryBadgeDark[categoryColor[transaction.category] || 'gray']
                              : categoryBadgeLight[categoryColor[transaction.category] || 'gray']
                          }`}>
                            {transaction.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ── CALENDAR VIEW ── */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Calendar Grid */}
            <div className={`lg:col-span-2 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-colors ${
              darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}>
              {/* Month Header */}
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <button
                  onClick={() => changeMonth('prev')}
                  className={`p-2 sm:p-3 rounded-xl border transition-all cursor-pointer group ${
                    darkMode ? 'border-gray-600 hover:bg-gray-700 hover:border-orange-500' : 'border-gray-200 hover:bg-orange-50 hover:border-orange-300'
                  }`}
                >
                  <ChevronLeft className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-orange-400' : 'text-gray-600 group-hover:text-orange-600'}`} />
                </button>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-orange-500" />
                  <span className={`font-black text-lg sm:text-xl transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{monthName}</span>
                </div>
                <button
                  onClick={() => changeMonth('next')}
                  className={`p-2 sm:p-3 rounded-xl border transition-all cursor-pointer group ${
                    darkMode ? 'border-gray-600 hover:bg-gray-700 hover:border-orange-500' : 'border-gray-200 hover:bg-orange-50 hover:border-orange-300'
                  }`}
                >
                  <ChevronRight className={`w-5 h-5 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-orange-400' : 'text-gray-600 group-hover:text-orange-600'}`} />
                </button>
              </div>

              {/* Day Name Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(d => (
                  <div key={d} className={`text-center text-xs sm:text-sm font-black py-2 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const hasTx = !!calendarTransactions[day];
                  const isSelected = selectedCalendarDay === day;
                  const isToday = isViewingCurrentMonth && day === todayDay;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedCalendarDay(isSelected ? null : day)}
                      className={`aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-linear-to-br from-orange-500 to-amber-500 border-orange-400 shadow-lg shadow-orange-200/50 scale-105'
                          : isToday
                          ? darkMode ? 'border-orange-500 bg-orange-900/30' : 'border-orange-400 bg-orange-50'
                          : hasTx
                          ? darkMode ? 'border-gray-600 bg-gray-700/60 hover:border-orange-500 hover:bg-gray-700' : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50'
                          : darkMode ? 'border-transparent bg-gray-700/20 hover:bg-gray-700/50 hover:border-gray-600' : 'border-transparent bg-white/40 hover:bg-orange-50/50 hover:border-gray-200'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-black transition-colors ${
                        isSelected ? 'text-white' : isToday ? 'text-orange-600' : darkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>
                        {day}
                      </span>
                      {hasTx && !isSelected && (
                        <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center max-w-[80%]">
                          {calendarTransactions[day].slice(0, 3).map((tx, ti) => (
                            <span key={ti} className={`w-1.5 h-1.5 rounded-full ${dotColor[categoryColor[tx.category] || 'gray']}`} />
                          ))}
                        </div>
                      )}
                      {hasTx && isSelected && (
                        <div className="flex gap-0.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className={`mt-5 pt-4 border-t flex flex-wrap gap-4 transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${darkMode ? 'border-orange-500 bg-orange-900/30' : 'border-orange-400 bg-orange-50'}`}></div>
                  <span className={`text-xs font-semibold transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className={`text-xs font-semibold transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Has transaction</span>
                </div>
              </div>
            </div>

            {/* Right: Day Detail + Summary */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-5">
              {/* Selected Day Transactions */}
              <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 border shadow-xl transition-colors ${
                darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {selectedCalendarDay
                      ? `${monthName.split(' ')[0]} ${selectedCalendarDay}`
                      : 'Select a Day'}
                  </h3>
                  {selectedCalendarDay && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-8 h-8 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>

                {selectedCalendarDay === null && (
                  <div className={`text-center py-8 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-semibold">Tap any date to see transactions</p>
                  </div>
                )}

                {selectedCalendarDay !== null && selectedDayTransactions.length === 0 && (
                  <div className={`text-center py-8 transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <p className="text-sm font-semibold mb-3">No transactions this day</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-3 py-1.5 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer hover:scale-105 transition-all"
                    >
                      Add expense
                    </button>
                  </div>
                )}

                {selectedDayTransactions.length > 0 && (
                  <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                    {selectedDayTransactions.map((tx) => (
                      <div key={tx.id} className={`p-4 rounded-2xl border transition-colors ${
                        darkMode ? 'bg-gray-700/60 border-gray-600' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-black text-base transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{tx.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-orange-600">₱{tx.amount.toFixed(2)}</span>
                            <button
                              onClick={() => handleDeleteTransaction(tx.id)}
                              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                                darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-400'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`flex items-center gap-1 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Clock className="w-3 h-3" />
                            {tx.time}
                          </span>
                          <span className={`font-bold px-2 py-1 rounded-lg ${
                            darkMode
                              ? categoryBadgeDark[categoryColor[tx.category] || 'gray']
                              : categoryBadgeLight[categoryColor[tx.category] || 'gray']
                          }`}>
                            {tx.category}
                          </span>
                        </div>
                        {tx.dayBudget && (
                          <div className={`mt-2 text-[11px] font-semibold ${
                            tx.amount <= tx.dayBudget ? 'text-emerald-500' : 'text-red-500'
                          }`}>
                            Day budget: ₱{tx.dayBudget.toFixed(2)}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className={`pt-2 border-t flex justify-between transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <span className={`font-bold text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Day Total</span>
                      <span className="font-black text-orange-600">
                        ₱{selectedDayTransactions.reduce((s, t) => s + t.amount, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly Stats */}
              <div className={`backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 border shadow-xl transition-colors ${
                darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
              }`}>
                <h3 className={`text-lg sm:text-xl font-black mb-4 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Month Summary
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Total Spent', value: `₱${totalSpent.toFixed(2)}`, color: 'text-orange-600' },
                    { label: 'Budget Left', value: remaining !== null ? `₱${remaining.toFixed(2)}` : '—', color: remaining !== null && remaining < 0 ? 'text-red-500' : 'text-emerald-600' },
                    { label: 'Transactions', value: String(monthTransactions.length), color: 'text-blue-600' },
                    {
                      label: 'Biggest Spend',
                      value: monthTransactions.length > 0 ? `₱${Math.max(...monthTransactions.map(t => t.amount)).toFixed(2)}` : '—',
                      color: 'text-red-500'
                    },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-2 border-b last:border-0 transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <span className={`text-sm font-semibold transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</span>
                      <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <AddExpenseModal
          onAdd={handleAddExpense}
          onClose={() => setShowAddModal(false)}
          darkMode={darkMode}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${darkMode ? '#374151' : '#f1f1f1'}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #f97316, #f59e0b); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #ea580c, #d97706); }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
      `}</style>
    </div>
  );
}