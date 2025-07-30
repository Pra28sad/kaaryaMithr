import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/kaarya-mithr-logo.png" 
        alt="Kaarya Mithr Logo"
        className={`${sizeClasses[size]} rounded-lg shadow-sm`}
      />
    </div>
  );
};

export default AppLogo;
