"use client";

import Link from "next/link";
import { Heart, ArrowRight, Search } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { listings } from "@/data/listings";
import PropertyCard from "@/components/ui-custom/PropertyCard";

export default function WishlistPage() {
  const { wishlist, count } = useWishlist();

  const wishlistedProperties = listings.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-navy-700 mb-4">
            <Heart className="w-7 h-7 text-brand-gold" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Your Wishlist
          </h1>
          <p className="text-white/70">
            {count > 0
              ? `${count} ${count === 1 ? "property" : "properties"} saved`
              : "No properties saved yet"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-brand-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4">
          {wishlistedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-white mx-auto flex items-center justify-center mb-6 shadow-card">
                <Heart className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="font-display text-2xl font-bold text-brand-navy mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-brand-slate mb-8 max-w-md mx-auto">
                Browse our listings and tap the heart icon on any property to
                save it here for easy comparison later.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/buy"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-white rounded-full font-semibold hover:bg-brand-gold-400 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Browse Properties for Sale
                </Link>
                <Link
                  href="/rent"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy rounded-full font-semibold hover:bg-brand-navy hover:text-white transition-colors"
                >
                  Browse Rentals
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
