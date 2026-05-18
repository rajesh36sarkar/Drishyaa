import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaUsers, FaVideo } from 'react-icons/fa';

const ChannelPage = () => {
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({ channelName: '', description: '' });
  const [videoData, setVideoData] = useState({ 
    title: '', 
    thumbnailUrl: '', 
    videoUrl: '', 
    description: '', 
    category: 'General' 
  });

  useEffect(() => {
    fetchChannel();
  }, [user]);

  const fetchChannel = async () => {
    try {
      const res = await axios.get('/channels/me');
      setChannel(res.data.channel);
      setVideos(res.data.videos);
    } catch (err) {
      if (err.response?.status === 404) setShowCreateForm(true);
    }
  };

  const createChannel = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/channels', formData);
      setChannel(res.data);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const addVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/videos', videoData);
      setVideos([res.data, ...videos]);
      setShowVideoForm(false);
      setVideoData({ title: '', thumbnailUrl: '', videoUrl: '', description: '', category: 'General' });
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const updateVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/videos/${editingVideo._id}`, videoData);
      setVideos(videos.map(v => v._id === editingVideo._id ? res.data : v));
      setEditingVideo(null);
      setVideoData({ title: '', thumbnailUrl: '', videoUrl: '', description: '', category: 'General' });
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const deleteVideo = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete(`/videos/${videoId}`);
        setVideos(videos.filter(v => v._id !== videoId));
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  // Create Channel Form
  if (showCreateForm) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[60px] px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <FaVideo className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Channel</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Start sharing your content with the world</p>
          </div>
          <form onSubmit={createChannel} className="space-y-4">
            <input 
              type="text" 
              placeholder="Channel Name" 
              value={formData.channelName} 
              onChange={(e) => setFormData({ ...formData, channelName: e.target.value })} 
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
              required 
            />
            <textarea 
              placeholder="Channel Description" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
              rows="3" 
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Create Channel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Channel Dashboard
  return (
    <div className="pt-[72px] px-4 md:px-8 max-w-7xl mx-auto pb-8">
      {channel && (
        <>
          {/* Channel Banner */}
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900">
            {channel.channelBanner && (
              <img src={channel.channelBanner} className="w-full h-full object-cover" alt="banner" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {channel.channelName[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{channel.channelName}</h1>
                <p className="text-gray-200 flex items-center gap-1">
                  <FaUsers /> {formatViews(channel.subscribers)} subscribers
                </p>
              </div>
            </div>
          </div>
          
          {/* Channel Description */}
          <p className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300">
            {channel.description}
          </p>

          {/* Videos Section */}
          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Videos</h2>
            <button 
              onClick={() => setShowVideoForm(true)} 
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center gap-2 font-semibold hover:shadow-lg transition-all"
            >
              <FaPlus /> Upload Video
            </button>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <FaVideo className="text-5xl text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No videos yet. Upload your first video!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {videos.map((video) => (
                <motion.div 
                  key={video._id} 
                  whileHover={{ y: -5 }} 
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 relative group"
                >
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnailUrl} 
                      className="w-full h-full object-cover" 
                      alt={video.title} 
                    />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingVideo(video); setVideoData(video); }} 
                        className="p-2 bg-black/70 rounded-full hover:bg-purple-600 transition-colors"
                      >
                        <FaEdit className="text-white text-sm" />
                      </button>
                      <button 
                        onClick={() => deleteVideo(video._id)} 
                        className="p-2 bg-black/70 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash className="text-white text-sm" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatViews(video.views)} views
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Video Upload/Edit Modal */}
      <AnimatePresence>
        {(showVideoForm || editingVideo) && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowVideoForm(false);
              setEditingVideo(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingVideo ? 'Edit Video' : 'Upload Video'}
              </h2>
              <form onSubmit={editingVideo ? updateVideo : addVideo} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={videoData.title} 
                  onChange={(e) => setVideoData({ ...videoData, title: e.target.value })} 
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Thumbnail URL" 
                  value={videoData.thumbnailUrl} 
                  onChange={(e) => setVideoData({ ...videoData, thumbnailUrl: e.target.value })} 
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Video URL" 
                  value={videoData.videoUrl} 
                  onChange={(e) => setVideoData({ ...videoData, videoUrl: e.target.value })} 
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                  required 
                />
                <select 
                  value={videoData.category} 
                  onChange={(e) => setVideoData({ ...videoData, category: e.target.value })} 
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                >
                  <option>General</option>
                  <option>Music</option>
                  <option>Gaming</option>
                  <option>Coding</option>
                  <option>Comedy</option>
                  <option>Sports</option>
                  <option>Education</option>
                </select>
                <textarea 
                  placeholder="Description" 
                  value={videoData.description} 
                  onChange={(e) => setVideoData({ ...videoData, description: e.target.value })} 
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" 
                  rows="3" 
                />
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => { setShowVideoForm(false); setEditingVideo(null); }} 
                    className="flex-1 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {editingVideo ? 'Update' : 'Upload'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChannelPage;