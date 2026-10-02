"use client";

import { useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import PropertyCard from "@/components/ui-custom/PropertyCard";
import type { PropertyType } from "@/types";

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "townhouse", label: "Townhouse" },
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail" },
];

const SORT_OPTIONS = [
  { value: "newest" as const, label: "Newest First" },
  { value: "price-asc" as const, label: "Price: Low to High" },
  { value: "price-desc" as const, label: "Price: High to Low" },
  { value: "popular" as const, label: "Most Popular" },
];

export default function RentListingsGrid() {
  const { filters, setFilter, resetFilters, hasActiveFilters, filteredProperties } =
    useFilters();

  const rentalProperties = useMemo(
    () => filteredProperties.filter((p) => p.dealType === "rent"),
    [filteredProperties]
  );

  const handleTypeToggle = (type: PropertyType) => {
    const current = filters.type;
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setFilter("type", next);
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-card mb-8">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-5 h-5 text-brand-gold" />
          <span className="font-semibold text-brand-navy">Filters</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto text-sm text-brand-gold hover:text-brand-gold-400 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Property Type Chips */}
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => handleTypeToggle(pt.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filters.type.includes(pt.value)
                    ? "bg-brand-navy text-white"
                    : "bg-brand-cream text-brand-navy hover:bg-brand-cream-200"
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>

          {/* Min Bedrooms */}
          <select
            value={filters.minBeds}
            onChange={(e) => setFilter("minBeds", Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-brand-navy bg-white focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
          >
            <option value={0}>Any Beds</option>
            <option value={1}>1+ Beds</option>
            <option value={2}>2+ Beds</option>
            <option value={3}>3+ Beds</option>
            <option value={4}>4+ Beds</option>
          </select>

          {/* Furnished */}
          <select
            value={filters.furnished.length > 0 ? filters.furnished[0] : ""}
            onChange={(e) =>
              setFilter(
                "furnished",
                e.target.value ? [e.target.value] : []
              )
            }
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-brand-navy bg-white focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none"
          >
            <option value="">Any Furnishing</option>
            <option value="fully-furnished">Fully Furnished</option>
            <option value="semi-furnished">Semi Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilter("sortBy", e.target.value as typeof filters.sortBy)
            }
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-brand-navy bg-white focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none ml-auto"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-brand-slate mb-6">
        Showing{" "}
        <span className="font-semibold text-brand-navy">{rentalProperties.length}</span>{" "}
        rental {rentalProperties.length === 1 ? "property" : "properties"}
      </p>

      {/* Grid */}
      {rentalProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brand-slate text-lg mb-4">
            No rental properties match your current filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-brand-gold text-white rounded-full font-semibold hover:bg-brand-gold-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
