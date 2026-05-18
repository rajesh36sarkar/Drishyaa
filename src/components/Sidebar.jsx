import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaFire, FaSubscript, FaVideo, FaHistory, FaThumbsUp,
  FaMusic, FaGamepad, FaCode, FaLaugh, FaFutbol, FaPlayCircle,
  FaClock, FaList, FaRegClock
} from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <FaHome />, label: 'Home', path: '/' },
    { icon: <FaFire />, label: 'Trending', path: '/trending' },
    { icon: <FaSubscript />, label: 'Subscriptions', path: '/subscriptions' },
    { icon: <FaVideo />, label: 'Your Videos', path: '/channel' },
    { icon: <FaHistory />, label: 'History', path: '/history' },
    { icon: <FaRegClock />, label: 'Watch Later', path: '/watch-later' },
    { icon: <FaList />, label: 'Playlists', path: '/playlists' },
    { icon: <FaThumbsUp />, label: 'Liked Videos', path: '/liked' },
  ];

  const categories = [
    { icon: <FaPlayCircle />, label: 'All', category: 'All' },
    { icon: <FaMusic />, label: 'Music', category: 'Music' },
    { icon: <FaGamepad />, label: 'Gaming', category: 'Gaming' },
    { icon: <FaCode />, label: 'Coding', category: 'Coding' },
    { icon: <FaLaugh />, label: 'Comedy', category: 'Comedy' },
    { icon: <FaFutbol />, label: 'Sports', category: 'Sports' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: 'spring', damping: 25 }}
          className="sidebar fixed left-0 top-[60px] bottom-0 w-64 overflow-y-auto z-40"
        >
          <div className="py-4">
            <div className="px-3 mb-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-4" />

            <div className="px-3">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-3">
                EXPLORE
              </h3>
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={`/?category=${item.category}`}
                  className="sidebar-item"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                <p>© 2024 Drishya</p>
                <p className="mt-1">Premium Video Platform</p>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;