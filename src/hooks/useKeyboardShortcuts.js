import { useEffect } from 'react';

const useKeyboardShortcuts = (videoRef, onSearchFocus) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Space: Play/Pause
      if (e.code === 'Space' && videoRef?.current && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
      // F: Fullscreen
      if (e.code === 'KeyF' && videoRef?.current) {
        e.preventDefault();
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      }
      // M: Mute
      if (e.code === 'KeyM' && videoRef?.current) {
        e.preventDefault();
        videoRef.current.muted = !videoRef.current.muted;
      }
      // Arrow Left: Rewind 5s
      if (e.code === 'ArrowLeft' && videoRef?.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
      // Arrow Right: Forward 5s
      if (e.code === 'ArrowRight' && videoRef?.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
      }
      // / : Focus search
      if (e.code === 'Slash' && onSearchFocus) {
        e.preventDefault();
        onSearchFocus();
      }
      // Escape: Exit fullscreen
      if (e.code === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [videoRef, onSearchFocus]);
};

export default useKeyboardShortcuts;