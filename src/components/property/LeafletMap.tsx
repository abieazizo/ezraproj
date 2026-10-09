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

const GOLD_ICON = L.divIcon({
  className: "",
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
  className = "h-[300px]",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([lat, lng], zoom);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([lat, lng], { icon: GOLD_ICON }).addTo(map);

    if (markerLabel) {
      marker.bindPopup(
        `<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0A1628;padding:2px 4px;">${markerLabel}</div>`,
        { closeButton: false }
      );
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, zoom, markerLabel]);

  return <div ref={mapRef} className={`rounded-xl overflow-hidden ${className}`} />;
}
