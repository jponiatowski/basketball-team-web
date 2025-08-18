'use client';

import Image from 'next/image';
import { useState } from 'react';

interface YouTubeBlockProps {
  value: {
    url: string;
  };
}

// Function to extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
};

// Function to get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const YouTubeVideo: React.FC<YouTubeBlockProps> = ({ value }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { url } = value;

  if (!url) {
    console.error('No YouTube URL provided');
    return null;
  }

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    console.error('Invalid YouTube URL');
    return null;
  }

  const thumbnailUrl = getYouTubeThumbnail(videoId);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="group relative my-6 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
      <Image
        src={thumbnailUrl}
        alt="YouTube video thumbnail"
        fill
        className="h-full w-full object-cover transition-transform duration-300"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-30 transition-all duration-300 group-hover:opacity-30" />

      {/* Custom Play Button */}
      <button
        onClick={handlePlay}
        className="group absolute inset-0 flex cursor-pointer items-center justify-center"
        aria-label="Play YouTube video"
      >
        <div className="relative">
          {/* Play button background */}
          <div className="bg-secondary-600 group-hover:bg-secondary-700 flex h-20 w-20 items-center justify-center rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110">
            {/* Play triangle */}
            <div className="ml-1 h-0 w-0 border-t-[12px] border-b-[12px] border-l-[16px] border-t-transparent border-b-transparent border-l-white" />
          </div>

          {/* Pulse animation */}
          <div className="bg-secondary-600 absolute inset-0 h-20 w-20 animate-ping rounded-full opacity-20" />
        </div>
      </button>
    </div>
  );
};
