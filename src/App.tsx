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
      <section className="px-6 sm:px-8 py-20 sm:py-28 md:py-32" style={{ background: 'linear-gradient(to bottom, white, #F0FDF4)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#16A34A] rounded-full text-sm font-medium mb-8">
              <TrendingDown className="w-4 h-4" />
              Save money, eat healthy
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6" style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Healthy meals{' '}
              <span style={{ 
                backgroundImage: 'linear-gradient(to right, #16A34A, #65A30D)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                on your budget
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto" style={{ lineHeight: '1.6' }}>
              AI-powered meal planning that maximizes nutrition while staying within your spending limit. 
              Perfect for students, families, and budget-conscious eaters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-full hover:shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-base"
                style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
              >
                Start Planning Meals
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-[#16A34A] transition-all cursor-pointer text-base">
                See How It Works
              </button>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(to bottom right, #16A34A, #65A30D)' }}
              >
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Budget-Based
              </h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                Set your weekly or monthly food budget. Our AI creates meal plans that never exceed your limit.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(to bottom right, #F59E0B, #EAB308)' }}
              >
                <Apple className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Nutrition-Optimized
              </h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                Get balanced meals with proper protein, carbs, and nutrients - without breaking the bank.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(to bottom right, #0EA5E9, #14B8A6)' }}
              >
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Smart Shopping
              </h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                Auto-generated grocery lists with price estimates and money-saving ingredient swaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 sm:px-8 py-24 sm:py-32 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to healthier, budget-friendly eating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-[#16A34A]">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Set Your Budget
              </h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                Tell us your daily or weekly food budget. Set preferences for diet type and health goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#FEF3C7] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-[#F59E0B]">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Plans Your Meals
              </h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                Our AI creates a complete meal plan optimized for nutrition and cost based on local prices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-[#0EA5E9]">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Shop & Cook
              </h3>
              <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                Get your grocery list with estimated costs. Follow simple recipes matched to your skill level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="px-6 sm:px-8 py-20 sm:py-24"
        style={{ background: 'linear-gradient(to bottom right, #16A34A, #65A30D)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center text-white">
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3">40%</div>
              <div className="text-lg text-green-100">Average savings on groceries</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3">100%</div>
              <div className="text-lg text-green-100">Nutritionally balanced meals</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold mb-3">15min</div>
              <div className="text-lg text-green-100">Average meal prep time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 sm:px-8 py-24 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ lineHeight: '1.15' }}>
            Ready to eat healthy
            <br />
            without overspending?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands using Budgetarian to save money and improve their nutrition
          </p>
          <button 
            className="px-10 py-4 text-white font-semibold rounded-full hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2 text-lg"
            style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
          >
            Start Your Free Meal Plan
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free forever
          </p>
        </div>
      </section>
    </Layout>
  );
}