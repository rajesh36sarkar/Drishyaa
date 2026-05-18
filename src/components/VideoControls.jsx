import React, { useState } from 'react';
import { FaCog, FaTachometerAlt, FaCompress, FaExpand } from 'react-icons/fa';

const VideoControls = ({ videoRef }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState('Auto');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualities = ['Auto', '1080p', '720p', '480p', '360p'];

  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="absolute bottom-16 right-4 z-20">
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
        >
          <FaCog className="text-white" />
        </button>
        
        {showSettings && (
          <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-3 min-w-40">
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Playback Speed</p>
              <div className="flex flex-wrap gap-2">
                {speeds.map(s => (
                  <button
                    key={s}
                    onClick={() => changeSpeed(s)}
                    className={`px-2 py-1 text-sm rounded ${speed === s ? 'bg-purple-600' : 'bg-gray-700'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">Quality</p>
              <div className="flex flex-wrap gap-2">
                {qualities.map(q => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-2 py-1 text-sm rounded ${quality === q ? 'bg-purple-600' : 'bg-gray-700'}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoControls;