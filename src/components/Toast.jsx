import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaErrorCircle, FaInfoCircle } from 'react-icons/fa';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaErrorCircle className="text-red-500" />,
    info: <FaInfoCircle className="text-blue-500" />
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 glass-dark rounded-xl shadow-xl"
    >
      {icons[type]}
      <span>{message}</span>
    </motion.div>
  );
};

export default Toast;