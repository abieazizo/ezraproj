"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MarkerData {
  lat: number;
  lng: number;
  popup?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
  scrollWheelZoom?: boolean;
}

export default function LeafletMap({
  center,
  zoom = 15,
  markers = [],
  className,
  scrollWheelZoom = true,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      // @ts-expect-error CSS module import for side effects
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        scrollWheelZoom,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const goldIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 32px; height: 32px;
          background: #C9A84C;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "><div style="
          width: 8px; height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        "></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const allMarkers = markers.length > 0
        ? markers
        : [{ lat: center[0], lng: center[1] }];

      allMarkers.forEach((m) => {
        const marker = L.marker([m.lat, m.lng], { icon: goldIcon }).addTo(map);
        if (m.popup) {
          marker.bindPopup(m.popup, {
            className: "custom-popup",
            closeButton: true,
          });
        }
      });

      mapInstanceRef.current = map;
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers, scrollWheelZoom]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full h-[300px] rounded-xl z-0", className)}
      style={{ minHeight: 200 }}
    />
  );
}
