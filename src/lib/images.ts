type PlaceholderVariant = 'property' | 'portrait' | 'hero' | 'neighborhood' | 'blog' | 'office'

interface ImageProps {
  variant: PlaceholderVariant
  seed: string
  label?: string
}

const PORTRAIT_PATTERNS = [/portrait/i, /randomuser/i, /face/i, /people/i, /person/i]
const BLOG_PATTERNS = [/blog/i, /article/i, /editorial/i, /writing/i]
const OFFICE_PATTERNS = [/office/i, /workspace/i, /desk/i, /corporate/i, /meeting/i]
const NEIGHBORHOOD_PATTERNS = [/city/i, /aerial/i, /skyline/i, /downtown/i, /street/i, /neighborhood/i]

export function getImageProps(url: string, context?: string): ImageProps {
  const combined = `${url} ${context || ''}`

  for (const p of PORTRAIT_PATTERNS) {
    if (p.test(combined)) {
      return { variant: 'portrait', seed: url, label: undefined }
    }
  }

  for (const p of BLOG_PATTERNS) {
    if (p.test(combined)) {
      return { variant: 'blog', seed: url }
    }
  }

  for (const p of OFFICE_PATTERNS) {
    if (p.test(combined)) {
      return { variant: 'office', seed: url }
    }
  }

  for (const p of NEIGHBORHOOD_PATTERNS) {
    if (p.test(combined)) {
      return { variant: 'neighborhood', seed: url }
    }
  }

  return { variant: 'property', seed: url }
}

export function getVariantFromAlt(alt: string): PlaceholderVariant {
  const lower = alt.toLowerCase()
  if (/agent|team|photo|profile/.test(lower)) return 'portrait'
  if (/blog|article|insight|guide|market/.test(lower)) return 'blog'
  if (/office|workspace|corporate/.test(lower)) return 'office'
  if (/neighborhood|area|district|city|skyline/.test(lower)) return 'neighborhood'
  if (/hero|banner|cover/.test(lower)) return 'hero'
  return 'property'
}
