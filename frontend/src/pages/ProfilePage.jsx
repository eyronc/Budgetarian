import { useState } from 'react';
import { ArrowLeft, User, Target, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { ProfileCard } from '../components/profile/ProfileCard';
import { ProfileEditForm } from '../components/profile/ProfileEditForm';
import { HealthGoalsForm } from '../components/profile/HealthGoalsForm';
import { PreferencesForm } from '../components/profile/PreferencesForm';

export function ProfilePage() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: 'Aaron Cumahig',
    email: 'aaron@example.com',
    phone: '+639696969696',
    location: 'Cebu City, Philippines',
    initials: 'AC',
    memberSince: 'January 2024',
    bio: 'Passionate about healthy eating and budget-friendly meal planning.'
  });

  const [healthGoals, setHealthGoals] = useState({
    weight: 70,
    targetWeight: 65,
    height: 170,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate',
    dailyCalories: 2000,
    proteinGoal: 150,
    carbsGoal: 200,
    fatsGoal: 65,
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    mealReminders: true,
    currency: 'PHP',
    language: 'en',
    timezone: 'Asia/Manila',
    dietaryRestrictions: ['Halal'],
    allergies: [],
  });

  const handleSaveProfile = (data) => {
    setUserData({ ...userData, ...data });
    setIsEditing(false);
    // Add success toast notification here
  };

  const handleSaveHealthGoals = (data) => {
    setHealthGoals(data);
    // Add success toast notification here
  };

  const handleSavePreferences = (data) => {
    setPreferences(data);
    // Add success toast notification here
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'health', label: 'Health Goals', icon: Target },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md border-b transition-colors ${
        darkMode 
          ? 'bg-gray-900/95 border-gray-700/50' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-xl transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
            <div>
              <h1 className={`text-2xl font-bold transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>My Profile</h1>
              <p className={`text-sm transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Manage your account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className={`flex gap-2 mb-8 p-2 rounded-2xl border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsEditing(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isActive
                    ? darkMode
                      ? 'bg-emerald-900/30 text-emerald-400'
                      : 'bg-emerald-50 text-emerald-700'
                    : darkMode
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'profile' && (
            isEditing ? (
              <ProfileEditForm
                user={userData}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <ProfileCard
                user={userData}
                onEdit={() => setIsEditing(true)}
              />
            )
          )}

          {activeTab === 'health' && (
            <HealthGoalsForm
              goals={healthGoals}
              onSave={handleSaveHealthGoals}
            />
          )}

          {activeTab === 'preferences' && (
            <PreferencesForm
              preferences={preferences}
              onSave={handleSavePreferences}
            />
          )}
        </div>
      </div>
    </div>
  );
}