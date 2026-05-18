import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaUser, FaThumbsUp, FaPlay } from 'react-icons/fa';

const VideoCard = ({ video, index }) => {
  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  const formatLikes = (likes) => {
    if (likes >= 1000000) return (likes / 1000000).toFixed(1) + 'M';
    if (likes >= 1000) return (likes / 1000).toFixed(1) + 'K';
    return likes;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="video-card cursor-pointer group"
    >
      <Link to={`/video/${video._id}`}>
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { 
              e.target.src = 'https://picsum.photos/id/20/320/180';
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <FaPlay className="text-white text-xl ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-md text-white text-xs">
            12:34
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
            <FaUser className="text-xs" />
            <span>{video.channel?.channelName || 'Unknown Channel'}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <FaEye className="text-xs" />
              <span>{formatViews(video.views)} views</span>
            </div>
            <div className="flex items-center gap-1">
              <FaThumbsUp className="text-xs" />
              <span>{formatLikes(video.likes)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;