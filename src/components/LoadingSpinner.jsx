import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="gradient-text text-lg"
        >
          Loading Drishya...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;