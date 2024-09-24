import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, VideoOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom: number;
  info: string;
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, zoom, info }) => {
  const center: [number, number] = [latitude, longitude];

  const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'; // ここにビデオのURLを設定します
  const bounds: [[number, number], [number, number]] = [
    [latitude - 0.02, longitude - 0.02],
    [latitude + 0.02, longitude + 0.02]
  ];
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div style={{ height: "70vh", width: "100vw" }}>
      <MapContainer style={{ height: "70vh", width: "100vw" }}>
        <ChangeView center={center} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>
            {info}
          </Popup>
        </Marker>
        <VideoOverlay url={videoUrl} bounds={bounds} ref={videoRef} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
