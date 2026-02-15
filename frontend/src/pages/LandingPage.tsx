import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { ArrowRight, DollarSign, Apple, TrendingDown } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = (email: string, _password: string) => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    setShowLoginForm(false);
    navigate('/dashboard');
  };

  const handleRegister = (email: string, _password: string, _name: string) => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    setShowRegisterForm(false);
    navigate('/dashboard');
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Layout onSignIn={() => setShowLoginForm(true)} onGetStarted={() => setShowRegisterForm(true)}>
        {/* Hero Section */}
        <section className={`px-6 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24 relative overflow-hidden transition-colors ${
          darkMode 
            ? 'bg-linear-to-b from-gray-900 to-gray-800' 
            : 'bg-linear-to-b from-white to-emerald-50'
        }`}>
          {/* Animated background elements */}
          <div className={`absolute top-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float ${
            darkMode ? 'bg-emerald-900' : 'bg-green-100'
          }`} />
          <div className={`absolute bottom-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed ${
            darkMode ? 'bg-lime-900' : 'bg-lime-100'
          }`} />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 animate-fade-in">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                darkMode 
                  ? 'bg-emerald-900/30 text-emerald-400' 
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                <TrendingDown className="w-4 h-4" />
                Save money, eat healthy
              </div>

              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`} style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}>
                Healthy meals on
                <br />
                <span className="bg-linear-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
                  your budget
                </span>
              </h1>

              <p className={`text-lg sm:text-xl mb-10 sm:mb-12 max-w-3xl mx-auto transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`} style={{ lineHeight: '1.6' }}>
                AI-powered meal planning that maximizes nutrition while staying within your spending limit.
                Perfect for students, families, and budget-conscious eaters.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-emerald-500 to-lime-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-base"
                >
                  Start Planning Meals
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollToHowItWorks}
                  className={`w-full sm:w-auto px-8 py-3.5 font-semibold rounded-full border-2 hover:scale-105 transition-all cursor-pointer text-base ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-200 border-gray-700 hover:border-emerald-500' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-500'
                  }`}
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* Feature Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  icon: DollarSign,
                  gradient: 'from-emerald-500 to-lime-600',
                  title: 'Budget-Based',
                  description: 'Set your weekly or monthly food budget. Our AI creates meal plans that never exceed your limit.',
                },
                {
                  icon: Apple,
                  gradient: 'from-amber-500 to-yellow-600',
                  title: 'Nutrition-Optimized',
                  description: 'Get balanced meals with proper protein, carbs, and nutrients - without breaking the bank.',
                },
                {
                  icon: TrendingDown,
                  gradient: 'from-sky-500 to-teal-600',
                  title: 'Smart Shopping',
                  description: 'Auto-generated grocery lists with price estimates and money-saving ingredient swaps.',
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl p-8 border hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-slide-up ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-700/50' 
                        : 'bg-white shadow-sm border-gray-100'
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 hover:scale-110 transition-transform duration-300 bg-linear-to-br ${card.gradient}`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {card.title}
                    </h3>
                    <p className={`text-base transition-colors ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} style={{ lineHeight: '1.6' }}>
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className={`px-6 sm:px-8 py-20 sm:py-24 relative overflow-hidden transition-colors ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float ${
            darkMode ? 'bg-emerald-900' : 'bg-green-50'
          }`} />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className={`text-4xl sm:text-5xl font-bold mb-4 transition-colors ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                How it works
              </h2>
              <p className={`text-xl transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Three simple steps to healthier, budget-friendly eating
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  number: '1',
                  bgColor: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100',
                  textColor: darkMode ? 'text-emerald-400' : 'text-emerald-700',
                  title: 'Set Your Budget',
                  description: 'Tell us your daily or weekly food budget. Set preferences for diet type and health goals.',
                },
                {
                  number: '2',
                  bgColor: darkMode ? 'bg-amber-900/30' : 'bg-amber-100',
                  textColor: darkMode ? 'text-amber-400' : 'text-amber-700',
                  title: 'AI Plans Your Meals',
                  description: 'Our AI creates a complete meal plan optimized for nutrition and cost based on local prices.',
                },
                {
                  number: '3',
                  bgColor: darkMode ? 'bg-sky-900/30' : 'bg-sky-100',
                  textColor: darkMode ? 'text-sky-400' : 'text-sky-700',
                  title: 'Shop & Cook',
                  description: 'Get your grocery list with estimated costs. Follow simple recipes matched to your skill level.',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="text-center hover:-translate-y-2 transition-transform duration-300 animate-slide-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in ${step.bgColor}`}
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <span className={`text-3xl font-bold ${step.textColor}`}>
                      {step.number}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-base transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} style={{ lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 sm:px-8 py-16 sm:py-20 relative overflow-hidden bg-linear-to-br from-emerald-500 to-lime-600">
          <div className="absolute inset-0 opacity-10 animate-pattern" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center text-white">
              {[
                { stat: '40%', label: 'Average savings on groceries' },
                { stat: '100%', label: 'Nutritionally balanced meals' },
                { stat: '15min', label: 'Average meal prep time' },
              ].map((item, idx) => (
                <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="text-5xl sm:text-6xl font-bold mb-3 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    {item.stat}
                  </div>
                  <div className="text-lg text-emerald-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 sm:px-8 py-20 sm:py-24 relative overflow-hidden bg-linear-to-br from-emerald-500 to-lime-600">
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" style={{ lineHeight: '1.15' }}>
              Ready to eat healthy
              <br />
              without overspending?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands using Budgetarian to save money and improve their nutrition
            </p>
            <button
              onClick={() => setShowRegisterForm(true)}
              className="px-10 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2 text-lg"
            >
              Start Your Free Meal Plan
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-white/80 mt-6">
              No credit card required • Free forever
            </p>
          </div>
        </section>
      </Layout>

      {/* Auth Modals */}
      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLoginForm(false);
            setShowRegisterForm(true);
          }}
        />
      )}

      {showRegisterForm && (
        <RegisterForm
          onClose={() => setShowRegisterForm(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegisterForm(false);
            setShowLoginForm(true);
          }}
        />
      )}
    </>
  );
}