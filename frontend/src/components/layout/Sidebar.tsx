import { Home, Calendar, ShoppingCart, TrendingUp, Settings, LogOut, X, Menu } from 'lucide-react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
  activeSection?: string;
}

export function Sidebar({ onLogout, activeSection = 'dashboard' }: SidebarProps) {
  const navigate = useNavigate();
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
    <div className="flex flex-col h-full bg-linear-to-br from-white via-emerald-50/30 to-white relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      
      {/* Compact Header */}
      <div className="relative p-5 border-b border-emerald-100/50 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-gray-100 group-hover:shadow-xl transition-shadow">
              <BudgetarianLogo size="small" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-linear-to-br from-yellow-300 to-orange-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg tracking-tight leading-none">
                <span className="text-gray-900">Budget</span>
                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#16A34A] to-[#65A30D]">arian</span>
              </div>
              <div className="text-xs font-medium text-green-600 mt-1">Smart Meal Planning</div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2.5 hover:bg-emerald-100/60 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105"
          >
            <X className="w-5 h-5 text-gray-600" />
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
                  ? 'bg-linear-to-r from-emerald-500/10 to-emerald-600/10 shadow-md shadow-emerald-200/50'
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
                  : 'bg-gray-100 group-hover:bg-linear-to-br group-hover:from-gray-100 group-hover:to-gray-200'
              }`}>
                <Icon className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'
                }`} />
              </div>
              
              <span className={`font-semibold text-sm transition-colors duration-300 ${
                isActive ? 'text-emerald-700' : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                {item.label}
              </span>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                !isActive ? 'bg-linear-to-r from-emerald-50/50 to-transparent' : ''
              }`}></div>
            </button>
          );
        })}
      </nav>

      {/* Compact User Profile with Dropdown */}
      <div className="relative p-4 border-t border-emerald-100/50 bg-white/60 backdrop-blur-sm" ref={profileMenuRef}>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-transparent transition-all duration-300 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-300/50 group-hover:shadow-xl transition-shadow">
                AC
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-br from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-md"></div>
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-sm text-gray-900">Aaron Cumahig</div>
              <div className="text-xs font-semibold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Premium Plan ✨</div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-3 bg-white rounded-2xl shadow-2xl border border-emerald-100/50 py-3 z-50 animate-scale-in backdrop-blur-xl">
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Monthly Budget</div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">75%</span>
                  <span className="text-xs font-medium text-gray-600">$750 / $1,000</span>
                </div>
                <div className="w-full bg-linear-to-r from-gray-100 to-gray-50 rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div 
                    className="bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-500 shadow-md" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-linear-to-r hover:from-red-50 hover:to-transparent transition-all duration-200 cursor-pointer group"
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
        className="lg:hidden fixed top-5 left-5 z-50 p-3.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
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
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white/95 backdrop-blur-xl border-r border-emerald-100/50 h-screen sticky top-0 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileOpen && (
        <aside className="lg:hidden fixed top-0 left-0 z-50 w-64 bg-white/98 backdrop-blur-xl border-r border-emerald-100/50 h-screen flex flex-col shadow-2xl animate-slide-in-left">
          <SidebarContent />
        </aside>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-linear-to-br from-gray-900/50 via-gray-900/40 to-gray-900/50 z-100 flex items-center justify-center backdrop-blur-md animate-fade-in p-4">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl animate-scale-in relative overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-red-100/60 to-orange-100/40 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-red-50/80 to-transparent rounded-full blur-2xl translate-y-16 -translate-x-16"></div>
            
            <div className="relative text-center">
              {/* Beautiful icon with gradient */}
              <div className="w-20 h-20 bg-linear-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-300/60 transform hover:scale-105 transition-transform">
                <LogOut className="w-9 h-9 text-white" />
              </div>
              
              {/* Bold heading */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to Leave?
              </h3>
              
              {/* Refined description */}
              <p className="text-gray-600 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                You're about to logout from your account. Any unsaved work will be lost.
              </p>
              
              {/* Premium buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-6 py-3.5 bg-linear-to-br from-gray-100 to-gray-50 text-gray-700 font-semibold rounded-2xl hover:from-gray-200 hover:to-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer text-sm border border-gray-200"
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