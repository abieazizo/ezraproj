"use client";

import { useEffect, useRef } from "react";
import type L from "leaflet";

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
  className = "h-[300px]",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    const loadCSS = () => {
      if (document.querySelector('link[href*="leaflet"]')) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    };

    (async () => {
      loadCSS();
      const leaflet = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      const map = leaflet.map(mapRef.current, {
        scrollWheelZoom: false,
      }).setView([lat, lng], zoom);

      leaflet
        .tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
          }
        )
        .addTo(map);

      const goldIcon = leaflet.divIcon({
        className: "custom-marker",
        html: `<div style="width:32px;height:32px;background:#C9A84C;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
          <div style="width:8px;height:8px;background:white;border-radius:50%;transform:rotate(45deg)"></div>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = leaflet
        .marker([lat, lng], { icon: goldIcon })
        .addTo(map);
      if (markerLabel) {
        marker.bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#0A1628;padding:2px 4px">${markerLabel}</div>`
        );
      }

      mapInstanceRef.current = map;

      setTimeout(() => map.invalidateSize(), 100);
    })();

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
      className={`rounded-xl overflow-hidden border border-gray-200 ${className}`}
    />
  );
}
