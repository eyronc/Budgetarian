import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  onSignIn?: () => void;
  onGetStarted?: () => void;
}

export function Layout({ children, onSignIn, onGetStarted }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onSignIn={onSignIn} onGetStarted={onGetStarted} />
      {children}
      <Footer />
    </div>
  );
}