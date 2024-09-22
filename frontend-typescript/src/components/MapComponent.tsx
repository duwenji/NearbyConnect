import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

  return (
    <div style={{ height: "70vh", width: "70vw" }}>
      <MapContainer style={{ height: "70vh", width: "70vw" }}>
        <ChangeView center={center} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>
            {info}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
