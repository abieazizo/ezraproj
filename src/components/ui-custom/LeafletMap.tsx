"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerLabel?: string;
  className?: string;
}

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  markerLabel,
  className,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function init() {
      const L = (await import("leaflet")).default;
      // @ts-expect-error CSS module import for leaflet styles
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const goldIcon = L.divIcon({
        html: `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.16 24.84 0 16 0Z" fill="#C9A84C"/>
          <circle cx="16" cy="15" r="6" fill="white"/>
        </svg>`,
        className: "",
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);

      if (markerLabel) {
        marker.bindPopup(
          `<div style="font-family: sans-serif; font-size: 13px; font-weight: 600; color: #0A1628; padding: 2px 0;">${markerLabel}</div>`,
          { closeButton: false, offset: [0, -8] }
        );
      }

      mapInstanceRef.current = map;

      setTimeout(() => map.invalidateSize(), 100);
    }

    init();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, markerLabel]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full rounded-xl overflow-hidden", className)}
      style={{ height: "100%", minHeight: 280 }}
    />
  );
}
