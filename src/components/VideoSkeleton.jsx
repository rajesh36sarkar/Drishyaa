import React from 'react';

const VideoSkeleton = () => {
  return (
    <div className="video-card animate-pulse">
      <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg mb-1 w-1/2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
      </div>
    </div>
  );
};

export default VideoSkeleton;