
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./DiscoveryMap.css";

const locations = [
  {
    name: "Willemstad",
    category: "Culture",
    description: "Discover Curaçao's colorful historic capital.",
    position: [12.108, -68.935]
  },
  {
    name: "Grote Knip",
    category: "Beach",
    description: "Explore one of Curaçao's beautiful beaches.",
    position: [12.351, -69.155]
  },
  {
    name: "Playa Lagun",
    category: "Nature",
    description: "Discover this beautiful coastal area.",
    position: [12.324, -69.152]
  },
  {
    name: "Christoffel National Park",
    category: "Nature",
    description: "Explore Curaçao's natural landscape.",
    position: [12.345, -69.118]
  }
];

// Moves the map when a new GPS position is received
function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);

  return null;
}

export default function DiscoveryMap() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState("");

  const categories = ["All", "Beach", "Culture", "Nature"];

  const filteredLocations =
    selectedCategory === "All"
      ? locations
      : locations.filter(
          (location) => location.category === selectedCategory
        );

  // Request the visitor's current location
  function locateMe() {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [
          position.coords.latitude,
          position.coords.longitude
        ];

        setCurrentPosition(userLocation);
      },
      (error) => {
        setLocationError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  return (
    <section className="discovery-section">
      <div className="discovery-heading">
        <p className="eyebrow">EXPLORE THE ISLAND</p>
        <h2>Discover Curaçao</h2>
        <p>
          Find beautiful places, discover local culture
          and create your own island adventure.
        </p>
      </div>

      <div className="map-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category ? "active" : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <button className="locate-button" onClick={locateMe}>
        📍 Locate Me
      </button>

      {locationError && (
        <p className="location-error">{locationError}</p>
      )}

      <MapContainer
        center={[12.1696, -68.99]}
        zoom={10}
        scrollWheelZoom={true}
        className="discovery-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap position={currentPosition} />

        {filteredLocations.map((location) => (
          <CircleMarker
            key={location.name}
            center={location.position}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#e58b50",
              fillOpacity: 1,
              weight: 3
            }}
          >
            <Popup>
              <strong>{location.name}</strong>
              <p>{location.description}</p>
              <small>{location.category}</small>
            </Popup>
          </CircleMarker>
        ))}

        {currentPosition && (
          <CircleMarker
            center={currentPosition}
            radius={10}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#2878e5",
              fillOpacity: 1,
              weight: 4
            }}
          >
            <Popup>You are here!</Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </section>
  );
}
