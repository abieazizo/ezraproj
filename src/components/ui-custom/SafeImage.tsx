"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const gradients = [
  "linear-gradient(135deg, #0A1628 0%, #152A52 50%, #C9A84C 100%)",
  "linear-gradient(135deg, #0F2040 0%, #0A1628 60%, #C9A84C 100%)",
  "linear-gradient(135deg, #152A52 0%, #0A1628 50%, #D4B96A 100%)",
  "linear-gradient(135deg, #0A1628 0%, #0F2040 40%, #DFCA88 100%)",
  "linear-gradient(135deg, #C9A84C 0%, #0A1628 50%, #152A52 100%)",
  "linear-gradient(135deg, #0A1628 0%, #64748B 50%, #C9A84C 100%)",
  "linear-gradient(135deg, #152A52 0%, #C9A84C 50%, #0A1628 100%)",
  "linear-gradient(135deg, #0F2040 0%, #D4B96A 40%, #0A1628 100%)",
  "linear-gradient(145deg, #0A1628 0%, #1a365d 50%, #C9A84C 100%)",
  "linear-gradient(125deg, #0A1628 0%, #0F2040 60%, #D4B96A 100%)",
  "linear-gradient(155deg, #152A52 0%, #0A1628 40%, #C9A84C 100%)",
  "linear-gradient(135deg, #0A1628 0%, #152A52 70%, #DFCA88 100%)",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSeed?: string;
}

export default function SafeImage({ fallbackSeed, className, alt, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  const seed = fallbackSeed || (typeof props.src === "string" ? props.src : alt || "");
  const gradientIndex = hashString(seed) % gradients.length;

  if (failed) {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{
          background: gradients[gradientIndex],
          position: (props.fill ? "absolute" : undefined) as "absolute" | undefined,
          inset: props.fill ? 0 : undefined,
          width: props.fill ? "100%" : undefined,
          height: props.fill ? "100%" : undefined,
        }}
        role="img"
        aria-label={alt}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="opacity-20"
        >
          <path
            d="M6 38L18 22L26 32L32 26L42 38H6Z"
            fill="white"
          />
          <circle cx="34" cy="14" r="4" fill="white" />
          <rect x="4" y="8" width="40" height="32" rx="2" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
