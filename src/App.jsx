import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PlaylistProvider } from './context/PlaylistContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import ChannelPage from './pages/ChannelPage';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

// Import new pages
import HistoryPage from './pages/HistoryPage';
import WatchLaterPage from './pages/WatchLaterPage';
import PlaylistsPage from './pages/PlaylistsPage';
import TrendingPage from './pages/TrendingPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import LikedPage from './pages/LikedPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
        <PlaylistProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
              <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} />
              <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/subscriptions" element={<SubscriptionsPage />} />
                  <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
                  <Route path="/liked" element={<PrivateRoute><LikedPage /></PrivateRoute>} />
                  <Route path="/watch-later" element={<PrivateRoute><WatchLaterPage /></PrivateRoute>} />
                  <Route path="/playlists" element={<PrivateRoute><PlaylistsPage /></PrivateRoute>} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/video/:id" element={<VideoPlayerPage />} />
                  <Route path="/channel" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </PlaylistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;