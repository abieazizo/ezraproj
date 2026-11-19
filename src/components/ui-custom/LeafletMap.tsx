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
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        link.integrity = "sha512-h9FcoyWjHcOcmEEnphOabtLRpBFB+Ld/OL7kkc/OS9F177se0+lgToNRPqpd+sNEkiPFjno0MsBm5siVYDlaQ==";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      const goldIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C9A84C" stroke="#0A1628" stroke-width="1" width="32" height="32"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#0A1628"/></svg>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);

      if (markerLabel) {
        marker.bindPopup(
          `<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0A1628;padding:2px 4px;">${markerLabel}</div>`,
          { closeButton: false }
        );
      }

      mapInstanceRef.current = map;

      setTimeout(() => map.invalidateSize(), 100);
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, markerLabel]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full rounded-xl overflow-hidden z-0", className)}
      style={{ height: "100%" }}
    />
  );
}
