"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import PropertyCard from "@/components/ui-custom/PropertyCard";
import { listings } from "@/data/listings";
import { cn } from "@/lib/utils";
import type { DealType } from "@/types";

type FilterTab = "all" | DealType;

const tabs: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

export default function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const featured = useMemo(() => {
    const base = listings.filter((p) => p.featured);
    if (activeTab === "all") return base;
    return base.filter((p) => p.dealType === activeTab);
  }, [activeTab]);

  return (
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Our Portfolio"
          title="Featured Properties"
          action={{ label: "View All Listings", href: "/listings" }}
        />

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mt-10 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeTab === tab.value
                  ? "bg-brand-gold text-white shadow-gold"
                  : "bg-white text-brand-slate hover:bg-brand-cream-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.slice(0, 6).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              variant="featured"
            />
          ))}
        </div>

        {featured.length === 0 && (
          <p className="text-center text-brand-slate py-12">
            No featured properties found for this filter.
          </p>
        )}
      </div>
    </section>
  );
}
