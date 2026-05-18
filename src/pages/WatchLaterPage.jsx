import React from 'react';
import { Link } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';
import { FaClock, FaTrash, FaEye } from 'react-icons/fa';

const WatchLaterPage = () => {
  const { watchLater, removeFromWatchLater } = usePlaylist();

  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  return (
    <div className="pt-[72px] px-4 md:px-8 max-w-7xl mx-auto pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <FaClock /> Watch Later
        </h1>
      </div>

      {watchLater.length === 0 ? (
        <div className="text-center py-20">
          <FaClock className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No videos saved for later</p>
          <Link to="/" className="text-purple-600 hover:underline mt-2 inline-block">
            Browse Videos
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {watchLater.map((video) => (
            <div key={video._id} className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl group">
              <Link to={`/video/${video._id}`} className="flex gap-4 flex-1">
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
                  </div>
                </div>
              </Link>
              <button 
                onClick={() => removeFromWatchLater(video._id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLaterPage;