'use client'

import Image from 'next/image'
import PlaceholderImage from './PlaceholderImage'
import { getImageProps, getVariantFromAlt } from '@/lib/images'

type PlaceholderVariant = 'property' | 'portrait' | 'hero' | 'neighborhood' | 'blog' | 'office'

interface SmartImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  variant?: PlaceholderVariant
  seed?: string
  label?: string
}

function isLocal(src: string): boolean {
  return src.startsWith('/') || src.startsWith('./')
}

export default function SmartImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes,
  variant,
  seed,
  label,
}: SmartImageProps) {
  if (isLocal(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    )
  }

  const resolved = variant
    ? { variant, seed: seed || src }
    : (() => {
        const props = getImageProps(src, alt)
        return { variant: props.variant, seed: props.seed }
      })()

  const finalVariant = resolved.variant || getVariantFromAlt(alt)

  return (
    <PlaceholderImage
      variant={finalVariant}
      seed={resolved.seed || src}
      label={label}
      className={className}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
    />
  )
}
