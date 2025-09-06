import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

export function StartupIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Hide the message after 3 seconds
    const messageTimer = setTimeout(() => {
      setShowMessage(false);
    }, 2500);

    // Hide the entire indicator after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Only show in development
  if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'development') {
    return null;
  }

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="fixed top-20 right-4 z-50 max-w-xs"
    >
      {showMessage && (
        <motion.div
          className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 shadow-lg backdrop-blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <CheckCircle className="text-green-500" size={18} />
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-green-500" size={14} />
                <span 
                  className="text-sm font-medium text-green-700"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Site Loaded Successfully!
                </span>
              </div>
              <p 
                className="text-xs text-green-600 mt-1"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Running with demo content
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}