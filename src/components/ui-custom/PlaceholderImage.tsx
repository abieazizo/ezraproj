'use client'

import { cn } from '@/lib/utils'

type PlaceholderVariant = 'property' | 'portrait' | 'hero' | 'neighborhood' | 'blog' | 'office'

interface PlaceholderImageProps {
  variant?: PlaceholderVariant
  seed?: string
  label?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const PALETTES: Record<PlaceholderVariant, string[][]> = {
  property: [
    ['#0A1628', '#152A52', '#C9A84C'],
    ['#152A52', '#0F2040', '#D4B96A'],
    ['#0F2040', '#1a3a6a', '#DFCA88'],
    ['#0A1628', '#1e3d70', '#C9A84C'],
    ['#152A52', '#0A1628', '#D4B96A'],
    ['#1a3a6a', '#0F2040', '#C9A84C'],
    ['#0A1628', '#152A52', '#DFCA88'],
    ['#0F2040', '#0A1628', '#D4B96A'],
  ],
  portrait: [
    ['#C9A84C', '#D4B96A', '#DFCA88'],
    ['#D4B96A', '#C9A84C', '#F8F5F0'],
    ['#DFCA88', '#C9A84C', '#F0EBE3'],
    ['#C9A84C', '#DFCA88', '#F8F5F0'],
  ],
  hero: [
    ['#050d1a', '#0A1628', '#152A52'],
    ['#060e1c', '#0F2040', '#0A1628'],
  ],
  neighborhood: [
    ['#0A1628', '#152A52', '#C9A84C'],
    ['#152A52', '#1a3a6a', '#D4B96A'],
    ['#0F2040', '#0A1628', '#DFCA88'],
    ['#1a3a6a', '#152A52', '#C9A84C'],
    ['#0A1628', '#0F2040', '#D4B96A'],
  ],
  blog: [
    ['#F8F5F0', '#F0EBE3', '#C9A84C'],
    ['#F0EBE3', '#F8F5F0', '#D4B96A'],
    ['#F8F5F0', '#DFCA88', '#F0EBE3'],
  ],
  office: [
    ['#0A1628', '#152A52', '#94A3B8'],
    ['#0F2040', '#0A1628', '#64748B'],
  ],
}

const ANGLES = [135, 150, 160, 170, 180, 200, 210, 225]

function PropertyIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 opacity-[0.12]">
      <path d="M32 6L4 28h8v26h16V38h8v16h16V28h8L32 6z" fill="currentColor" />
      <rect x="22" y="18" width="8" height="8" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="34" y="18" width="8" height="8" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function PortraitIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-[0.18]">
      <circle cx="32" cy="22" r="12" fill="currentColor" />
      <path d="M10 58c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-[0.15]">
      <path d="M32 4C21.5 4 13 12.5 13 23c0 14.25 19 37 19 37s19-22.75 19-37C51 12.5 42.5 4 32 4z" fill="currentColor" />
      <circle cx="32" cy="23" r="8" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-[0.1]">
      <rect x="8" y="6" width="48" height="52" rx="4" fill="currentColor" />
      <rect x="16" y="16" width="32" height="4" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="16" y="26" width="24" height="3" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="16" y="34" width="28" height="3" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="16" y="42" width="20" height="3" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function OfficeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-[0.12]">
      <rect x="12" y="10" width="40" height="48" rx="2" fill="currentColor" />
      <rect x="18" y="16" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="29" y="16" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="40" y="16" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="18" y="28" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="29" y="28" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="40" y="28" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="18" y="40" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="29" y="40" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="40" y="40" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

const ICONS: Record<PlaceholderVariant, () => JSX.Element> = {
  property: PropertyIcon,
  portrait: PortraitIcon,
  hero: PropertyIcon,
  neighborhood: LocationIcon,
  blog: BlogIcon,
  office: OfficeIcon,
}

export default function PlaceholderImage({
  variant = 'property',
  seed = '',
  label,
  className,
  fill,
  width,
  height,
}: PlaceholderImageProps) {
  const h = hashStr(seed || 'default')
  const palette = PALETTES[variant]
  const colors = palette[h % palette.length]
  const angle = ANGLES[h % ANGLES.length]
  const Icon = ICONS[variant]

  const patternOffset = (h % 40) + 10
  const patternSize = (h % 20) + 30

  const gradient = `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 55%, ${colors[2]} 100%)`

  const patternStyle =
    variant === 'property' || variant === 'neighborhood' || variant === 'hero'
      ? {
          backgroundImage: `${gradient}, repeating-linear-gradient(${angle + 45}deg, transparent, transparent ${patternSize}px, rgba(255,255,255,0.02) ${patternSize}px, rgba(255,255,255,0.02) ${patternSize + 1}px)`,
        }
      : variant === 'portrait'
        ? {
            backgroundImage: `radial-gradient(circle at ${patternOffset + 30}% ${patternOffset + 20}%, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
          }
        : {
            backgroundImage: gradient,
          }

  const sizeStyles = fill
    ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%' }
    : { width: width ?? '100%', height: height ?? '100%' }

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden',
        variant === 'hero' ? 'text-brand-gold' : variant === 'blog' ? 'text-brand-navy' : 'text-white',
        className
      )}
      style={{ ...sizeStyles, ...patternStyle }}
    >
      <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
        <Icon />
        {label && (
          <span className="text-xs font-sans tracking-wider uppercase opacity-30 max-w-[120px] text-center leading-tight">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
