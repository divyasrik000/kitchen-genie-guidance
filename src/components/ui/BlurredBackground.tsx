
import React from 'react';

interface BlurredBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`blur-backdrop rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default BlurredBackground;
