"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ListingsMapProps {
  properties: Property[];
  selectedId?: string;
  onSelectProperty?: (id: string) => void;
}

export default function ListingsMap({
  properties,
  selectedId,
  onSelectProperty,
}: ListingsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const createIcon = useCallback((isSelected: boolean) => {
    return L.divIcon({
      html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z" fill="${isSelected ? "#C9A84C" : "#0A1628"}"/>
        <circle cx="14" cy="13" r="5" fill="white"/>
      </svg>`,
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -36],
      className: "",
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [25.2, 55.27],
      zoom: 11,
      scrollWheelZoom: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const bounds = L.latLngBounds([]);

    properties.forEach((p) => {
      const marker = L.marker([p.location.lat, p.location.lng], {
        icon: createIcon(p.id === selectedId),
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:180px">
            <strong style="font-size:13px">${p.title}</strong><br/>
            <span style="color:#C9A84C;font-weight:600">${formatPrice(p.price, p.currency, p.priceUnit)}</span><br/>
            <span style="font-size:12px;color:#64748B">${p.specs.bedrooms === 0 ? "Studio" : p.specs.bedrooms + " Bed"} · ${p.specs.bathrooms} Bath · ${p.specs.area} sqm</span>
          </div>`,
          { closeButton: false }
        );

      marker.on("click", () => {
        onSelectProperty?.(p.id);
      });

      markersRef.current.set(p.id, marker);
      bounds.extend([p.location.lat, p.location.lng]);
    });

    if (properties.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [properties, selectedId, createIcon, onSelectProperty]);

  useEffect(() => {
    if (!selectedId || !mapInstance.current) return;
    const marker = markersRef.current.get(selectedId);
    if (marker) {
      mapInstance.current.panTo(marker.getLatLng(), { animate: true });
      marker.openPopup();
    }
  }, [selectedId]);

  return <div ref={mapRef} className="w-full h-full" />;
}
