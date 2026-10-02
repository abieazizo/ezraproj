export type PropertyType =
  | "apartment"
  | "villa"
  | "penthouse"
  | "townhouse"
  | "office"
  | "land"
  | "retail";

export type DealType = "sale" | "rent";

export type PropertyStatus = "available" | "under-offer" | "sold" | "rented";

export type PropertyBadge =
  | "featured"
  | "new"
  | "hot-deal"
  | "price-reduced"
  | "exclusive"
  | null;

export interface PropertyLocation {
  address: string;
  neighborhood: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  mapZoom?: number;
}

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotArea?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  parking: number;
  furnished: "unfurnished" | "semi-furnished" | "fully-furnished";
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo: string;
  bio: string;
  languages: string[];
  specialties: string[];
  listings: number;
  rating: number;
  reviews: number;
  linkedin?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  dealType: DealType;
  status: PropertyStatus;
  badge: PropertyBadge;
  price: number;
  priceUnit: "total" | "per-month" | "per-year";
  currency: "AED" | "USD" | "SAR" | "EUR";
  serviceFee?: number;
  location: PropertyLocation;
  specs: PropertySpecs;
  amenities: string[];
  features: string[];
  images: string[];
  coverImage: string;
  description: string;
  agent: Agent;
  badge_label?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  similarIds?: string[];
  virtualTourUrl?: string;
  floorPlanUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category:
    | "Market Trends"
    | "Buying Guide"
    | "Investment"
    | "Lifestyle"
    | "Legal & Finance";
  author: Pick<Agent, "name" | "photo" | "title">;
  readTime: number;
  publishedAt: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  role: string;
  content: string;
  rating: 5 | 4;
  propertyType: string;
  location: string;
  date: string;
}

export interface FilterState {
  dealType: DealType | "all";
  type: PropertyType[];
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minBaths: number;
  minArea: number;
  maxArea: number;
  amenities: string[];
  furnished: string[];
  city: string;
  sortBy: "newest" | "price-asc" | "price-desc" | "popular";
}
