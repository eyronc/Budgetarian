import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface LayoutProps {
  children: ReactNode;
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export function Layout({ children, onSignIn, onGetStarted }: LayoutProps) {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar onSignIn={onSignIn} onGetStarted={onGetStarted} />
      {children}
      <Footer />
    </div>
  );
}