"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

// Fix default marker icon issue in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom gold marker icon using a divIcon with an SVG
const goldMarkerIcon = new L.DivIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10.512 14.112 24.088 14.704 24.664a1.778 1.778 0 0 0 2.592 0C17.888 40.088 32 26.512 32 16 32 7.163 24.837 0 16 0z" fill="#C8A55B"/>
    <circle cx="16" cy="16" r="8" fill="white"/>
    <circle cx="16" cy="16" r="5" fill="#C8A55B"/>
  </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

interface MarkerData {
  lat: number;
  lng: number;
  title?: string;
  price?: string;
  id?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  height?: string;
  className?: string;
  onMarkerClick?: (id: string) => void;
  interactive?: boolean;
}

export default function LeafletMap({
  center,
  zoom = 15,
  markers = [],
  height = "400px",
  className,
  onMarkerClick,
  interactive = true,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={interactive}
      dragging={interactive}
      zoomControl={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      style={{ height, width: "100%" }}
      className={cn("rounded-xl z-[1]", className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={marker.id ?? index}
          position={[marker.lat, marker.lng]}
          icon={goldMarkerIcon}
          eventHandlers={
            marker.id && onMarkerClick
              ? {
                  click: () => onMarkerClick(marker.id!),
                }
              : undefined
          }
        >
          {(marker.title || marker.price) && (
            <Popup>
              <div className="text-center">
                {marker.title && (
                  <p className="font-semibold text-sm text-brand-navy">
                    {marker.title}
                  </p>
                )}
                {marker.price && (
                  <p className="text-xs text-brand-gold font-medium mt-1">
                    {marker.price}
                  </p>
                )}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
