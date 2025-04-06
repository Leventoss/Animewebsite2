// src/components/anime/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ episode }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (episode.videoUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(episode.videoUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = episode.videoUrl;
      }
    } else {
      video.src = episode.videoUrl;
    }
  }, [episode.videoUrl]);

  return (
    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full"
        controls
        autoPlay
        playsInline
      >
        <source src={episode.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;