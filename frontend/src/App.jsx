import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MealandWorkoutPlansPage } from './pages/MealandWorkoutPlansPage';
import { GroceryListPage } from './pages/GroceryListPage';
import { BudgetTrackerPage } from './pages/BudgetTrackerPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { RecipePage } from './pages/RecipePage';
import { AnalyticsPage } from './pages/AnalyticsPage';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/meal-plans" element={<MealandWorkoutPlansPage />} />
      <Route path="/recipes" element={<RecipePage />} />
      <Route path="/grocery" element={<GroceryListPage />} />
      <Route path="/budget" element={<BudgetTrackerPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}