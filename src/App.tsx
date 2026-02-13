//tasks to do later: change alignment on some of components

import { useState } from 'react';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { Layout } from './components/layout/Layout';
import { ArrowRight, DollarSign, Apple, TrendingDown } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-24 bg-linear-to-b from-white to-[#F0FDF4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#DCFCE7] text-[#16A34A] rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              Save money, eat healthy
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Healthy meals{' '}
              <span className="bg-linear-to-r from-[#16A34A] to-[#65A30D] bg-clip-text text-transparent">
                on your budget
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              AI-powered meal planning that maximizes nutrition while staying within your spending limit. 
              Perfect for students, families, and budget-conscious eaters.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#16A34A] to-[#65A30D] text-white font-semibold rounded-full hover:shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                Start Planning Meals
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-[#16A34A] transition-all cursor-pointer text-sm sm:text-base">
                See How It Works
              </button>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-20 px-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-[#16A34A] to-[#65A30D] rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Budget-Based
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Set your weekly or monthly food budget. Our AI creates meal plans that never exceed your limit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-[#F59E0B] to-[#EAB308] rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Apple className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Nutrition-Optimized
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Get balanced meals with proper protein, carbs, and nutrients - without breaking the bank.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-[#0EA5E9] to-[#14B8A6] rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Smart Shopping
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Auto-generated grocery lists with price estimates and money-saving ingredient swaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              How it works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Three simple steps to healthier, budget-friendly eating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 px-4">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-[#16A34A]">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Set Your Budget
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Tell us your daily or weekly food budget. Set preferences for diet type and health goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FEF3C7] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-[#F59E0B]">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                AI Plans Your Meals
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our AI creates a complete meal plan optimized for nutrition and cost based on local prices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-[#0EA5E9]">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Shop & Cook
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Get your grocery list with estimated costs. Follow simple recipes matched to your skill level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-linear-to-br from-[#16A34A] to-[#65A30D]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 text-center text-white">
            <div className="px-4">
              <div className="text-4xl sm:text-5xl font-bold mb-2">40%</div>
              <div className="text-base sm:text-lg text-green-100">Average savings on groceries</div>
            </div>
            <div className="px-4">
              <div className="text-4xl sm:text-5xl font-bold mb-2">100%</div>
              <div className="text-base sm:text-lg text-green-100">Nutritionally balanced meals</div>
            </div>
            <div className="px-4">
              <div className="text-4xl sm:text-5xl font-bold mb-2">15min</div>
              <div className="text-base sm:text-lg text-green-100">Average meal prep time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Ready to eat healthy
            <br />
            without overspending?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 px-4">
            Join thousands using Budgetarian to save money and improve their nutrition
          </p>
          <button className="px-8 sm:px-10 py-4 sm:py-5 bg-linear-to-r from-[#16A34A] to-[#65A30D] text-white font-semibold rounded-full hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2 text-base sm:text-lg mx-4">
            Start Your Free Meal Plan
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <p className="text-xs sm:text-sm text-gray-500 mt-4 px-4">
            No credit card required • Free forever
          </p>
        </div>
      </section>
    </Layout>
  );
}