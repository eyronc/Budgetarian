import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { BrandName } from '../branding/BrandName';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface NavbarProps {
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export function Navbar({ onSignIn, onGetStarted }: NavbarProps) {
  const { darkMode } = useDarkMode();

  return (
    <nav className={`px-6 sm:px-8 py-4 backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300 ${
      darkMode
        ? 'bg-gray-900/80 border-gray-700'
        : 'bg-white/80 border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <BudgetarianLogo size="medium" />
          <BrandName showTagline size="medium" align="left" />
        </div>
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onSignIn}
            className={`hidden sm:inline-flex px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
              darkMode
                ? 'text-gray-300 hover:text-emerald-400'
                : 'text-gray-700 hover:text-green-600'
            }`}
          >
            Sign In
          </button>
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 text-sm font-semibold bg-linear-to-r from-emerald-500 to-lime-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}