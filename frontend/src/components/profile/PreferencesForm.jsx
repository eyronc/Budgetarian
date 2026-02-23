import { useState } from 'react';
import { Save, Bell, Globe, Utensils, AlertTriangle, X } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

function Toggle({ enabled, onChange, darkMode }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
        enabled ? 'bg-emerald-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );
}

const DIETARY_OPTIONS = ['Halal', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb', 'Paleo'];
const ALLERGY_OPTIONS = ['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish'];

export function PreferencesForm({ preferences, onSave }) {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({ ...preferences });

  const handleToggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const handleSelect = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleArrayItem = (field, item) => {
    const arr = formData[field] || [];
    setFormData({
      ...formData,
      [field]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const sectionClass = `rounded-3xl border p-6 transition-colors ${
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  }`;

  const sectionTitle = `text-base font-bold mb-5 flex items-center gap-2 ${
    darkMode ? 'text-gray-100' : 'text-gray-900'
  }`;

  const labelClass = `text-xs font-semibold uppercase tracking-wide ${
    darkMode ? 'text-gray-400' : 'text-gray-500'
  }`;

  const selectClass = `px-4 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer ${
    darkMode
      ? 'bg-gray-700/60 border-gray-600 text-gray-100'
      : 'bg-gray-50 border-gray-200 text-gray-900'
  }`;

  const notifications = [
    { field: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates and reports via email' },
    { field: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time alerts on your device' },
    { field: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of your weekly progress' },
    { field: 'mealReminders', label: 'Meal Reminders', desc: 'Reminders to log your daily meals' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Notifications */}
      <div className={sectionClass}>
        <h3 className={sectionTitle}>
          <Bell className="w-4 h-4 text-emerald-500" />
          Notifications
        </h3>
        <div className="space-y-4">
          {notifications.map(({ field, label, desc }) => (
            <div key={field} className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="mr-4">
                <p className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{label}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
              </div>
              <Toggle enabled={formData[field]} onChange={() => handleToggle(field)} darkMode={darkMode} />
            </div>
          ))}
        </div>
      </div>

      {/* Localization */}
      <div className={sectionClass}>
        <h3 className={sectionTitle}>
          <Globe className="w-4 h-4 text-emerald-500" />
          Localization
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block ${labelClass} mb-2`}>Currency</label>
            <select name="currency" value={formData.currency} onChange={handleSelect} className={`w-full ${selectClass}`}>
              <option value="PHP">PHP — Philippine Peso</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="JPY">JPY — Japanese Yen</option>
            </select>
          </div>
          <div>
            <label className={`block ${labelClass} mb-2`}>Language</label>
            <select name="language" value={formData.language} onChange={handleSelect} className={`w-full ${selectClass}`}>
              <option value="en">English</option>
              <option value="fil">Filipino</option>
              <option value="es">Spanish</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          <div>
            <label className={`block ${labelClass} mb-2`}>Timezone</label>
            <select name="timezone" value={formData.timezone} onChange={handleSelect} className={`w-full ${selectClass}`}>
              <option value="Asia/Manila">Asia/Manila (PHT)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div className={sectionClass}>
        <h3 className={sectionTitle}>
          <Utensils className="w-4 h-4 text-emerald-500" />
          Dietary Restrictions
        </h3>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((item) => {
            const active = formData.dietaryRestrictions?.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleArrayItem('dietaryRestrictions', item)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer hover:scale-105 ${
                  active
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200/50'
                    : darkMode
                    ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-emerald-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-emerald-300'
                }`}
              >
                {active && <X className="w-3 h-3" />}
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Allergies */}
      <div className={sectionClass}>
        <h3 className={sectionTitle}>
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          Allergies
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALLERGY_OPTIONS.map((item) => {
            const active = formData.allergies?.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleArrayItem('allergies', item)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer hover:scale-105 ${
                  active
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200/50'
                    : darkMode
                    ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-orange-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-orange-300'
                }`}
              >
                {active && <X className="w-3 h-3" />}
                {item}
              </button>
            );
          })}
        </div>
        {formData.allergies?.length === 0 && (
          <p className={`text-xs mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            No allergies selected. Tap to add any you have.
          </p>
        )}
      </div>

      {/* Save */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      >
        <Save className="w-5 h-5" />
        Save Preferences
      </button>
    </form>
  );
}