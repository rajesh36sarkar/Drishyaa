import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';
import { FaList, FaPlus, FaTrash, FaEye } from 'react-icons/fa';

const PlaylistsPage = () => {
  const { playlists, createPlaylist, deletePlaylist, removeFromPlaylist } = usePlaylist();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName, newPlaylistDesc);
      setNewPlaylistName('');
      setNewPlaylistDesc('');
      setShowCreateForm(false);
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  return (
    <div className="pt-[72px] px-4 md:px-8 max-w-7xl mx-auto pb-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <FaList /> My Playlists
        </h1>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white flex items-center gap-2 hover:shadow-lg transition"
        >
          <FaPlus /> New Playlist
        </button>
      </div>

      {/* Create Playlist Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <form onSubmit={handleCreatePlaylist}>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={newPlaylistDesc}
              onChange={(e) => setNewPlaylistDesc(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="2"
            />
            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 bg-purple-600 rounded-lg text-white">Create</button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="px-4 py-2 bg-gray-500 rounded-lg text-white">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {playlists.length === 0 ? (
        <div className="text-center py-20">
          <FaList className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No playlists yet</p>
          <button onClick={() => setShowCreateForm(true)} className="text-purple-600 hover:underline mt-2 inline-block">
            Create your first playlist
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {playlists.map(playlist => (
            <div key={playlist.id} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{playlist.name}</h2>
                  {playlist.description && <p className="text-gray-500 text-sm mt-1">{playlist.description}</p>}
                  <p className="text-xs text-gray-400 mt-1">{playlist.videoCount} videos</p>
                </div>
                <button onClick={() => deletePlaylist(playlist.id)} className="text-red-500 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
              
              {playlist.videos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No videos in this playlist yet</p>
              ) : (
                <div className="space-y-2">
                  {playlist.videos.map(video => (
                    <div key={video._id} className="flex gap-3 p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition group">
                      <Link to={`/video/${video._id}`} className="flex gap-3 flex-1">
                        <img src={video.thumbnailUrl} className="w-32 h-20 object-cover rounded" alt={video.title} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600">{video.title}</h4>
                          <p className="text-xs text-gray-500">{video.channel?.channelName}</p>
                          <p className="text-xs text-gray-400">{formatViews(video.views)} views</p>
                        </div>
                      </Link>
                      <button onClick={() => removeFromPlaylist(playlist.id, video._id)} className="text-red-500 hover:text-red-600 p-2">
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;