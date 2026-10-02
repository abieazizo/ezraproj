"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { FilterState, DealType, PropertyType, Property } from "@/types";
import { listings } from "@/data/listings";

function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const dealType = (params.get("deal") as DealType | "all") || "all";
  const typeParam = params.get("type");
  const type = typeParam
    ? (typeParam.split(",") as PropertyType[])
    : [];
  const minPrice = Number(params.get("minPrice")) || 0;
  const maxPrice = Number(params.get("maxPrice")) || 0;
  const minBeds = Number(params.get("minBeds")) || 0;
  const minBaths = Number(params.get("minBaths")) || 0;
  const minArea = Number(params.get("minArea")) || 0;
  const maxArea = Number(params.get("maxArea")) || 0;
  const amenitiesParam = params.get("amenities");
  const amenities = amenitiesParam ? amenitiesParam.split(",") : [];
  const furnishedParam = params.get("furnished");
  const furnished = furnishedParam ? furnishedParam.split(",") : [];
  const city = params.get("city") || "";
  const sortBy =
    (params.get("sortBy") as FilterState["sortBy"]) || "newest";

  return {
    dealType,
    type,
    minPrice,
    maxPrice,
    minBeds,
    minBaths,
    minArea,
    maxArea,
    amenities,
    furnished,
    city,
    sortBy,
  };
}

function filtersToParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.dealType !== "all") params.set("deal", filters.dealType);
  if (filters.type.length > 0) params.set("type", filters.type.join(","));
  if (filters.minPrice > 0) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice > 0) params.set("maxPrice", String(filters.maxPrice));
  if (filters.minBeds > 0) params.set("minBeds", String(filters.minBeds));
  if (filters.minBaths > 0) params.set("minBaths", String(filters.minBaths));
  if (filters.minArea > 0) params.set("minArea", String(filters.minArea));
  if (filters.maxArea > 0) params.set("maxArea", String(filters.maxArea));
  if (filters.amenities.length > 0)
    params.set("amenities", filters.amenities.join(","));
  if (filters.furnished.length > 0)
    params.set("furnished", filters.furnished.join(","));
  if (filters.city) params.set("city", filters.city);
  if (filters.sortBy !== "newest") params.set("sortBy", filters.sortBy);

  return params;
}

function applyFilters(allListings: Property[], filters: FilterState): Property[] {
  let results = [...allListings];

  if (filters.dealType !== "all") {
    results = results.filter((p) => p.dealType === filters.dealType);
  }

  if (filters.type.length > 0) {
    results = results.filter((p) => filters.type.includes(p.type));
  }

  if (filters.minPrice > 0) {
    results = results.filter((p) => p.price >= filters.minPrice);
  }

  if (filters.maxPrice > 0) {
    results = results.filter((p) => p.price <= filters.maxPrice);
  }

  if (filters.minBeds > 0) {
    results = results.filter((p) => p.specs.bedrooms >= filters.minBeds);
  }

  if (filters.minBaths > 0) {
    results = results.filter((p) => p.specs.bathrooms >= filters.minBaths);
  }

  if (filters.minArea > 0) {
    results = results.filter((p) => p.specs.area >= filters.minArea);
  }

  if (filters.maxArea > 0) {
    results = results.filter((p) => p.specs.area <= filters.maxArea);
  }

  if (filters.amenities.length > 0) {
    results = results.filter((p) =>
      filters.amenities.every((a) => p.amenities.includes(a))
    );
  }

  if (filters.furnished.length > 0) {
    results = results.filter((p) =>
      filters.furnished.includes(p.specs.furnished)
    );
  }

  if (filters.city) {
    const cityLower = filters.city.toLowerCase();
    results = results.filter(
      (p) => p.location.city.toLowerCase() === cityLower
    );
  }

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

  return results;
}

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => parseFiltersFromParams(searchParams),
    [searchParams]
  );

  const setFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      const newFilters = { ...parseFiltersFromParams(searchParams), [key]: value };
      const params = filtersToParams(newFilters);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.dealType !== "all") count++;
    if (filters.type.length > 0) count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice > 0) count++;
    if (filters.minBeds > 0) count++;
    if (filters.minBaths > 0) count++;
    if (filters.minArea > 0) count++;
    if (filters.maxArea > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.furnished.length > 0) count++;
    if (filters.city) count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFilterCount > 0;

  const filteredProperties = useMemo(
    () => applyFilters(listings, filters),
    [filters]
  );

  const totalCount = filteredProperties.length;

  return {
    filters,
    setFilter,
    resetFilters,
    activeFilterCount,
    filteredProperties,
    totalCount,
    hasActiveFilters,
  };
}
