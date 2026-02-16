import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function Layout({ children, onSignIn, onGetStarted }) {
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