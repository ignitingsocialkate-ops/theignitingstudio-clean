// This file has been deprecated in favor of the simpler ScrollSunrays system
// Keeping as backup but renamed to prevent imports

import { motion } from 'motion/react';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SunrayContextType {
  intensifyRays: () => void;
  normalizeRays: () => void;
  isIntensified: boolean;
}

const SunrayContext = createContext<SunrayContextType | undefined>(undefined);

export function SunrayProvider({ children }: { children: ReactNode }) {
  const [isIntensified, setIsIntensified] = useState(false);

  const intensifyRays = () => setIsIntensified(true);
  const normalizeRays = () => setIsIntensified(false);

  return (
    <SunrayContext.Provider value={{ intensifyRays, normalizeRays, isIntensified }}>
      {children}
    </SunrayContext.Provider>
  );
}

export function useSunrays() {
  const context = useContext(SunrayContext);
  if (context === undefined) {
    throw new Error('useSunrays must be used within a SunrayProvider');
  }
  return context;
}

interface InteractiveSectionProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function InteractiveSection({ 
  children, 
  className = '', 
  intensity = 'medium' 
}: InteractiveSectionProps) {
  const { intensifyRays, normalizeRays } = useSunrays();

  const getIntensityClass = () => {
    switch (intensity) {
      case 'low':
        return 'hover:bg-primary/5 transition-all duration-500';
      case 'high':
        return 'hover:bg-primary/15 transition-all duration-500';
      default:
        return 'hover:bg-primary/10 transition-all duration-500';
    }
  };

  return (
    <motion.div
      className={`${className} ${getIntensityClass()}`}
      onMouseEnter={intensifyRays}
      onMouseLeave={normalizeRays}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}