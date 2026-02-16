import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function Footer() {
  const { darkMode } = useDarkMode();

  return (
    <footer className={`px-6 sm:px-8 py-8 sm:py-10 border-t transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900 border-gray-700'
        : 'bg-gray-50 border-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2.5">
            <BudgetarianLogo size="small" />
            <span className={`text-sm font-semibold transition-colors ${
              darkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              Budget<span className="text-green-600">arian</span>
            </span>
          </div>
          
          {/* Copyright with better spacing */}
          <div className={`text-center text-sm transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2026 Budgetarian. Smart meal planning for budget-conscious eaters.
          </div>
        </div>
      </div>
    </footer>
  );
}