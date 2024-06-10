// MapComponent.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ setPosition }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      const position = { lat: parseFloat(lat), lon: parseFloat(lon) };
      setMarkerPosition(position);
      getLocationName(position.lat, position.lon);
    }
  };

  const getLocationName = async (lat, lon) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    if (data && data.display_name) {
      setPosition({ lat, lon, name: data.display_name });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
       <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter place name"
          className="border p-2 rounded"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">Search</button>
      </form>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && <Marker position={[markerPosition.lat, markerPosition.lon]} />}
        <LocationMarker getLocationName={getLocationName} />
      </MapContainer>
    </div>
  );
};

const LocationMarker = ({ getLocationName }) => {
  useMapEvents({
    click(e) {
      getLocationName(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

export default MapComponent;
