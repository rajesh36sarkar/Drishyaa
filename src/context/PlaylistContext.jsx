import React, { createContext, useContext, useState, useEffect } from 'react';

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [watchLater, setWatchLater] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Load saved data
    const savedWatchLater = localStorage.getItem('watchLater');
    const savedPlaylists = localStorage.getItem('playlists');
    const savedHistory = localStorage.getItem('watchHistory');
    
    if (savedWatchLater) setWatchLater(JSON.parse(savedWatchLater));
    if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists));
    if (savedHistory) setWatchHistory(JSON.parse(savedHistory));
  }, []);

  const addToWatchLater = (video) => {
    setWatchLater(prev => {
      if (!prev.find(v => v._id === video._id)) {
        const newList = [video, ...prev];
        localStorage.setItem('watchLater', JSON.stringify(newList));
        return newList;
      }
      return prev;
    });
  };

  const removeFromWatchLater = (videoId) => {
    const newList = watchLater.filter(v => v._id !== videoId);
    setWatchLater(newList);
    localStorage.setItem('watchLater', JSON.stringify(newList));
  };

  const addToWatchHistory = (video) => {
    setWatchHistory(prev => {
      const filtered = prev.filter(v => v._id !== video._id);
      const newHistory = [{ ...video, watchedAt: new Date().toISOString() }, ...filtered].slice(0, 100);
      localStorage.setItem('watchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setWatchHistory([]);
    localStorage.setItem('watchHistory', JSON.stringify([]));
  };

  const createPlaylist = (name, description = '') => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      description,
      videos: [],
      createdAt: new Date().toISOString(),
      videoCount: 0
    };
    const updated = [...playlists, newPlaylist];
    setPlaylists(updated);
    localStorage.setItem('playlists', JSON.stringify(updated));
    return newPlaylist;
  };

  const deletePlaylist = (playlistId) => {
    const updated = playlists.filter(p => p.id !== playlistId);
    setPlaylists(updated);
    localStorage.setItem('playlists', JSON.stringify(updated));
  };

  const addToPlaylist = (playlistId, video) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId && !playlist.videos.find(v => v._id === video._id)) {
        const updated = {
          ...playlist,
          videos: [...playlist.videos, video],
          videoCount: playlist.videos.length + 1
        };
        localStorage.setItem('playlists', JSON.stringify(playlists.map(p => 
          p.id === playlistId ? updated : p
        )));
        return updated;
      }
      return playlist;
    }));
  };

  const removeFromPlaylist = (playlistId, videoId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const updated = {
          ...playlist,
          videos: playlist.videos.filter(v => v._id !== videoId),
          videoCount: playlist.videos.length - 1
        };
        localStorage.setItem('playlists', JSON.stringify(playlists.map(p => 
          p.id === playlistId ? updated : p
        )));
        return updated;
      }
      return playlist;
    }));
  };

  return (
    <PlaylistContext.Provider value={{
      watchLater,
      playlists,
      watchHistory,
      addToWatchLater,
      removeFromWatchLater,
      addToWatchHistory,
      clearHistory,
      createPlaylist,
      deletePlaylist,
      addToPlaylist,
      removeFromPlaylist
    }}>
      {children}
    </PlaylistContext.Provider>
  );
};