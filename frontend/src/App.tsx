import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MealPlansPage } from './pages/MealPlansPage';
import { GroceryListPage } from './pages/GroceryListPage';
import { BudgetTrackerPage } from './pages/BudgetTrackerPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/meal-plans" element={<MealPlansPage />} />
        <Route path="/grocery" element={<GroceryListPage />} />
        <Route path="/budget" element={<BudgetTrackerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </DarkModeProvider>
  );
}