"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
  markerTitle?: string;
}

const goldIcon = L.divIcon({
  className: "",
  html: `<div style="width:32px;height:42px;position:relative;">
    <svg viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="#C9A84C"/>
      <circle cx="16" cy="15" r="6" fill="white"/>
    </svg>
  </div>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  className,
  markerTitle,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
    if (markerTitle) {
      marker.bindPopup(
        `<div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#0A1628;">${markerTitle}</div>`
      );
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom, markerTitle]);

  return (
    <div
      ref={containerRef}
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ minHeight: 300 }}
    />
  );
}
