import { useDarkMode } from '../../contexts/DarkModeContext';

interface BrandNameProps {
  showTagline?: boolean;
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center';
}

export function BrandName({ showTagline = false, size = 'medium', align = 'left' }: BrandNameProps) {
  const { darkMode } = useDarkMode();
  const textSizes = {
    small: {
      name: 'text-lg sm:text-xl',
      tagline: 'text-[9px] sm:text-[10px]'
    },
    medium: {
      name: 'text-xl sm:text-2xl',
      tagline: 'text-[10px] sm:text-xs'
    },
    large: {
      name: 'text-3xl sm:text-4xl md:text-5xl',
      tagline: 'text-sm sm:text-base'
    }
  };

  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={alignClass}>
      <span
        className={`${textSizes[size].name} font-bold transition-colors block leading-none ${
          darkMode ? 'text-gray-200' : 'text-gray-900'
        }`}
      >
        Budget
        <span className="text-green-600">arian</span>
      </span>


      {/*<span className={`text-sm font-semibold transition-colors ${
              darkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              Budget<span className="text-green-600">arian</span>
            </span> */}
      {showTagline && (
        <span className={`${textSizes[size].tagline} text-green-600 font-medium block mt-1`}>
          Smart Meal Planning
        </span>
      )}
    </div>
  );
}