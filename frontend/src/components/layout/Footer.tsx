import { BudgetarianLogo } from '../branding/BudgetarianLogo';

export function Footer() {
  return (
    <footer className="px-6 sm:px-8 py-8 sm:py-10 bg-[#F9FAFB] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2.5">
            <BudgetarianLogo size="small" />
            <span className="text-sm font-semibold text-gray-900">
              Budget<span className="text-green-600">arian</span>
            </span>
          </div>
          
          {/* Copyright with better spacing */}
          <div className="text-center text-gray-600 text-sm">
            © 2026 Budgetarian. Smart meal planning for budget-conscious eaters.
          </div>
        </div>
      </div>
    </footer>
  );
}