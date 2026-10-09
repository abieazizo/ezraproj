"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/types";
import { formatPrice, formatBeds } from "@/lib/utils";

interface ListingsMapProps {
  properties: Property[];
}

const GOLD_ICON = L.divIcon({
  className: "",
  html: `<div style="
    width: 28px; height: 28px;
    background: #C9A84C;
    border: 2px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export default function ListingsMap({ properties }: ListingsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView([25.2048, 55.2708], 12);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    const bounds: L.LatLngBoundsExpression = [];

    properties.forEach((property) => {
      const { lat, lng } = property.location;
      bounds.push([lat, lng] as [number, number]);

      const popup = `
        <div style="font-family:Inter,sans-serif;min-width:200px;">
          <div style="font-weight:700;font-size:14px;color:#0A1628;margin-bottom:4px;">
            ${property.title}
          </div>
          <div style="font-size:16px;font-weight:700;color:#C9A84C;margin-bottom:4px;">
            ${formatPrice(property.price, property.currency, property.priceUnit)}
          </div>
          <div style="font-size:12px;color:#64748B;">
            ${formatBeds(property.specs.bedrooms)} · ${property.specs.bathrooms} Bath · ${property.specs.area} sqm
          </div>
          <a href="/listings/${property.slug}" style="display:inline-block;margin-top:8px;font-size:12px;font-weight:600;color:#C9A84C;text-decoration:none;">
            View Details →
          </a>
        </div>
      `;

      L.marker([lat, lng], { icon: GOLD_ICON })
        .addTo(map)
        .bindPopup(popup);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [properties]);

  return <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" />;
}
