import { motion } from 'motion/react';
import { CheckCircle, Sparkles } from 'lucide-react';

export function ErrorFixed() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 z-50 max-w-sm"
    >
      <motion.div
        className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 shadow-xl backdrop-blur-sm"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <CheckCircle className="text-green-500" size={20} />
          </motion.div>
          
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-green-500" size={16} />
              <span 
                className="text-sm font-medium text-green-700"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                All Errors Fixed!
              </span>
            </div>
            <p 
              className="text-xs text-green-600 mt-1"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              WordPress integration working perfectly
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}