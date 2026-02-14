import { useState } from 'react';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { Layout } from './components/layout/Layout';
import { ArrowRight, DollarSign, Apple, TrendingDown } from 'lucide-react';
import { motion, easeInOut, easeOut } from 'framer-motion';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-6 sm:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, white, #F0FDF4)' }}>
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-72 h-72 bg-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16 sm:mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#16A34A] rounded-full text-sm font-medium mb-6"
              variants={itemVariants}
            >
              <TrendingDown className="w-4 h-4" />
              Save money, eat healthy
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}
              variants={itemVariants}
            >
              Healthy meals on
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(to right, #16A34A, #65A30D)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                your budget
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto"
              style={{ lineHeight: '1.6' }}
              variants={itemVariants}
            >
              AI-powered meal planning that maximizes nutrition while staying within your spending limit.
              Perfect for students, families, and budget-conscious eaters.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-full hover:shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 text-base"
                style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Planning Meals
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-[#16A34A] transition-all cursor-pointer text-base"
                whileHover={{ scale: 1.05, borderColor: '#16A34A' }}
                whileTap={{ scale: 0.95 }}
              >
                See How It Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Feature Preview Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: DollarSign,
                gradient: 'linear-gradient(to bottom right, #16A34A, #65A30D)',
                title: 'Budget-Based',
                description: 'Set your weekly or monthly food budget. Our AI creates meal plans that never exceed your limit.',
              },
              {
                icon: Apple,
                gradient: 'linear-gradient(to bottom right, #F59E0B, #EAB308)',
                title: 'Nutrition-Optimized',
                description: 'Get balanced meals with proper protein, carbs, and nutrients - without breaking the bank.',
              },
              {
                icon: TrendingDown,
                gradient: 'linear-gradient(to bottom right, #0EA5E9, #14B8A6)',
                title: 'Smart Shopping',
                description: 'Auto-generated grocery lists with price estimates and money-saving ingredient swaps.',
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: card.gradient }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 sm:px-8 py-20 sm:py-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              How it works
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              variants={itemVariants}
            >
              Three simple steps to healthier, budget-friendly eating
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                number: '1',
                bgColor: '#DCFCE7',
                textColor: '#16A34A',
                title: 'Set Your Budget',
                description: 'Tell us your daily or weekly food budget. Set preferences for diet type and health goals.',
              },
              {
                number: '2',
                bgColor: '#FEF3C7',
                textColor: '#F59E0B',
                title: 'AI Plans Your Meals',
                description: 'Our AI creates a complete meal plan optimized for nutrition and cost based on local prices.',
              },
              {
                number: '3',
                bgColor: '#DBEAFE',
                textColor: '#0EA5E9',
                title: 'Shop & Cook',
                description: 'Get your grocery list with estimated costs. Follow simple recipes matched to your skill level.',
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: step.bgColor }}
                  variants={numberVariants}
                >
                  <span
                    className="text-3xl font-bold"
                    style={{ color: step.textColor }}
                  >
                    {step.number}
                  </span>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-gray-600" style={{ lineHeight: '1.6' }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="px-6 sm:px-8 py-16 sm:py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #16A34A, #65A30D)' }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { stat: '40%', label: 'Average savings on groceries' },
              { stat: '100%', label: 'Nutritionally balanced meals' },
              { stat: '15min', label: 'Average meal prep time' },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <motion.div
                  className="text-5xl sm:text-6xl font-bold mb-3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {item.stat}
                </motion.div>
                <div className="text-lg text-green-100">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 sm:px-8 py-20 sm:py-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: easeInOut,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ lineHeight: '1.15' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to eat healthy
            <br />
            without overspending?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands using Budgetarian to save money and improve their nutrition
          </motion.p>
          <motion.button
            className="px-10 py-4 text-white font-semibold rounded-full hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2 text-lg"
            style={{ background: 'linear-gradient(to right, #16A34A, #65A30D)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
          >
            Start Your Free Meal Plan
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.p
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            No credit card required • Free forever
          </motion.p>
        </div>
      </section>
    </Layout>
  );
}
