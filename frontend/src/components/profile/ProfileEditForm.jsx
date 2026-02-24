import { useState } from 'react';
import { Save, X, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function ProfileEditForm({ user, onSave, onCancel }) {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const fields = [
    { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your full name' },
    { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'your@email.com' },
    { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+63 9XX XXX XXXX' },
    { name: 'location', label: 'Location', icon: MapPin, type: 'text', placeholder: 'City, Country' },
  ];

  const inputClass = `w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-text ${
    darkMode
      ? 'bg-gray-700/60 border-gray-600 text-gray-100 placeholder-gray-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }`;

  const labelClass = `block text-xs font-semibold uppercase tracking-wide mb-2 ${
    darkMode ? 'text-gray-400' : 'text-gray-500'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Card */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Edit Profile
            </h3>
            <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Update your personal information
            </p>
          </div>
          {/* Avatar Preview */}
          <div className="w-16 h-16 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg cursor-default">
            {formData.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AC'}
          </div>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map(({ name, label, icon: Icon, type, placeholder }) => (
            <div key={name}>
              <label className={labelClass}>{label}</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Icon className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type={type}
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bio - Full Width */}
        <div className="mt-5">
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Bio
            </span>
          </label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Tell us a little about yourself..."
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none cursor-text ${
              darkMode
                ? 'bg-gray-700/60 border-gray-600 text-gray-100 placeholder-gray-500'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm border transition-all hover:scale-105 cursor-pointer ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </form>
  );
}