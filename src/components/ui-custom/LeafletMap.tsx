"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon missing in Next.js/webpack builds
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const goldIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapMarker {
  position: [number, number];
  title: string;
  price?: string;
  id?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  height?: string;
}

export default function LeafletMap({
  center,
  zoom = 15,
  markers,
  className = "",
  height = "400px",
}: LeafletMapProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers
          ? markers.map((marker, i) => (
              <Marker key={i} position={marker.position} icon={goldIcon}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold text-brand-navy">{marker.title}</p>
                    {marker.price && (
                      <p className="text-brand-gold font-bold mt-1">{marker.price}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))
          : (
              <Marker position={center} icon={goldIcon}>
                <Popup>
                  <span className="font-semibold text-sm">Location</span>
                </Popup>
              </Marker>
            )}
      </MapContainer>
    </div>
  );
}
