"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
  markerLabel?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    label?: string;
    id?: string;
  }>;
  onMarkerClick?: (id: string) => void;
  activeMarkerId?: string;
}

function createGoldIcon(L: typeof import("leaflet")) {
  return L.divIcon({
    className: "shefa-marker",
    html: `<div style="width:32px;height:32px;background:#C9A84C;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3);"><div style="width:8px;height:8px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div></div>`,
    iconSize: [32, 32] as [number, number],
    iconAnchor: [16, 32] as [number, number],
    popupAnchor: [0, -32] as [number, number],
  });
}

function createActiveIcon(L: typeof import("leaflet")) {
  return L.divIcon({
    className: "shefa-marker-active",
    html: `<div style="width:38px;height:38px;background:#0A1628;border:3px solid #C9A84C;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 12px rgba(201,168,76,0.5);"><div style="width:10px;height:10px;background:#C9A84C;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div></div>`,
    iconSize: [38, 38] as [number, number],
    iconAnchor: [19, 38] as [number, number],
    popupAnchor: [0, -38] as [number, number],
  });
}

function makePopupHtml(text: string) {
  return `<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0A1628;min-width:120px;text-align:center;padding:4px 0;">${text}</div>`;
}

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  className,
  markerLabel,
  markers,
  onMarkerClick,
  activeMarkerId,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = await import("leaflet");

      if (cancelled || !mapRef.current) return;
      leafletRef.current = L;

      const goldIcon = createGoldIcon(L);
      const activeIcon = createActiveIcon(L);

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        attributionControl: true,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      if (markers && markers.length > 0) {
        markers.forEach((m) => {
          const isActive = m.id === activeMarkerId;
          const marker = L.marker([m.lat, m.lng], {
            icon: isActive ? activeIcon : goldIcon,
          }).addTo(map);

          if (m.label) {
            marker.bindPopup(makePopupHtml(m.label), {
              closeButton: false,
              className: "shefa-popup",
            });
          }

          if (m.id) {
            marker.on("click", () => {
              if (onMarkerClickRef.current) onMarkerClickRef.current(m.id!);
            });
          }

          markersRef.current.push(marker);
        });

        if (markers.length > 1) {
          const bounds = L.latLngBounds(
            markers.map((m) => [m.lat, m.lng] as [number, number])
          );
          map.fitBounds(bounds, { padding: [40, 40] });
        }
      } else {
        const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
        if (markerLabel) {
          marker
            .bindPopup(makePopupHtml(markerLabel), {
              closeButton: false,
              className: "shefa-popup",
            })
            .openPopup();
        }
        markersRef.current.push(marker);
      }

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
      leafletRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletRef.current;
    if (!map || !L || !markers) return;

    const goldIcon = createGoldIcon(L);
    const activeIcon = createActiveIcon(L);

    markersRef.current.forEach((m) => {
      const pos = m.getLatLng();
      const match = markers.find(
        (mk) => mk.lat === pos.lat && mk.lng === pos.lng
      );
      if (match) {
        m.setIcon(match.id === activeMarkerId ? activeIcon : goldIcon);
      }
    });

    if (activeMarkerId) {
      const active = markers.find((m) => m.id === activeMarkerId);
      if (active) {
        map.panTo([active.lat, active.lng], {
          animate: true,
          duration: 0.5,
        });
      }
    }
  }, [activeMarkerId, markers]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full rounded-xl overflow-hidden z-[1]", className)}
      style={{ minHeight: "300px" }}
    />
  );
}
