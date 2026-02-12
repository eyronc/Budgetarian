import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { DollarSign, Apple, TrendingDown, Sprout, ChefHat, ShoppingCart } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-8">
            <Sprout className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Save money, eat healthy</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Healthy meals{' '}
            <span 
              className="inline-block bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, #16A34A, #65A30D)' }}
            >
              on your budget
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            AI-powered meal planning that maximizes nutrition while staying within your spending limit. 
            Perfect for students, families, and budget-conscious eaters.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white rounded-full hover:shadow-xl hover:scale-105 transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
            >
              Start Planning Meals
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-green-600 hover:text-green-600 transition-all duration-200">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Budget-Based</h3>
              <p className="text-gray-600 leading-relaxed">
                Set your weekly or monthly food budget. Our AI creates meal plans that never exceed your limit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Apple className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nutrition-Optimized</h3>
              <p className="text-gray-600 leading-relaxed">
                Get balanced meals with proper protein, carbs, and nutrients – without breaking the bank.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingDown className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Shopping</h3>
              <p className="text-gray-600 leading-relaxed">
                Auto-generated grocery lists with price estimates and money-saving ingredient swaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section 
        className="w-full px-4 sm:px-6 py-16 sm:py-20"
        style={{ background: 'linear-gradient(to bottom, white, rgba(240, 253, 244, 0.3))' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to healthier, budget-friendly eating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(to bottom right, #DCFCE7, #BBF7D0)' }}
              >
                <span className="text-3xl font-bold text-green-700">1</span>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Set Your Budget</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us your weekly food budget and dietary preferences
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(to bottom right, #FEF3C7, #FDE68A)' }}
              >
                <span className="text-3xl font-bold text-amber-700">2</span>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized meal plans optimized for nutrition and cost
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(to bottom right, #CFFAFE, #A5F3FC)' }}
              >
                <span className="text-3xl font-bold text-cyan-700">3</span>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Shop & Cook</h3>
              <p className="text-gray-600 leading-relaxed">
                Use your smart grocery list and easy-to-follow recipes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 py-16 sm:py-20">
        <div 
          className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 text-center"
          style={{ background: 'linear-gradient(to bottom right, #16A34A, #15803D)' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to eat better for less?
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Join thousands of budget-conscious eaters who've transformed their meal planning
          </p>
          <button className="px-8 py-4 text-base font-semibold text-green-700 bg-white rounded-full hover:shadow-xl hover:scale-105 transition-all duration-200">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default App;