"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  lat: number;
  lng: number;
  popup?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  scrollWheelZoom?: boolean;
}

const GOLD_ICON = L.divIcon({
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#C9A84C"/>
    <circle cx="14" cy="14" r="6" fill="white"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
  className: "",
});

export default function LeafletMap({
  center,
  zoom = 15,
  markers = [],
  className = "",
  scrollWheelZoom = false,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      scrollWheelZoom,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    markers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], { icon: GOLD_ICON }).addTo(map);
      if (m.popup) {
        marker.bindPopup(
          `<div style="font-family:Inter,sans-serif;font-size:13px;color:#0A1628;min-width:140px">${m.popup}</div>`,
          { closeButton: false, offset: [0, -30] }
        );
      }
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [center, zoom, markers, scrollWheelZoom]);

  return <div ref={mapRef} className={`w-full ${className}`} />;
}
