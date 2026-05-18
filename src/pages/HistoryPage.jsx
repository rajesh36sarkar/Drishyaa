import React from 'react';
import { Link } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';
import { FaHistory, FaTrash, FaEye } from 'react-icons/fa';

const HistoryPage = () => {
  const { watchHistory, clearHistory } = usePlaylist();

  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  return (
    <div className="pt-[72px] px-4 md:px-8 max-w-7xl mx-auto pb-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <FaHistory /> Watch History
        </h1>
        {watchHistory.length > 0 && (
          <button 
            onClick={clearHistory} 
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center gap-2"
          >
            <FaTrash /> Clear All
          </button>
        )}
      </div>

      {watchHistory.length === 0 ? (
        <div className="text-center py-20">
          <FaHistory className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No watch history yet</p>
          <Link to="/" className="text-purple-600 hover:underline mt-2 inline-block">
            Browse Videos
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {watchHistory.map((video) => (
            <Link 
              key={video._id} 
              to={`/video/${video._id}`} 
              className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition group"
            >
              <img 
                src={video.thumbnailUrl} 
                className="w-40 h-24 object-cover rounded-lg" 
                alt={video.title} 
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500">{video.channel?.channelName}</p>
                <div className="flex gap-3 text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1"><FaEye /> {formatViews(video.views)} views</span>
                  <span>Watched: {new Date(video.watchedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;