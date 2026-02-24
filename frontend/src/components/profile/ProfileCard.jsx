import { Edit2, MapPin, Phone, Mail, Calendar, User } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function ProfileCard({ user, onEdit }) {
  const { darkMode } = useDarkMode();

  const infoItems = [
    { icon: Mail, label: 'EMAIL', value: user.email },
    { icon: Phone, label: 'PHONE', value: user.phone },
    { icon: MapPin, label: 'LOCATION', value: user.location },
    { icon: Calendar, label: 'MEMBER SINCE', value: user.memberSince },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header Card with Banner */}
      <div className={`relative rounded-3xl overflow-hidden border transition-colors ${
        darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white border-gray-200'
      }`}>
        {/* Gradient Banner */}
        <div className="h-40 bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-500 relative">
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
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl border-4 border-gray-800 transition-transform hover:scale-105 cursor-pointer">
                {user.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-linear-to-br from-green-400 to-emerald-500 rounded-full border-4 border-gray-800 shadow-md"></div>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Name & Bio */}
          <div className="mb-6">
            <h2 className={`text-3xl font-bold mb-2 transition-colors ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{user.name}</h2>
            <p className={`text-sm leading-relaxed transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Account Information Grid */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-base font-bold mb-5 flex items-center gap-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          <User className="w-5 h-5 text-emerald-500" />
          Account Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className={`flex items-start gap-4 p-5 rounded-2xl transition-all cursor-default ${
              darkMode ? 'bg-gray-700/50 hover:bg-gray-700/70' : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="p-3 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>{label}</p>
                <p className={`text-sm font-semibold truncate ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Badge */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>Current Plan</p>
            <p className="text-2xl font-black bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Premium Plan ✨
            </p>
          </div>
          <button className={`px-5 py-2.5 text-sm font-bold rounded-xl border-2 transition-all hover:scale-105 cursor-pointer ${
            darkMode
              ? 'border-emerald-600/50 text-emerald-400 hover:bg-emerald-900/30 hover:border-emerald-500'
              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300'
          }`}>
            Manage Plan
          </button>
        </div>
      </div>
    </div>
  );
}