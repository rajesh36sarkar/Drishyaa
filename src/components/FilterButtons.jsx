import React from 'react';
import { motion } from 'framer-motion';

const categories = ['All', 'Music', 'Gaming', 'Coding', 'Comedy', 'Sports', 'Education', 'News'];

const FilterButtons = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="sticky top-[60px] z-30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm py-3 px-4 overflow-x-auto border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-3 min-w-max">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap font-medium text-sm ${
              activeCategory === category
                ? 'filter-btn-active'
                : 'filter-btn-inactive'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;