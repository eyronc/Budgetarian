import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { User, Bell, CreditCard, Globe, Moon, Sun, Save, Shield, Mail, Phone, ChevronRight, Lock } from 'lucide-react';
import { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function SettingsPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [budgetSettings, setBudgetSettings] = useState({
    weeklyBudget: '₱150',
    monthlyBudget: '₱600',
    alertThreshold: '90%'
  });
  const { darkMode, setDarkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleBudgetChange = (field, value) => {
    setBudgetSettings({ ...budgetSettings, [field]: value });
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Profile info is READ-ONLY - clicking redirects to profile page
  const profileInfo = [
    { label: 'Full Name', value: 'Aaron Cumahig', icon: User },
    { label: 'Email Address', value: 'eyronc@gmail.com', icon: Mail },
    { label: 'Phone Number', value: '+639696969696', icon: Phone },
  ];

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-linear-to-br from-gray-900 via-slate-900 to-gray-800' 
          : 'bg-linear-to-br from-gray-50 via-slate-50/50 to-gray-100'
      }`}>
        <Sidebar onLogout={handleLogout} activeSection="settings" />
        
        <div className="flex-1 mt-5 pt-20 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-1 transition-colors ${
              darkMode
                ? 'bg-linear-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent'
                : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
            }`}>
              Settings
            </h1>
            <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your account and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Settings Sections */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {/* Profile Information - READ ONLY with redirect */}
              <div 
                onClick={handleEditProfile}
                className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl group ${
                  darkMode
                    ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md hover:border-emerald-600/50'
                    : 'bg-white/90 border-gray-200/50 backdrop-blur-md hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Profile Information
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-semibold hidden sm:inline">Edit Profile</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {profileInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-colors ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}>
                        <Icon className={`w-4 h-4 shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {info.label}
                          </div>
                          <div className={`text-sm font-bold truncate ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {info.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  darkMode 
                    ? 'bg-emerald-900/20 text-emerald-400' 
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold">Click to edit your profile information</span>
                </div>
              </div>

              {/* Budget Configuration */}
              <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md'
                  : 'bg-white/90 border-gray-200/50 backdrop-blur-md'
              }`}>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Budget Configuration
                  </h3>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  {[
                    { label: 'Weekly Budget', field: 'weeklyBudget', type: 'text' },
                    { label: 'Monthly Budget', field: 'monthlyBudget', type: 'text' },
                    { label: 'Alert Threshold', field: 'alertThreshold', type: 'text' },
                  ].map((setting) => (
                    <div key={setting.field}>
                      <label className={`text-xs sm:text-sm font-bold mb-2 block transition-colors ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {setting.label}
                      </label>
                      <input
                        type={setting.type}
                        value={budgetSettings[setting.field]}
                        onChange={(e) => handleBudgetChange(setting.field, e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl font-semibold focus:outline-none focus:ring-2 transition-all cursor-text ${
                          darkMode
                            ? 'bg-gray-700/50 border-gray-600 text-gray-200 focus:ring-orange-500 focus:border-orange-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-orange-500 focus:border-orange-500'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Preferences */}
              <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md'
                  : 'bg-white/90 border-gray-200/50 backdrop-blur-md'
              }`}>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Regional Preferences
                  </h3>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  {[
                    { label: 'Language', value: 'English', options: ['English', 'Filipino', 'Spanish'] },
                    { label: 'Currency', value: 'PHP (₱)', options: ['PHP (₱)', 'USD ($)', 'EUR (€)'] },
                    { label: 'Time Zone', value: 'Asia/Manila (UTC+8)', options: ['Asia/Manila (UTC+8)', 'UTC', 'PST (UTC-8)'] },
                  ].map((setting) => (
                    <div key={setting.label}>
                      <label className={`text-xs sm:text-sm font-bold mb-2 block transition-colors ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {setting.label}
                      </label>
                      <select
                        defaultValue={setting.value}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl font-semibold focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                          darkMode
                            ? 'bg-gray-700/50 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      >
                        {setting.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              
              {/* Appearance - Dark Mode Toggle */}
              <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md'
                  : 'bg-white/90 border-gray-200/50 backdrop-blur-md'
              }`}>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                    darkMode
                      ? 'bg-linear-to-br from-indigo-400 to-purple-600'
                      : 'bg-linear-to-br from-gray-400 to-gray-600'
                  }`}>
                    {darkMode ? <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Appearance
                  </h3>
                </div>
                
                <label className={`flex items-center justify-between cursor-pointer p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all ${
                  darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                }`}>
                  <div>
                    <div className={`font-bold text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      Dark Mode
                    </div>
                    <div className={`text-xs sm:text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {darkMode ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-14 h-7 rounded-full transition-all cursor-pointer ${
                      darkMode 
                        ? 'bg-linear-to-r from-indigo-500 to-purple-600' 
                        : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform flex items-center justify-center ${
                      darkMode ? 'translate-x-7' : ''
                    }`}>
                      {darkMode ? <Moon className="w-3 h-3 text-indigo-600" /> : <Sun className="w-3 h-3 text-gray-600" />}
                    </div>
                  </div>
                </label>

                <div className={`mt-4 p-3 rounded-xl text-xs sm:text-sm transition-colors ${
                  darkMode 
                    ? 'bg-indigo-900/30 border border-indigo-700/50 text-indigo-200' 
                    : 'bg-blue-50 border border-blue-200 text-blue-900'
                }`}>
                  <strong>💡 Tip:</strong> Dark mode reduces eye strain in low-light environments
                </div>
              </div>

              {/* Security */}
              <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md'
                  : 'bg-white/90 border-gray-200/50 backdrop-blur-md'
              }`}>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Security
                  </h3>
                </div>
                
                <button className={`w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold border-2 transition-all text-sm sm:text-base cursor-pointer hover:scale-105 ${
                  darkMode
                    ? 'bg-red-900/20 text-red-400 border-red-700 hover:bg-red-900/40 hover:shadow-lg'
                    : 'bg-linear-to-r from-red-50 to-white text-red-600 border-red-200 hover:bg-red-50 hover:shadow-lg'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Change Password
                  </div>
                </button>
              </div>

              {/* Save Button */}
              <button className="w-full py-3.5 sm:py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 text-base sm:text-lg">
                <Save className="w-5 h-5 sm:w-6 sm:h-6" />
                Save Changes
              </button>

              {/* Account Info */}
              <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                darkMode
                  ? 'bg-linear-to-br from-gray-800 to-gray-900 border-gray-700'
                  : 'bg-linear-to-br from-emerald-50 to-teal-50 border-emerald-200'
              }`}>
                <div className="text-xs sm:text-sm font-bold text-gray-500 mb-2">Account Status</div>
                <div className={`text-xl sm:text-2xl font-black mb-1 transition-colors ${
                  darkMode 
                    ? 'bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'
                    : 'bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
                }`}>
                  Premium Plan ✨
                </div>
                <div className={`text-xs sm:text-sm font-semibold transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active since Feb 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}