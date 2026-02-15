import { Home, Calendar, ShoppingCart, TrendingUp, Settings, LogOut, X, Menu } from 'lucide-react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface SidebarProps {
  onLogout: () => void;
  activeSection?: string;
}

export function Sidebar({ onLogout, activeSection = 'dashboard' }: SidebarProps) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', gradient: 'from-emerald-400 to-emerald-600', path: '/dashboard' },
    { id: 'meal-plans', icon: Calendar, label: 'Meal Plans', gradient: 'from-blue-400 to-blue-600', path: '/meal-plans' },
    { id: 'grocery', icon: ShoppingCart, label: 'Grocery List', gradient: 'from-purple-400 to-purple-600', path: '/grocery' },
    { id: 'budget', icon: TrendingUp, label: 'Budget Tracker', gradient: 'from-orange-400 to-orange-600', path: '/budget' },
    { id: 'settings', icon: Settings, label: 'Settings', gradient: 'from-gray-400 to-gray-600', path: '/settings' },
  ];

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileOpen(false); // Close mobile menu after navigation
  };

  const SidebarContent = () => (
    <div className={`flex flex-col h-full relative overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-linear-to-br from-white via-emerald-50/30 to-white'
    }`}>
      {/* Decorative gradient orb */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-32 translate-x-32 transition-colors ${
        darkMode 
          ? 'bg-linear-to-br from-emerald-900/20 to-transparent' 
          : 'bg-linear-to-br from-emerald-200/40 to-transparent'
      }`}></div>
      
      {/* Compact Header */}
      <div className={`relative p-5 backdrop-blur-sm transition-colors ${
        darkMode 
          ? 'border-b border-gray-700/50 bg-gray-800/80' 
          : 'border-b border-emerald-100/50 bg-white/80'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`relative w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg border-2 group-hover:shadow-xl transition-all ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <BudgetarianLogo size="small" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-linear-to-br from-yellow-300 to-orange-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg tracking-tight leading-none">
                <span className={darkMode ? 'text-gray-100' : 'text-gray-900'}>Budget</span>
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#16A34A] to-[#65A30D]">arian</span>
              </div>
              <div className={`text-xs font-medium mt-1 transition-colors ${
                darkMode ? 'text-emerald-400' : 'text-green-600'
              }`}>Smart Meal Planning</div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105 ${
              darkMode 
                ? 'hover:bg-gray-700/60' 
                : 'hover:bg-emerald-100/60'
            }`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Compact Navigation */}
      <nav className="relative flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={`relative w-full group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? darkMode
                    ? 'bg-linear-to-r from-emerald-900/30 to-emerald-800/20 shadow-md shadow-emerald-900/30'
                    : 'bg-linear-to-r from-emerald-500/10 to-emerald-600/10 shadow-md shadow-emerald-200/50'
                  : darkMode
                  ? 'hover:bg-gray-800/50 hover:shadow-md'
                  : 'hover:bg-white/80 hover:shadow-md'
              }`}
              title={item.label}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-linear-to-b from-emerald-400 to-emerald-600 rounded-r-full shadow-lg shadow-emerald-300/50"></div>
              )}
              
              <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? `bg-linear-to-br ${item.gradient} shadow-lg`
                  : darkMode
                  ? 'bg-gray-700 group-hover:bg-linear-to-br group-hover:from-gray-700 group-hover:to-gray-600'
                  : 'bg-gray-100 group-hover:bg-linear-to-br group-hover:from-gray-100 group-hover:to-gray-200'
              }`}>
                <Icon className={`w-5 h-5 transition-colors duration-300 ${
                  isActive 
                    ? 'text-white' 
                    : darkMode 
                    ? 'text-gray-400 group-hover:text-gray-300' 
                    : 'text-gray-600 group-hover:text-gray-700'
                }`} />
              </div>
              
              <span className={`font-semibold text-sm transition-colors duration-300 ${
                isActive 
                  ? darkMode 
                    ? 'text-emerald-400' 
                    : 'text-emerald-700' 
                  : darkMode 
                  ? 'text-gray-300 group-hover:text-gray-100' 
                  : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                {item.label}
              </span>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                !isActive 
                  ? darkMode 
                    ? 'bg-linear-to-r from-emerald-900/20 to-transparent' 
                    : 'bg-linear-to-r from-emerald-50/50 to-transparent' 
                  : ''
              }`}></div>
            </button>
          );
        })}
      </nav>

      {/* Compact User Profile with Dropdown */}
      <div className={`relative p-4 backdrop-blur-sm transition-colors ${
        darkMode 
          ? 'border-t border-gray-700/50 bg-gray-800/60' 
          : 'border-t border-emerald-100/50 bg-white/60'
      }`} ref={profileMenuRef}>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 cursor-pointer group ${
              darkMode 
                ? 'hover:bg-linear-to-r hover:from-emerald-900/20 hover:to-transparent' 
                : 'hover:bg-linear-to-r hover:from-emerald-50 hover:to-transparent'
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-300/50 group-hover:shadow-xl transition-shadow">
                AC
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-br from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-md"></div>
            </div>
            <div className="flex-1 text-left">
              <div className={`font-bold text-sm transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Aaron Cumahig</div>
              <div className="text-xs font-semibold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Premium Plan ✨</div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className={`absolute bottom-full left-0 right-0 mb-3 rounded-2xl shadow-2xl border py-3 z-50 animate-scale-in backdrop-blur-xl transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700/50' 
                : 'bg-white border-emerald-100/50'
            }`}>
              <div className={`px-5 py-4 border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <div className={`text-xs font-semibold mb-2 uppercase tracking-wide transition-colors ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>Monthly Budget</div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">75%</span>
                  <span className={`text-xs font-medium transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>$750 / $1,000</span>
                </div>
                <div className={`w-full rounded-full h-2.5 overflow-hidden shadow-inner ${
                  darkMode 
                    ? 'bg-linear-to-r from-gray-700 to-gray-600' 
                    : 'bg-linear-to-r from-gray-100 to-gray-50'
                }`}>
                  <div 
                    className="bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-500 shadow-md" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
              <button
                onClick={handleLogoutClick}
                className={`w-full flex items-center gap-3 px-5 py-3 text-red-600 transition-all duration-200 cursor-pointer group ${
                  darkMode 
                    ? 'hover:bg-linear-to-r hover:from-red-900/20 hover:to-transparent' 
                    : 'hover:bg-linear-to-r hover:from-red-50 hover:to-transparent'
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
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-5 left-5 z-50 p-3.5 backdrop-blur-md rounded-2xl shadow-xl border hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer ${
          darkMode 
            ? 'bg-gray-800/90 border-gray-700/50' 
            : 'bg-white/90 border-emerald-100/50'
        }`}
      >
        {isMobileOpen ? (
          <X className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        ) : (
          <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-linear-to-br from-black/60 to-black/40 z-40 backdrop-blur-md cursor-pointer animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop (always visible, no toggle) */}
      <aside className={`hidden lg:flex lg:flex-col w-64 backdrop-blur-xl border-r h-screen sticky top-0 shadow-sm transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900/95 border-gray-700/50' 
          : 'bg-white/95 border-emerald-100/50'
      }`}>
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileOpen && (
        <aside className={`lg:hidden fixed top-0 left-0 z-50 w-64 backdrop-blur-xl border-r h-screen flex flex-col shadow-2xl animate-slide-in-left transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-900/98 border-gray-700/50' 
            : 'bg-white/98 border-emerald-100/50'
        }`}>
          <SidebarContent />
        </aside>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-linear-to-br from-gray-900/50 via-gray-900/40 to-gray-900/50 z-100 flex items-center justify-center backdrop-blur-md animate-fade-in p-4">
          <div className={`rounded-3xl p-10 max-w-sm w-full shadow-2xl animate-scale-in relative overflow-hidden transition-colors ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-red-100/60 to-orange-100/40 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-red-50/80 to-transparent rounded-full blur-2xl translate-y-16 -translate-x-16"></div>
            
            <div className="relative text-center">
              {/* Beautiful icon with gradient */}
              <div className="w-20 h-20 bg-linear-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-300/60 transform hover:scale-105 transition-transform">
                <LogOut className="w-9 h-9 text-white" />
              </div>
              
              {/* Bold heading */}
              <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Ready to Leave?
              </h3>
              
              {/* Refined description */}
              <p className={`text-sm mb-8 leading-relaxed max-w-xs mx-auto transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                You're about to logout from your account. Any unsaved work will be lost.
              </p>
              
              {/* Premium buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className={`flex-1 px-6 py-3.5 font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer text-sm border ${
                    darkMode 
                      ? 'bg-linear-to-br from-gray-700 to-gray-600 text-gray-200 border-gray-600 hover:from-gray-600 hover:to-gray-500' 
                      : 'bg-linear-to-br from-gray-100 to-gray-50 text-gray-700 border-gray-200 hover:from-gray-200 hover:to-gray-100'
                  }`}
                >
                  Stay Here
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 px-6 py-3.5 bg-linear-to-br from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-red-700 hover:shadow-2xl hover:shadow-red-300/50 hover:scale-105 transition-all duration-300 cursor-pointer text-sm"
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