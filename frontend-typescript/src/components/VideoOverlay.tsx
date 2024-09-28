import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { VideoOverlay as LeafletVideoOverlay, LatLngBoundsExpression, VideoOverlayOptions } from 'leaflet';

interface VideoOverlayProps extends VideoOverlayOptions {
  url: string | string[] | HTMLVideoElement;
  bounds: LatLngBoundsExpression;
  play?: boolean;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ url, bounds, play, ...options }) => {
  const map = useMap();
  const videoOverlayRef = useRef<LeafletVideoOverlay | null>(null);

  useEffect(() => {
    if (videoOverlayRef.current) {
      videoOverlayRef.current.remove();
    }

    videoOverlayRef.current = new LeafletVideoOverlay(url, bounds, options).addTo(map);

    const videoElement = videoOverlayRef.current.getElement();

    if (play && videoElement) {
      const handleUserInteraction = () => {
        videoElement.play().catch(error => {
          console.error('Video play failed:', error);
        });
        document.removeEventListener('click', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction);
    }

    return () => {
      if (videoOverlayRef.current) {
        videoOverlayRef.current.remove();
      }
    };
  }, [url, bounds, play, options, map]);

  return null;
};

export default VideoOverlay;