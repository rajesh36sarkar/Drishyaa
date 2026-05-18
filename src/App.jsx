import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import ChannelPage from './pages/ChannelPage';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

// Placeholder components for missing routes
const TrendingPage = () => (
  <div className="pt-[72px] px-6 py-8">
    <h1 className="text-3xl font-bold gradient-text mb-4">Trending Videos</h1>
    <p className="text-gray-600 dark:text-gray-400">Trending content coming soon...</p>
  </div>
);

const SubscriptionsPage = () => (
  <div className="pt-[72px] px-6 py-8">
    <h1 className="text-3xl font-bold gradient-text mb-4">Subscriptions</h1>
    <p className="text-gray-600 dark:text-gray-400">Videos from your subscribed channels will appear here...</p>
  </div>
);

const HistoryPage = () => (
  <div className="pt-[72px] px-6 py-8">
    <h1 className="text-3xl font-bold gradient-text mb-4">Watch History</h1>
    <p className="text-gray-600 dark:text-gray-400">Your recently watched videos will appear here...</p>
  </div>
);

const LikedPage = () => (
  <div className="pt-[72px] px-6 py-8">
    <h1 className="text-3xl font-bold gradient-text mb-4">Liked Videos</h1>
    <p className="text-gray-600 dark:text-gray-400">Videos you've liked will appear here...</p>
  </div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <AuthProvider>
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
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/liked" element={<LikedPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/video/:id" element={<VideoPlayerPage />} />
                <Route path="/channel" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;