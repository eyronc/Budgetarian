import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { BrandName } from '../branding/BrandName';

export function Navbar() {
  return (
    <nav className="px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BudgetarianLogo size="medium" />
          <BrandName showTagline size="medium" align="left" />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
            Sign In
          </button>
          <button className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#16A34A] to-[#65A30D] rounded-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}