import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property, FilterState } from "@/types";
import { listings as allListings } from "@/data/listings";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  currency: string,
  priceUnit: string
): string {
  const formatted = new Intl.NumberFormat("en-US").format(price);
  const suffix =
    priceUnit === "per-year"
      ? "/yr"
      : priceUnit === "per-month"
        ? "/mo"
        : "";
  return `${currency} ${formatted}${suffix}`;
}

export function formatArea(sqft: number): string {
  return `${new Intl.NumberFormat("en-US").format(sqft)} sq ft`;
}

export function formatBeds(n: number): string {
  if (n === 0) return "Studio";
  if (n === 1) return "1 Bed";
  return `${n} Beds`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getListings(): Property[] {
  return allListings;
}

export function getPropertyById(id: string): Property | undefined {
  return getListings().find((p) => p.id === id);
}

export function getPropertiesByFilter(
  filters: Partial<FilterState>
): Property[] {
  let results = getListings();

  if (filters.dealType && filters.dealType !== "all") {
    results = results.filter((p) => p.dealType === filters.dealType);
  }

  if (filters.type && filters.type.length > 0) {
    results = results.filter((p) => filters.type!.includes(p.type));
  }

  if (filters.minPrice !== undefined && filters.minPrice > 0) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.minBeds !== undefined && filters.minBeds > 0) {
    results = results.filter((p) => p.specs.bedrooms >= filters.minBeds!);
  }

  if (filters.minBaths !== undefined && filters.minBaths > 0) {
    results = results.filter((p) => p.specs.bathrooms >= filters.minBaths!);
  }

  if (filters.minArea !== undefined && filters.minArea > 0) {
    results = results.filter((p) => p.specs.area >= filters.minArea!);
  }

  if (filters.maxArea !== undefined && filters.maxArea > 0) {
    results = results.filter((p) => p.specs.area <= filters.maxArea!);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((p) =>
      filters.amenities!.every((a) => p.amenities.includes(a))
    );
  }

  if (filters.furnished && filters.furnished.length > 0) {
    results = results.filter((p) =>
      filters.furnished!.includes(p.specs.furnished)
    );
  }

  if (filters.city && filters.city.trim() !== "") {
    const cityLower = filters.city.toLowerCase();
    results = results.filter(
      (p) => p.location.city.toLowerCase() === cityLower
    );
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        results.sort((a, b) => b.views - a.views);
        break;
    }
  }

  return results;
}

export function getFeaturedProperties(limit: number = 6): Property[] {
  return getListings()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getRelatedProperties(property: Property): Property[] {
  const all = getListings();

  // First try similarIds
  if (property.similarIds && property.similarIds.length > 0) {
    const similar = property.similarIds
      .map((id) => all.find((p) => p.id === id))
      .filter((p): p is Property => p !== undefined);
    if (similar.length >= 3) return similar.slice(0, 6);
  }

  // Fallback: same type + same city, excluding current property
  const related = all
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.type === property.type ||
          p.location.city === property.location.city) &&
        p.dealType === property.dealType
    )
    .sort((a, b) => {
      // Prioritize same type AND same city
      const aScore =
        (a.type === property.type ? 2 : 0) +
        (a.location.city === property.location.city ? 1 : 0);
      const bScore =
        (b.type === property.type ? 2 : 0) +
        (b.location.city === property.location.city ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 6);

  return related;
}

export function searchProperties(query: string): Property[] {
  if (!query || query.trim() === "") return [];

  const terms = query.toLowerCase().trim().split(/\s+/);

  return getListings().filter((p) => {
    const searchable = [
      p.title,
      p.description,
      p.location.neighborhood,
      p.location.city,
      p.location.address,
      p.type,
      p.dealType,
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => searchable.includes(term));
  });
}
