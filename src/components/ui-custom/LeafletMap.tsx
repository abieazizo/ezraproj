"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  id?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markerLabel?: string;
  markers?: MapMarker[];
  className?: string;
}

const goldIcon = L.icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#C9A84C"/>
        <circle cx="14" cy="14" r="6" fill="#fff"/>
      </svg>`
    ),
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
});

export default function LeafletMap({
  center,
  zoom = 15,
  markerLabel,
  markers,
  className,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    if (markers && markers.length > 0) {
      const bounds = L.latLngBounds([]);
      markers.forEach((m) => {
        const marker = L.marker([m.lat, m.lng], { icon: goldIcon }).addTo(map);
        const popupContent = m.id
          ? `<a href="/listings/${m.id}" style="font-family:sans-serif;font-size:13px;font-weight:600;color:#0A1628;text-decoration:none">${m.label}</a>`
          : `<div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#0A1628">${m.label}</div>`;
        marker.bindPopup(popupContent);
        bounds.extend([m.lat, m.lng]);
      });
      if (markers.length > 1) {
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    } else {
      const marker = L.marker(center, { icon: goldIcon }).addTo(map);
      if (markerLabel) {
        marker.bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#0A1628">${markerLabel}</div>`
        );
      }
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom, markerLabel, markers]);

  return <div ref={containerRef} className={className} />;
}
