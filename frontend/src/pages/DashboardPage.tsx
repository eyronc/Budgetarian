import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Dashboard } from '../components/dashboard/Dashboard';

export function DashboardPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1">
        <Dashboard userEmail={userEmail} />
      </div>
    </div>
  );
}