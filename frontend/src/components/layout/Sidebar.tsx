import { Home, Calendar, ShoppingCart, TrendingUp, Settings, LogOut, X, Menu, ChevronLeft } from 'lucide-react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { useState } from 'react';

interface SidebarProps {
  onLogout: () => void;
  activeSection?: string;
}

export function Sidebar({ onLogout, activeSection = 'dashboard' }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'meal-plans', icon: Calendar, label: 'Meal Plans' },
    { id: 'grocery', icon: ShoppingCart, label: 'Grocery List' },
    { id: 'budget', icon: TrendingUp, label: 'Budget Tracker' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white">
      {/* Header with gradient */}
      <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <BudgetarianLogo size="small" />
            </div>
            <div>
              <div className="font-bold text-lg">Budgetarian</div>
              <div className="text-xs text-green-100">Smart meal planning</div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-green-50'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-green-600'}`} />
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User info card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              JD
            </div>
            <div>
              <div className="font-semibold text-gray-900">John Doe</div>
              <div className="text-sm text-gray-600">Premium Plan</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-600">75% of monthly budget used</p>
        </div>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-4 px-4 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Menu toggle button - Desktop */}
      <button
        onClick={() => setIsDesktopOpen(!isDesktopOpen)}
        className="hidden lg:block fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
        style={{ left: isDesktopOpen ? '288px' : '16px' }}
      >
        {isDesktopOpen ? <ChevronLeft className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex lg:flex-col w-72 bg-white border-r border-gray-200 h-screen sticky top-0 shadow-xl transition-transform duration-300 ${
          isDesktopOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileOpen && (
        <aside className="lg:hidden fixed top-0 left-0 z-50 w-72 bg-white border-r border-gray-200 h-screen flex flex-col shadow-2xl animate-slide-in-left">
          <SidebarContent />
        </aside>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Logout Confirmation
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to logout? Any unsaved changes will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}