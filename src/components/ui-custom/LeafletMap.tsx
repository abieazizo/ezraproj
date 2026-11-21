"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

// Fix Leaflet default icon issue in Next.js/webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const goldIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">' +
        '<path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#C9A84C"/>' +
        '<circle cx="12" cy="11" r="5" fill="#fff"/>' +
        "</svg>"
    ),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerLabel?: string;
  height?: string;
  className?: string;
}

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  markerLabel,
  height = "400px",
  className,
}: LeafletMapProps) {
  return (
    <div
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ height }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={goldIcon}>
          {markerLabel && <Popup>{markerLabel}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
