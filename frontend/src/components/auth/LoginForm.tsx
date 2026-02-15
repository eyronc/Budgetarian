import { useState } from 'react';
import { Lock, Mail, X } from 'lucide-react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface LoginFormProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onClose, onLogin, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { darkMode } = useDarkMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    onLogin(email, password);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-default"
      onClick={onClose}
    >
      <div 
        className={`rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in transition-colors ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 transition-colors cursor-pointer ${
            darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className={`p-8 pb-6 text-center border-b transition-colors ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div className="flex justify-center mb-4">
            <BudgetarianLogo size="medium" />
          </div>
          <h2 className={`text-2xl font-bold mb-2 transition-colors ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>Welcome Back</h2>
          <p className={`text-sm transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Email field */}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 cursor-default transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-text transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 cursor-default transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-text transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-emerald-500 to-lime-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            Sign In
          </button>

          {/* Switch to register */}
          <p className={`text-center text-sm mt-6 select-none transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-green-600 font-semibold hover:text-green-700 cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}