"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  label?: string;
  className?: string;
}

const GOLD_MARKER_SVG = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" fill="none">
  <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="#C9A84C"/>
  <circle cx="12" cy="12" r="5" fill="white"/>
</svg>`)}`;

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  label,
  className = "h-[300px]",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    const icon = L.icon({
      iconUrl: GOLD_MARKER_SVG,
      iconSize: [32, 48],
      iconAnchor: [16, 48],
      popupAnchor: [0, -48],
    });

    const marker = L.marker([lat, lng], { icon }).addTo(map);
    if (label) {
      marker.bindPopup(`<strong>${label}</strong>`);
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, zoom, label]);

  return <div ref={mapRef} className={`rounded-xl overflow-hidden ${className}`} />;
}
