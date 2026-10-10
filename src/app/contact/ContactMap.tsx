"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const OFFICE_LAT = 25.1855;
const OFFICE_LNG = 55.2616;

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [OFFICE_LAT, OFFICE_LNG],
      zoom: 15,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const goldIcon = L.divIcon({
      html: `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="#C9A84C"/>
        <circle cx="16" cy="15" r="6" fill="white"/>
      </svg>`,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      className: "",
    });

    L.marker([OFFICE_LAT, OFFICE_LNG], { icon: goldIcon })
      .addTo(map)
      .bindPopup(
        `<div style="text-align:center;font-family:sans-serif">
          <strong>Shefa Real Estate</strong><br/>
          Bay Square, Business Bay<br/>
          <a href="https://maps.google.com/?q=Bay+Square+Business+Bay+Dubai" target="_blank" rel="noopener" style="color:#C9A84C">Get Directions</a>
        </div>`
      );

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}
