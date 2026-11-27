"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerLabel?: string;
  className?: string;
}

const goldIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 32px; height: 32px;
    background: #C9A84C;
    border: 3px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  markerLabel,
  className = "",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([lat, lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);

    if (markerLabel) {
      marker.bindPopup(
        `<div style="font-family: sans-serif; font-size: 13px; font-weight: 600; color: #0A1628; padding: 2px 4px;">${markerLabel}</div>`
      );
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, zoom, markerLabel]);

  return <div ref={mapRef} className={`w-full ${className}`} />;
}
