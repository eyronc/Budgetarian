import { useState } from 'react';
import { Lock, Mail, User, X } from 'lucide-react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';

interface RegisterFormProps {
  onClose: () => void;
  onRegister: (email: string, password: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onClose, onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreedToTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    onRegister(email, password, name);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in cursor-default"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl relative animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl">
            {/* Left side - Branding (hidden on mobile) */}
            <div className="hidden md:flex p-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex-col justify-center items-center text-white relative">
              {/* Animated decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 animate-slide-up text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-2xl hover:scale-110 transition-transform duration-500 mx-auto">
                  <BudgetarianLogo size = "large" />
                </div>
                <h2 className="text-3xl font-bold mb-3">Join Budgetarian</h2>
                <p className="text-emerald-50 text-sm px-4">
                  Start planning healthy meals within your budget today
                </p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-6 sm:p-8 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-6 animate-slide-up">Create Account</h3>
              
              <form onSubmit={handleSubmit} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-shake">
                    {error}
                  </div>
                )}

                {/* Name field */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 cursor-default">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm cursor-text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 cursor-default">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm cursor-text"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 cursor-default">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm cursor-text"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 cursor-default">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm cursor-text"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="mb-5">
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed select-none">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors cursor-pointer"
                      >
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors cursor-pointer"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:scale-105 text-sm cursor-pointer"
                  style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
                >
                  Create Account
                </button>

                {/* Switch to login */}
                <p className="text-center text-xs text-gray-600 mt-4 select-none">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      {showTerms && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[70] p-4 animate-fade-in"
          onClick={() => setShowTerms(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-emerald-25 to-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Terms & Privacy</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-700 leading-relaxed">
              <div className="space-y-6">
                <div className="animate-slide-up">
                  <h4 className="font-bold text-lg mb-3 text-emerald-600 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-sm">📋</span>
                    Terms of Service
                  </h4>
                  <p className="mb-4 text-gray-600">
                    By using Budgetarian, you agree to:
                  </p>
                  <ul className="space-y-3 ml-4">
                    {[
                      'You must be at least 13 years old to use this service',
                      'You are responsible for maintaining account security',
                      'Use the service for lawful purposes only',
                      'Meal plans are for guidance only, not medical advice',
                      'We may modify or terminate the service at any time'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <h4 className="font-bold text-lg mb-3 text-emerald-600 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-sm">🔒</span>
                    Privacy Policy
                  </h4>
                  <p className="mb-4 text-gray-600">
                    We protect your privacy by:
                  </p>
                  <ul className="space-y-3 ml-4">
                    {[
                      'Collecting only necessary information',
                      'Storing meal plans and data securely',
                      'Never selling your data to third parties',
                      'Allowing data deletion on request',
                      'Using cookies to improve experience',
                      'Encrypting all stored data'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <p className="text-xs text-emerald-900">
                    <strong className="font-bold">📅 Last Updated:</strong> February 15, 2026<br />
                    <strong className="font-bold">📧 Questions?</strong> <span className="text-emerald-600 font-semibold cursor-pointer">support@budgetarian.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <button
                onClick={() => setShowTerms(false)}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transition-all cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}