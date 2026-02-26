import { Home, Calendar, ShoppingCart, TrendingUp, Settings, LogOut, X, Menu, User, UtensilsCrossed } from 'lucide-react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { BarChart2 } from 'lucide-react';

export function Sidebar({ onLogout, activeSection = 'dashboard' }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileMenuRef = useRef(null);

  const userName = localStorage.getItem('userName') || 'User';
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const menuItems = [
    { id: 'dashboard',  icon: Home,            label: 'Dashboard',            gradient: 'from-emerald-400 to-emerald-600', activeBar: 'from-emerald-400 to-emerald-600', path: '/dashboard' },
    { id: 'meal-plans', icon: Calendar,         label: 'Meal & Workout Plans', gradient: 'from-blue-400 to-blue-600',      activeBar: 'from-blue-400 to-blue-600',      path: '/meal-plans' },
    { id: 'recipes',    icon: UtensilsCrossed,  label: 'Recipes',              gradient: 'from-rose-400 to-pink-600',      activeBar: 'from-rose-400 to-pink-500',      path: '/recipes' },
    { id: 'grocery',    icon: ShoppingCart,     label: 'Grocery List',         gradient: 'from-purple-400 to-purple-600',  activeBar: 'from-purple-400 to-purple-600',  path: '/grocery' },
    { id: 'budget',     icon: TrendingUp,       label: 'Budget Tracker',       gradient: 'from-orange-400 to-orange-600',  activeBar: 'from-orange-400 to-orange-600',  path: '/budget' },
    { id: 'analytics',  icon: BarChart2,        label: 'Analytics',            gradient: 'from-violet-400 to-indigo-600',  activeBar: 'from-violet-400 to-indigo-600',  path: '/analytics'},
    { id: 'settings',   icon: Settings,         label: 'Settings',             gradient: 'from-gray-400 to-gray-600',      activeBar: 'from-gray-400 to-gray-500',      path: '/settings' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogoutClick = () => { setShowProfileMenu(false); setShowLogoutConfirm(true); };
  const handleConfirmLogout = () => { setShowLogoutConfirm(false); onLogout(); };
  const handleNavigate = (path) => { navigate(path); setIsMobileOpen(false); };
  const handleProfileClick = () => { setShowProfileMenu(false); navigate('/profile'); setIsMobileOpen(false); };

  const SidebarContent = () => (
    <div className={`flex flex-col h-full relative overflow-hidden transition-colors duration-300 ${
      darkMode
        ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-linear-to-br from-white via-emerald-50/30 to-white'
    }`}>
      {/* Decorative orb */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-32 translate-x-32 ${
        darkMode ? 'bg-emerald-900/20' : 'bg-emerald-200/40'
      }`} />

      {/* Header */}
      <div className={`relative p-4 backdrop-blur-sm ${
        darkMode ? 'border-b border-gray-700/50 bg-gray-800/80' : 'border-b border-emerald-100/50 bg-white/80'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className={`relative w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-lg border-2 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
              <BudgetarianLogo size="small" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-base tracking-tight leading-none">
                <span className={darkMode ? 'text-gray-100' : 'text-gray-900'}>Budget</span>
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#16A34A] to-[#65A30D]">arian</span>
              </div>
              <div className={`text-xs font-medium mt-0.5 ${darkMode ? 'text-emerald-400' : 'text-green-600'}`}>
                Smart Meal Planning
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className={`lg:hidden shrink-0 p-2 rounded-xl transition-all cursor-pointer hover:scale-105 ${
              darkMode ? 'hover:bg-gray-700/60' : 'hover:bg-emerald-100/60'
            }`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={`relative w-full group flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? darkMode
                    ? 'bg-gray-700/60 shadow-md'
                    : 'bg-gray-100/80 shadow-sm'
                  : darkMode
                  ? 'hover:bg-gray-800/60'
                  : 'hover:bg-white/80 hover:shadow-sm'
              }`}
              title={item.label}
            >
              {isActive && (
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b ${item.activeBar} rounded-r-full`} />
              )}

              <div className={`relative shrink-0 p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? `bg-linear-to-br ${item.gradient} shadow-lg`
                  : darkMode
                  ? 'bg-gray-700 group-hover:bg-gray-600'
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-white' : darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'
                }`} />
              </div>

              <span className={`font-semibold text-sm leading-tight text-left transition-colors duration-200 ${
                isActive
                  ? darkMode ? 'text-gray-100' : 'text-gray-900'
                  : darkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`relative p-3 ${
        darkMode ? 'border-t border-gray-700/50 bg-gray-800/60' : 'border-t border-emerald-100/50 bg-white/60'
      }`} ref={profileMenuRef}>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 cursor-pointer group ${
              darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg">
                {userInitials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className={`font-bold text-sm truncate ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {userName}
              </div>
              <div className="text-xs font-semibold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
                Premium Plan ✨
              </div>
            </div>
          </button>

          {showProfileMenu && (
            <div className={`absolute bottom-full left-0 right-0 mb-3 rounded-2xl shadow-2xl border py-3 z-50 backdrop-blur-xl ${
              darkMode ? 'bg-gray-800 border-gray-700/50' : 'bg-white border-emerald-100/50'
            }`}>
              <button
                onClick={handleProfileClick}
                className={`w-full flex items-center gap-3 px-5 py-3 transition-all cursor-pointer group ${
                  darkMode ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">View Profile</span>
              </button>

              <div className={`my-2 mx-5 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`} />

              <div className={`px-5 py-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-100'}`}>
                <div className={`text-xs font-semibold mb-2 uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Monthly Budget
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">75%</span>
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>₱750 / ₱1,000</span>
                </div>
                <div className={`w-full rounded-full h-2 overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="bg-linear-to-r from-emerald-400 to-teal-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <button
                onClick={handleLogoutClick}
                className={`w-full flex items-center gap-3 px-5 py-3 text-red-500 transition-all cursor-pointer group ${
                  darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                }`}
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      {!isMobileOpen && (
        <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b ${
          darkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-emerald-100/50'
        }`}>
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className={`p-2 rounded-xl transition-all cursor-pointer hover:scale-105 ${
                darkMode ? 'hover:bg-gray-700/60' : 'hover:bg-emerald-100/60'
              }`}
            >
              <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
            <div className="flex items-center gap-2">
              <BudgetarianLogo size="small" />
              <div className="font-bold text-base tracking-tight">
                <span className={darkMode ? 'text-gray-100' : 'text-gray-900'}>Budget</span>
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#16A34A] to-[#65A30D]">arian</span>
              </div>
            </div>
            <div className="w-9" />
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex lg:flex-col w-60 backdrop-blur-xl border-r h-screen sticky top-0 shadow-sm transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-emerald-100/50'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <aside className={`lg:hidden fixed top-0 left-0 z-50 w-64 backdrop-blur-xl border-r h-screen flex flex-col shadow-2xl transition-colors duration-300 ${
          darkMode ? 'bg-gray-900 border-gray-700/50' : 'bg-white border-emerald-100/50'
        }`}>
          <SidebarContent />
        </aside>
      )}

      {/* Logout modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center backdrop-blur-md p-4">
          <div className={`rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-400/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
            <div className="relative text-center">
              <div className="w-16 h-16 bg-linear-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl">
                <LogOut className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Ready to Leave?
              </h3>
              <p className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You're about to logout. Any unsaved work will be lost.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className={`flex-1 px-4 py-3 font-semibold rounded-xl text-sm border transition-all cursor-pointer ${
                    darkMode ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  Stay Here
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 px-4 py-3 bg-linear-to-br from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all cursor-pointer text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}