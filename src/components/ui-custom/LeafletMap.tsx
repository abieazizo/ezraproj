"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

const goldMarkerIcon = L.divIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z" fill="#C9A84C"/>
    <circle cx="16" cy="16" r="6" fill="white"/>
  </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  popupText?: string;
  className?: string;
}

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  height = "400px",
  popupText,
  className,
}: LeafletMapProps) {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)} style={{ height }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={goldMarkerIcon}>
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
