"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  X,
  LayoutGrid,
  Grid2x2,
  List,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Home,
  ChevronRight as ChevronBreadcrumb,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters } from "@/hooks/useFilters";
import PropertyCard from "@/components/ui-custom/PropertyCard";
import type { PropertyType, DealType, FilterState } from "@/types";

const ITEMS_PER_PAGE = 12;

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "townhouse", label: "Townhouse" },
  { value: "office", label: "Office" },
  { value: "land", label: "Land" },
];

const BEDROOM_OPTIONS = [
  { label: "Studio", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5+", value: 5 },
];

const BATHROOM_OPTIONS = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const SORT_OPTIONS: { label: string; value: FilterState["sortBy"] }[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
];

const FURNISHING_OPTIONS = [
  { label: "Unfurnished", value: "unfurnished" },
  { label: "Semi-Furnished", value: "semi-furnished" },
  { label: "Fully Furnished", value: "fully-furnished" },
];

const AMENITY_OPTIONS = [
  "Pool",
  "Gym",
  "Sea View",
  "Parking",
  "24/7 Security",
  "Private Garden",
];

type ViewMode = "grid-3" | "grid-2" | "list" | "map";

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h3 className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
          {title}
        </h3>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-brand-slate transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && children}
    </div>
  );
}

function ListingsContent() {
  const {
    filters,
    setFilter,
    resetFilters,
    activeFilterCount,
    filteredProperties,
    totalCount,
    hasActiveFilters,
  } = useFilters();

  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const handleFilterChange = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilter(key, value);
      setCurrentPage(1);
    },
    [setFilter]
  );

  const handleReset = useCallback(() => {
    resetFilters();
    setCurrentPage(1);
  }, [resetFilters]);

  const typeCountMap = useMemo(() => {
    const counts: Partial<Record<PropertyType, number>> = {};
    filteredProperties.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, [filteredProperties]);

  const handleTypeToggle = useCallback(
    (type: PropertyType) => {
      const current = filters.type;
      const next = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      handleFilterChange("type", next);
    },
    [filters.type, handleFilterChange]
  );

  const handleDealTypeChange = useCallback(
    (deal: DealType | "all") => {
      handleFilterChange("dealType", deal);
    },
    [handleFilterChange]
  );

  const handleFurnishingToggle = useCallback(
    (value: string) => {
      const current = filters.furnished;
      const next = current.includes(value)
        ? current.filter((f) => f !== value)
        : [...current, value];
      handleFilterChange("furnished", next);
    },
    [filters.furnished, handleFilterChange]
  );

  const handleAmenityToggle = useCallback(
    (value: string) => {
      const current = filters.amenities;
      const next = current.includes(value)
        ? current.filter((a) => a !== value)
        : [...current, value];
      handleFilterChange("amenities", next);
    },
    [filters.amenities, handleFilterChange]
  );

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const filterSidebar = (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-lg font-bold text-brand-navy">
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-gold text-white text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-brand-gold hover:text-brand-gold-400 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort — at the very top, outside collapsible sections */}
      <div className="space-y-2 pb-4 border-b border-gray-100">
        <label className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            handleFilterChange(
              "sortBy",
              e.target.value as FilterState["sortBy"]
            )
          }
          className="w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm text-brand-navy bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold appearance-none cursor-pointer"
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Deal Type */}
      <FilterSection title="Deal Type">
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          {(["all", "sale", "rent"] as const).map((deal) => (
            <button
              key={deal}
              onClick={() => handleDealTypeChange(deal)}
              className={cn(
                "flex-1 py-2.5 text-sm font-semibold transition-all duration-200",
                filters.dealType === deal
                  ? "bg-brand-navy text-white"
                  : "bg-white text-brand-navy hover:bg-brand-cream"
              )}
            >
              {deal === "all"
                ? "All"
                : deal === "sale"
                  ? "For Sale"
                  : "For Rent"}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Property Type */}
      <FilterSection title="Property Type">
        <div className="space-y-2">
          {PROPERTY_TYPES.map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.type.includes(value)}
                onChange={() => handleTypeToggle(value)}
                className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold accent-brand-gold"
              />
              <span className="flex-1 text-sm text-brand-navy group-hover:text-brand-gold transition-colors">
                {label}
              </span>
              <span className="text-xs text-brand-slate">
                {typeCountMap[value] || 0}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (AED)">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              handleFilterChange("minPrice", Number(e.target.value) || 0)
            }
            className="w-full pl-3 pr-2 py-2.5 border border-gray-200 rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              handleFilterChange("maxPrice", Number(e.target.value) || 0)
            }
            className="w-full pl-3 pr-2 py-2.5 border border-gray-200 rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
          />
        </div>
      </FilterSection>

      {/* Bedrooms */}
      <FilterSection title="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {BEDROOM_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() =>
                handleFilterChange(
                  "minBeds",
                  filters.minBeds === value ? 0 : value
                )
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                filters.minBeds === value
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-white text-brand-navy border-gray-200 hover:border-brand-gold hover:text-brand-gold"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Bathrooms */}
      <FilterSection title="Bathrooms">
        <div className="flex flex-wrap gap-2">
          {BATHROOM_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() =>
                handleFilterChange(
                  "minBaths",
                  filters.minBaths === value ? 0 : value
                )
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                filters.minBaths === value
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-white text-brand-navy border-gray-200 hover:border-brand-gold hover:text-brand-gold"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Area (sqm) */}
      <FilterSection title="Area (sqm)" defaultOpen={false}>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={1000}
            step={50}
            value={filters.maxArea || 1000}
            onChange={(e) =>
              handleFilterChange("maxArea", Number(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min sqm"
              value={filters.minArea || ""}
              onChange={(e) =>
                handleFilterChange("minArea", Number(e.target.value) || 0)
              }
              className="w-full pl-3 pr-2 py-2.5 border border-gray-200 rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
            />
            <input
              type="number"
              placeholder="Max sqm"
              value={filters.maxArea || ""}
              onChange={(e) =>
                handleFilterChange("maxArea", Number(e.target.value) || 0)
              }
              className="w-full pl-3 pr-2 py-2.5 border border-gray-200 rounded-lg text-sm text-brand-navy placeholder:text-brand-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold"
            />
          </div>
        </div>
      </FilterSection>

      {/* Furnishing */}
      <FilterSection title="Furnishing" defaultOpen={false}>
        <div className="space-y-2">
          {FURNISHING_OPTIONS.map(({ label, value }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.furnished.includes(value)}
                onChange={() => handleFurnishingToggle(value)}
                className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold accent-brand-gold"
              />
              <span className="text-sm text-brand-navy group-hover:text-brand-gold transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Amenities */}
      <FilterSection title="Amenities" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          {AMENITY_OPTIONS.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold accent-brand-gold"
              />
              <span className="text-sm text-brand-navy group-hover:text-brand-gold transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  const propertyGrid = (
    <>
      {paginatedProperties.length > 0 ? (
        <>
          <div
            className={cn(
              viewMode === "grid-3"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : viewMode === "grid-2"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  : "flex flex-col gap-4"
            )}
          >
            {paginatedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant={viewMode === "list" ? "horizontal" : "default"}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-brand-navy hover:bg-white hover:shadow-card"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              {pageNumbers[0] > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="w-10 h-10 rounded-lg text-sm font-medium text-brand-navy hover:bg-white hover:shadow-card transition-all duration-200"
                  >
                    1
                  </button>
                  {pageNumbers[0] > 2 && (
                    <span className="text-brand-slate px-1">...</span>
                  )}
                </>
              )}

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200",
                    page === currentPage
                      ? "bg-brand-navy text-white shadow-md"
                      : "text-brand-navy hover:bg-white hover:shadow-card"
                  )}
                >
                  {page}
                </button>
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] <
                    totalPages - 1 && (
                    <span className="text-brand-slate px-1">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10 h-10 rounded-lg text-sm font-medium text-brand-navy hover:bg-white hover:shadow-card transition-all duration-200"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-brand-navy hover:bg-white hover:shadow-card"
                )}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-6">
            <Search className="w-8 h-8 text-brand-slate-400" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
            No properties match your criteria
          </h3>
          <p className="text-sm text-brand-slate mb-6 max-w-md">
            Try adjusting your filters or clearing them to see all
            available properties.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-white font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors duration-200"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-brand-cream/50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-brand-slate-400 mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-brand-gold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronBreadcrumb className="w-3.5 h-3.5" />
            <span className="text-white">Listings</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                Property Listings
              </h1>
              <p className="text-brand-slate-400 text-sm">
                {totalCount} {totalCount === 1 ? "property" : "properties"}{" "}
                found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="sticky top-[180px] bg-white rounded-xl shadow-card p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filterSidebar}
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg shadow-card text-sm font-semibold text-brand-navy hover:shadow-card-lg transition-shadow"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-gold text-white text-xs font-semibold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <p className="text-sm text-brand-slate hidden sm:block">
                  Showing{" "}
                  <span className="font-semibold text-brand-navy">
                    {Math.min(
                      (currentPage - 1) * ITEMS_PER_PAGE + 1,
                      totalCount
                    )}
                    -
                    {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-brand-navy">
                    {totalCount}
                  </span>{" "}
                  results
                </p>
              </div>

              {/* View Toggle — 4 modes */}
              <div className="flex items-center gap-1 bg-white rounded-lg shadow-card p-1">
                <button
                  onClick={() => setViewMode("grid-3")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === "grid-3"
                      ? "bg-brand-navy text-white"
                      : "text-brand-slate hover:text-brand-navy"
                  )}
                  aria-label="Grid 3-column view"
                  title="3 Columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid-2")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === "grid-2"
                      ? "bg-brand-navy text-white"
                      : "text-brand-slate hover:text-brand-navy"
                  )}
                  aria-label="Grid 2-column view"
                  title="2 Columns"
                >
                  <Grid2x2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === "list"
                      ? "bg-brand-navy text-white"
                      : "text-brand-slate hover:text-brand-navy"
                  )}
                  aria-label="List view"
                  title="List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === "map"
                      ? "bg-brand-navy text-white"
                      : "text-brand-slate hover:text-brand-navy"
                  )}
                  aria-label="Map view"
                  title="Map"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Property Grid / List / Map */}
            {viewMode === "map" ? (
              <div className="flex gap-4 h-[calc(100vh-260px)] min-h-[500px]">
                {/* Card list — 40% */}
                <div className="w-2/5 overflow-y-auto space-y-4 pr-2">
                  {paginatedProperties.length > 0 ? (
                    paginatedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        variant="horizontal"
                      />
                    ))
                  ) : (
                    <p className="text-sm text-brand-slate text-center py-10">
                      No properties match your filters.
                    </p>
                  )}
                </div>
                {/* Map area — 60% */}
                <div className="w-3/5 rounded-xl overflow-hidden bg-brand-navy-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-brand-gold mx-auto mb-3" />
                    <p className="text-white/80 text-sm font-medium">
                      Map View
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {totalCount} properties in this area
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              propertyGrid
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-2xl overflow-hidden flex flex-col animate-fadeInUp">
            {/* Sheet handle */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-brand-navy" />
                <h2 className="font-display text-lg font-bold text-brand-navy">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-gold text-white text-xs font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center hover:bg-brand-cream-200 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-4 h-4 text-brand-navy" />
              </button>
            </div>

            {/* Scrollable filter content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {filterSidebar}
            </div>

            {/* Bottom actions */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    handleReset();
                    setMobileFiltersOpen(false);
                  }}
                  className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-brand-navy hover:bg-brand-cream transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 bg-brand-gold text-white rounded-lg text-sm font-semibold hover:bg-brand-gold-400 transition-colors"
              >
                Show {totalCount} {totalCount === 1 ? "Result" : "Results"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-cream/50">
          <div className="bg-brand-navy">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="h-8 w-48 bg-brand-navy-700 rounded animate-pulse mb-4" />
              <div className="h-10 w-72 bg-brand-navy-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[380px] bg-white rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ListingsContent />
    </Suspense>
  );
}
