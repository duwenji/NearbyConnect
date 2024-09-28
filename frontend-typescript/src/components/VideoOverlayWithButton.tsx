import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import { VideoOverlay as LeafletVideoOverlay, LatLngBoundsExpression, VideoOverlayOptions } from 'leaflet';

interface VideoOverlayProps extends VideoOverlayOptions {
  url: string | string[] | HTMLVideoElement;
  bounds: LatLngBoundsExpression;
  play?: boolean;
}

const VideoOverlayWithButton: React.FC<VideoOverlayProps> = ({ url, bounds, play, ...options }) => {
  const map = useMap();
  const videoOverlayRef = useRef<LeafletVideoOverlay | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log('VideoOverlayWithButton useEffect', url, bounds, play, options, map);
    if (videoOverlayRef.current) {
      console.log('VideoOverlayWithButton remove');
      videoOverlayRef.current.remove();
    }

    console.log('VideoOverlayWithButton add');
    videoOverlayRef.current = new LeafletVideoOverlay(url, bounds, options).addTo(map);

    return () => {
      console.log('VideoOverlayWithButton cleanup');
      if (videoOverlayRef.current) {
        videoOverlayRef.current.remove();
      }
    };
  }, [url, bounds, play, options, map]);

  const handlePlayClick = () => {
    console.log('VideoOverlayWithButton handlePlayClick', isPlaying);
    const videoElement = videoOverlayRef.current?.getElement();
    if (videoElement) {
      videoElement.play().catch(error => {
        console.error('Video play failed:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <>
      {!isPlaying && (
        <button onClick={handlePlayClick} style={{ position: 'absolute', top: 50, left: 500, zIndex: 1000 }}>
          Play Video
        </button>
      )}
    </>
  );
};

export default VideoOverlayWithButton;