"use client";

import { MapPin, ExternalLink, Navigation } from "lucide-react";

interface StaticMapProps {
  lat: number;
  lng: number;
  address: string;
  neighborhood?: string;
  city?: string;
  height?: string;
  className?: string;
}

export default function StaticMap({
  lat,
  lng,
  address,
  neighborhood,
  city,
  height = "h-[350px]",
  className = "",
}: StaticMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const locationLabel = [neighborhood, city].filter(Boolean).join(", ");

  return (
    <div
      className={`relative rounded-xl overflow-hidden ${height} ${className}`}
    >
      {/* Gradient background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-800 to-brand-navy-700" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mapGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapGrid)" />
      </svg>

      {/* Decorative concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border border-brand-gold/10 absolute" />
        <div className="w-72 h-72 rounded-full border border-brand-gold/5 absolute" />
        <div className="w-96 h-96 rounded-full border border-brand-gold/[0.03] absolute" />
      </div>

      {/* Compass indicator */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
        <Navigation className="w-4 h-4 text-white/60" />
      </div>

      {/* Coordinates label */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-sm">
        <span className="text-[11px] font-mono text-white/50 tracking-wide">
          {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
        </span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Animated pin */}
        <div className="relative mb-4">
          <div className="absolute -inset-3 bg-brand-gold/20 rounded-full animate-pulse_gold" />
          <div className="relative w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center shadow-gold">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-black/20 rounded-full blur-sm" />
        </div>

        <p className="text-white font-semibold text-base mb-1 text-center px-6 max-w-xs">
          {address}
        </p>
        {locationLabel && (
          <p className="text-white/60 text-sm mb-5">{locationLabel}</p>
        )}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white text-sm font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors shadow-gold"
        >
          <ExternalLink className="w-4 h-4" />
          View on Google Maps
        </a>
      </div>
    </div>
  );
}
