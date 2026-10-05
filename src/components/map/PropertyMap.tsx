"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
  popup?: string;
}

const GOLD_ICON = L.divIcon({
  className: "",
  html: `<div style="width:32px;height:32px;background:#C9A84C;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

export default function PropertyMap({
  lat,
  lng,
  zoom = 15,
  className = "h-[300px]",
  popup,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([lat, lng], { icon: GOLD_ICON }).addTo(map);
    if (popup) {
      marker.bindPopup(popup);
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, zoom, popup]);

  return (
    <div
      ref={mapRef}
      className={`rounded-xl overflow-hidden ${className}`}
    />
  );
}
