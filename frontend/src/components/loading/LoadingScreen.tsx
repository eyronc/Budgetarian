import { useState, useEffect } from 'react';
import { BudgetarianLogo } from '../branding/BudgetarianLogo';
import { BrandName } from '../branding/BrandName';
import { Spinner } from './Spinner';
import { ProgressBar } from './ProgressBar';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = 30; // Update every 30ms
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 300); // Small delay after reaching 100%
          return 100;
        }
        
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'linear-gradient(to bottom right, white, #F0FDF4, #DCFCE7)' }}
    >
      {/* Logo and branding */}
      <div className="flex flex-col items-center mb-12 animate-fade-in">
        <div className="mb-6">
          <BudgetarianLogo size="large" />
        </div>
        
        <BrandName showTagline size="large" align="center" />
      </div>

      {/* Spinner */}
      <div className="mb-8">
        <Spinner />
      </div>

      {/* Progress bar */}
      <ProgressBar progress={Math.round(progress)} />

      {/* Loading text */}
      <p className="text-gray-600 mt-8 animate-pulse">
        {progress < 30 && "Preparing your experience..."}
        {progress >= 30 && progress < 60 && "Loading meal plans..."}
        {progress >= 60 && progress < 90 && "Optimizing nutrition..."}
        {progress >= 90 && "Almost ready!"}
      </p>
    </div>
  );
}