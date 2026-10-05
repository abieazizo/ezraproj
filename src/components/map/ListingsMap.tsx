"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/types";
import { formatPrice, formatBeds } from "@/lib/utils";

interface ListingsMapProps {
  properties: Property[];
  selectedId?: string;
  onSelectProperty?: (id: string) => void;
  className?: string;
}

function createGoldIcon(isActive: boolean) {
  const size = isActive ? 40 : 28;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:${isActive ? "#C9A84C" : "#0A1628"};border:3px solid ${isActive ? "#fff" : "#C9A84C"};border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);transition:all 0.2s;cursor:pointer;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

export default function ListingsMap({
  properties,
  selectedId,
  onSelectProperty,
  className = "h-full",
}: ListingsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const handleMarkerClick = useCallback(
    (id: string) => {
      onSelectProperty?.(id);
    },
    [onSelectProperty]
  );

  useEffect(() => {
    if (!mapRef.current || properties.length === 0) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [25.2048, 55.2708],
        zoom: 11,
        scrollWheelZoom: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    const bounds: L.LatLngExpression[] = [];

    properties.forEach((property) => {
      const isActive = property.id === selectedId;
      const marker = L.marker([property.location.lat, property.location.lng], {
        icon: createGoldIcon(isActive),
        zIndexOffset: isActive ? 1000 : 0,
      }).addTo(map);

      const popupContent = `
        <div style="min-width:180px;font-family:Inter,sans-serif;">
          <strong style="font-size:13px;color:#0A1628;">${property.title}</strong><br/>
          <span style="font-size:14px;font-weight:600;color:#C9A84C;">${formatPrice(property.price, property.currency, property.priceUnit)}</span><br/>
          <span style="font-size:12px;color:#64748B;">${formatBeds(property.specs.bedrooms)} · ${property.specs.bathrooms} Bath · ${property.specs.area} sqm</span>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on("click", () => handleMarkerClick(property.id));

      markersRef.current.set(property.id, marker);
      bounds.push([property.location.lat, property.location.lng]);
    });

    if (bounds.length > 1) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    }

    return () => {};
  }, [properties, selectedId, handleMarkerClick]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const isActive = id === selectedId;
      marker.setIcon(createGoldIcon(isActive));
      marker.setZIndexOffset(isActive ? 1000 : 0);
      if (isActive) {
        marker.openPopup();
        mapInstanceRef.current?.panTo(marker.getLatLng());
      }
    });
  }, [selectedId]);

  useEffect(() => {
    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} className={`rounded-xl overflow-hidden ${className}`} />;
}
