import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown, FaUser, FaEdit, FaTrash } from 'react-icons/fa';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await axios.get('/videos');
      const found = res.data.find(v => v._id === id);
      setVideo(found);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/video/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    if (!user) return;
    try {
      await axios.patch(`/videos/${id}/like`);
      setVideo({ ...video, likes: video.likes + 1 });
      setLiked(true);
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async () => {
    if (!user) return;
    try {
      await axios.patch(`/videos/${id}/dislike`);
      setVideo({ ...video, dislikes: video.dislikes + 1 });
      setDisliked(true);
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axios.post('/comments', { text: newComment, videoId: id });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const updateComment = async (commentId, text) => {
    try {
      const res = await axios.put(`/comments/${commentId}`, { text });
      setComments(comments.map(c => c._id === commentId ? res.data : c));
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
  };

  if (!video) return (
    <div className="flex items-center justify-center min-h-screen pt-[60px]">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="pt-[72px] px-4 md:px-8 max-w-7xl mx-auto pb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <video 
              src={video.videoUrl} 
              controls 
              className="w-full h-full" 
              poster={video.thumbnailUrl}
              controlsList="nodownload"
            />
          </div>
          
          {/* Video Title */}
          <h1 className="text-xl md:text-2xl font-bold mt-4 text-gray-900 dark:text-white">
            {video.title}
          </h1>
          
          {/* Channel Info & Actions */}
          <div className="flex flex-wrap justify-between items-start gap-4 mt-2">
            <div>
              <p className="font-semibold text-purple-600 dark:text-purple-400">
                {video.channel?.channelName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatViews(video.views)} views • {new Date(video.uploadDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button 
                whileTap={{ scale: 0.95 }} 
                onClick={handleLike} 
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
                  liked 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <FaThumbsUp /> {formatViews(video.likes)}
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }} 
                onClick={handleDislike} 
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
                  disliked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <FaThumbsDown /> {formatViews(video.dislikes)}
              </motion.button>
            </div>
          </div>
          
          {/* Description */}
          <p className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300">
            {video.description}
          </p>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Comments ({comments.length})
            </h3>
            
            {user ? (
              <form onSubmit={addComment} className="mb-6 flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-5 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                />
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Post
                </button>
              </form>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-4">Sign in to leave a comment</p>
            )}
            
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div 
                  key={comment._id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  className="flex gap-3 mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {comment.user?.username}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {user && user.id === comment.user?._id && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setEditingComment(comment)}
                            className="text-gray-500 hover:text-purple-500 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => deleteComment(comment._id)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                    {editingComment?._id === comment._id ? (
                      <form onSubmit={(e) => { 
                        e.preventDefault(); 
                        updateComment(comment._id, e.target.text.value); 
                      }} className="mt-2">
                        <input 
                          name="text" 
                          defaultValue={comment.text} 
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                          autoFocus 
                        />
                        <button type="submit" className="mt-2 text-sm text-purple-500 hover:text-purple-600">
                          Save
                        </button>
                      </form>
                    ) : (
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {comments.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;