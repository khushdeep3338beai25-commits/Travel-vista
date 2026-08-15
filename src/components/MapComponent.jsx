import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon image paths for React Vite build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapComponent({ latlng, countryName, capitalName }) {
  if (!latlng || latlng.length < 2) {
    return (
      <div className="alert alert-secondary p-4 text-center rounded-4">
        <i className="bi bi-geo-alt fs-2 text-muted d-block mb-2"></i>
        Map coordinates are not available for this location.
      </div>
    );
  }

  const position = [latlng[0], latlng[1]];

  return (
    <div className="rounded-4 overflow-hidden shadow-sm border" style={{ borderColor: 'var(--tv-border)' }}>
      <MapContainer center={position} zoom={5} scrollWheelZoom={false} style={{ height: '380px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="p-1">
              <strong className="d-block text-primary fs-6">{countryName}</strong>
              <span className="text-muted small">Capital: {capitalName || 'N/A'}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
