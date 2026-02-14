import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { BrandName } from '../branding/BrandName';

export function Navbar() {
  return (
    <nav className="px-6 sm:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Brand with consistent gap */}
        <div className="flex items-center gap-3">
          <BudgetarianLogo size="medium" />
          <BrandName showTagline size="medium" align="left" />
        </div>
        
        {/* Navigation buttons with better spacing */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex px-5 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
            Sign In
          </button>
          <button 
            className="px-6 py-2.5 text-sm font-semibold text-white rounded-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}