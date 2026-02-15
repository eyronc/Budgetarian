import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { User, Bell, Lock, CreditCard, Globe, Moon, Sun, Save, Shield, Mail, Phone } from 'lucide-react';
import { useState, useEffect, createContext, useContext } from 'react';

// Dark Mode Context
const DarkModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}>({
  darkMode: false,
  setDarkMode: () => {},
});

export function SettingsPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [notifications, setNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const settingsSections = [
    {
      title: 'Profile Information',
      icon: User,
      gradient: 'from-emerald-400 to-emerald-600',
      settings: [
        { label: 'Full Name', value: 'Aaron Cumahig', type: 'text', icon: User },
        { label: 'Email Address', value: 'eyronc@gmail.com', type: 'email', icon: Mail },
        { label: 'Phone Number', value: '+639696969696', type: 'tel', icon: Phone },
      ]
    },
    {
      title: 'Regional Preferences',
      icon: Globe,
      gradient: 'from-blue-400 to-blue-600',
      settings: [
        { label: 'Language', value: 'English', type: 'select', options: ['English', 'Filipino', 'Spanish'] },
        { label: 'Currency', value: 'PHP (₱)', type: 'select', options: ['PHP (₱)', 'USD ($)', 'EUR (€)'] },
        { label: 'Time Zone', value: 'Asia/Manila (UTC+8)', type: 'select', options: ['Asia/Manila (UTC+8)', 'UTC', 'PST (UTC-8)'] },
      ]
    },
    {
      title: 'Budget Configuration',
      icon: CreditCard,
      gradient: 'from-orange-400 to-orange-600',
      settings: [
        { label: 'Weekly Budget', value: '₱150', type: 'number' },
        { label: 'Monthly Budget', value: '₱600', type: 'number' },
        { label: 'Alert Threshold', value: '90%', type: 'number' },
      ]
    },
  ];

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`flex min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' 
          : 'bg-gradient-to-br from-gray-50 via-slate-50/50 to-gray-100'
      }`}>
        <Sidebar onLogout={handleLogout} activeSection="settings" />
        
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight pb-3 transition-colors ${
              darkMode
                ? 'bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
            }`}>
              Settings
            </h1>
            <p className={`text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your account and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Settings Sections */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {settingsSections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <div 
                    key={idx} 
                    className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-all duration-300 ${
                      darkMode
                        ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md'
                        : 'bg-white/90 border-gray-200/50 backdrop-blur-md'
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-5 sm:mb-6">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {section.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-5">
                      {section.settings.map((setting, settingIdx) => {
                        const SettingIcon = setting.icon;
                        return (
                          <div key={settingIdx}>
                            <label className={`flex items-center gap-2 text-xs sm:text-sm font-bold mb-2 transition-colors ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {SettingIcon && <SettingIcon className="w-4 h-4" />}
                              {setting.label}
                            </label>
                            {setting.type === 'select' ? (
                              <select
                                defaultValue={setting.value}
                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl font-semibold focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                                  darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                              >
                                {setting.options?.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={setting.type}
                                defaultValue={setting.value}
                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl font-semibold focus:outline-none focus:ring-2 transition-all ${
                                  darkMode
                                    ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Notification Settings */}
              <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 border shadow-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-md'
                  : 'bg-white/90 border-gray-200/50 backdrop-blur-md'
              }`}>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <label className={`flex items-center justify-between cursor-pointer p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all ${
                    darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  }`}>
                    <div>
                      <div className={`font-bold text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Email Notifications
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Weekly meal plan updates
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                        notifications 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                          : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}></div>
                      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications ? 'translate-x-5' : ''
                      }`}></div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center justify-between cursor-pointer p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all ${
                    darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  }`}>
                    <div>
                      <div className={`font-bold text-sm sm:text-base transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Budget Alerts
                      </div>
                      <div className={`text-xs sm:text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Get notified near budget limit
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={budgetAlerts}
                        onChange={(e) => setBudgetAlerts(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                        budgetAlerts 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                          : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}></div>
                      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        budgetAlerts ? 'translate-x-5' : ''
                      }`}></div>
                    </div>
                  </label>
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
                      ? 'bg-gradient-to-br from-indigo-400 to-purple-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-600'
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
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
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
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Security
                  </h3>
                </div>
                
                <button className={`w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold border-2 transition-all text-sm sm:text-base ${
                  darkMode
                    ? 'bg-red-900/20 text-red-400 border-red-700 hover:bg-red-900/40 hover:shadow-lg'
                    : 'bg-gradient-to-r from-red-50 to-white text-red-600 border-red-200 hover:bg-red-50 hover:shadow-lg'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Change Password
                  </div>
                </button>
              </div>

              {/* Save Button */}
              <button className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 text-base sm:text-lg">
                <Save className="w-5 h-5 sm:w-6 sm:h-6" />
                Save Changes
              </button>

              {/* Account Info */}
              <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                darkMode
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                  : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
              }`}>
                <div className="text-xs sm:text-sm font-bold text-gray-500 mb-2">Account Status</div>
                <div className={`text-xl sm:text-2xl font-black mb-1 transition-colors ${
                  darkMode 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
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
    </DarkModeContext.Provider>
  );
}