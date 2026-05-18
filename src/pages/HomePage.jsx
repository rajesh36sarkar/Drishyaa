import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import FilterButtons from '../components/FilterButtons';
import VideoSkeleton from '../components/VideoSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo } from 'react-icons/fa';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('search') || '');
    const category = params.get('category');
    if (category) setActiveCategory(category);
  }, [location]);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, activeCategory, searchQuery]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/videos');
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  const filterVideos = () => {
    let filtered = [...videos];
    if (activeCategory !== 'All') {
      filtered = filtered.filter(v => v.category === activeCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredVideos(filtered);
  };

  return (
    <div className="pt-[72px]">
      <FilterButtons activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <div className="p-4 md:p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredVideos.map((video, idx) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <VideoCard video={video} index={idx} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filteredVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaVideo className="text-6xl text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No videos found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;