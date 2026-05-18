import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-white/10 hover:bg-white/20 border border-white/20',
    outline: 'border-2 border-purple-600 hover:bg-purple-600/20',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
    >
      <motion.span
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default AnimatedButton;