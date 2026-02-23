import { Edit2, MapPin, Phone, Mail, Calendar, User } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function ProfileCard({ user, onEdit }) {
  const { darkMode } = useDarkMode();

  const infoItems = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'Phone', value: user.phone },
    { icon: MapPin, label: 'Location', value: user.location },
    { icon: Calendar, label: 'Member Since', value: user.memberSince },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className={`relative rounded-3xl overflow-hidden border transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Banner */}
        <div className="h-32 bg-linear-to-r from-emerald-500 via-emerald-400 to-teal-500 relative">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + Edit Button Row */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white dark:border-gray-800 transition-colors">
                {user.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-linear-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Name & Bio */}
          <div>
            <h2 className={`text-2xl font-bold transition-colors ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{user.name}</h2>
            <p className={`mt-1 text-sm leading-relaxed transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-base font-bold mb-5 flex items-center gap-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          <User className="w-4 h-4 text-emerald-500" />
          Account Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className={`flex items-start gap-3 p-4 rounded-2xl transition-colors ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="p-2 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>{label}</p>
                <p className={`text-sm font-medium truncate ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Badge */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>Current Plan</p>
            <p className="text-lg font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Premium Plan ✨
            </p>
          </div>
          <button className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all hover:scale-105 cursor-pointer ${
            darkMode
              ? 'border-emerald-700 text-emerald-400 hover:bg-emerald-900/30'
              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
          }`}>
            Manage Plan
          </button>
        </div>
      </div>
    </div>
  );
}