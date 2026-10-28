'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface LeafletMapProps {
  lat: number
  lng: number
  zoom?: number
  markerText?: string
  height?: string
  className?: string
}

export default function LeafletMap({
  lat,
  lng,
  zoom = 15,
  markerText,
  height = '400px',
  className = '',
}: LeafletMapProps) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      L.Marker.prototype.options.icon = DefaultIcon
      initialized.current = true
    }
  }, [])

  return (
    <div className={`overflow-hidden rounded-xl ${className}`} style={{ height }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={DefaultIcon}>
          {markerText && <Popup>{markerText}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  )
}
