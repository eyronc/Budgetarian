import { BudgetarianLogo } from '../branding/BudgetarianLogo';

export function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-6 sm:py-8 bg-[#F9FAFB] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BudgetarianLogo size="small" />
            <span className="text-sm font-semibold text-gray-900">
              Budget<span className="text-green-600">arian</span>
            </span>
          </div>
          <div className="text-center text-gray-600 text-xs sm:text-sm">
            © 2026 Budgetarian. Smart meal planning for budget-conscious eaters.
          </div>
        </div>
      </div>
    </footer>
  );
}