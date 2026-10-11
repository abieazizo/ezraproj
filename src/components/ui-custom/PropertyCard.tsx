"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatArea, formatBeds } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "compact" | "horizontal" | "featured";
  showAgent?: boolean;
  className?: string;
}

const badgeStyles: Record<string, { bg: string; label: string }> = {
  featured: { bg: "bg-brand-gold", label: "Featured" },
  new: { bg: "bg-brand-navy", label: "New Listing" },
  "hot-deal": { bg: "bg-red-500", label: "Hot Deal" },
  "price-reduced": { bg: "bg-green-500", label: "Price Reduced" },
  exclusive: { bg: "bg-brand-navy-700", label: "Exclusive" },
};

export default function PropertyCard({
  property,
  variant = "default",
  showAgent = false,
  className,
}: PropertyCardProps) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const handleHeartClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(property.id);
  };

  const badge = property.badge ? badgeStyles[property.badge] : null;

  if (variant === "compact") {
    return <CompactCard property={property} wishlisted={wishlisted} onHeartClick={handleHeartClick} className={className} />;
  }

  if (variant === "horizontal") {
    return <HorizontalCard property={property} wishlisted={wishlisted} onHeartClick={handleHeartClick} showAgent={showAgent} className={className} />;
  }

  const isFeatured = variant === "featured";
  const cardHeight = isFeatured ? "h-[480px]" : "h-[380px]";
  const imageHeight = isFeatured ? "h-[65%]" : "h-[55%]";
  const contentHeight = isFeatured ? "h-[35%]" : "h-[45%]";

  return (
    <Link
      href={`/listings/${property.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden bg-white shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300",
        cardHeight,
        className
      )}
    >
      {/* Image area */}
      <div className={cn("relative overflow-hidden", imageHeight)}>
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Top-left badge */}
        {badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold",
              badge.bg
            )}
          >
            {badge.label}
          </span>
        )}

        {/* Top-right heart */}
        <button
          onClick={handleHeartClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              wishlisted ? "fill-red-500 text-red-500" : "fill-none text-white"
            )}
          />
        </button>

        {/* Bottom-left deal type pill */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white text-brand-navy text-xs font-semibold">
          {property.dealType === "sale" ? "For Sale" : "For Rent"}
        </span>

        {/* Featured variant: amenity tags at bottom of image */}
        {isFeatured && property.amenities.length > 0 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="bg-brand-cream/80 backdrop-blur text-xs text-brand-navy rounded-full px-2 py-0.5"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content area */}
      <div className={cn("p-4 flex flex-col justify-between", contentHeight)}>
        <div className="space-y-1.5">
          <p className="text-xl font-display font-bold text-brand-navy">
            {formatPrice(property.price, property.currency, property.priceUnit)}
          </p>
          <h3 className="text-base font-semibold text-brand-navy line-clamp-2 leading-snug">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-brand-slate text-xs">
            <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
            <span className="truncate">
              {property.location.neighborhood}, {property.location.city}
            </span>
          </div>
        </div>

        <div>
          {/* Specs row */}
          <div className="flex items-center gap-3 text-xs text-brand-slate mb-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {formatBeds(property.specs.bedrooms)}
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.specs.bathrooms} Bath
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              {formatArea(property.specs.area || property.specs.lotArea || 0)}
            </span>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <span className="bg-brand-cream text-brand-navy text-xs font-medium px-2 py-0.5 rounded-full capitalize">
              {property.type}
            </span>
            <span className="inline-flex items-center gap-1 text-brand-gold text-xs font-semibold group/link">
              View Details
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal variant                                                  */
/* ------------------------------------------------------------------ */

function HorizontalCard({
  property,
  wishlisted,
  onHeartClick,
  showAgent,
  className,
}: {
  property: Property;
  wishlisted: boolean;
  onHeartClick: (e: MouseEvent<HTMLButtonElement>) => void;
  showAgent?: boolean;
  className?: string;
}) {
  const badge = property.badge ? badgeStyles[property.badge] : null;

  return (
    <Link
      href={`/listings/${property.slug}`}
      className={cn(
        "group flex flex-row rounded-xl overflow-hidden bg-white shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Image - 40% width, 200px height */}
      <div className="relative w-[40%] min-h-[200px] flex-shrink-0 overflow-hidden">
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        {badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold",
              badge.bg
            )}
          >
            {badge.label}
          </span>
        )}
        <button
          onClick={onHeartClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              wishlisted ? "fill-red-500 text-red-500" : "fill-none text-white"
            )}
          />
        </button>
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white text-brand-navy text-xs font-semibold">
          {property.dealType === "sale" ? "For Sale" : "For Rent"}
        </span>
      </div>

      {/* Content - 60% */}
      <div className="w-[60%] p-4 flex flex-col justify-between">
        <div className="space-y-1.5">
          <p className="text-xl font-display font-bold text-brand-navy">
            {formatPrice(property.price, property.currency, property.priceUnit)}
          </p>
          <h3 className="text-base font-semibold text-brand-navy line-clamp-2 leading-snug">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-brand-slate text-xs">
            <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
            <span className="truncate">
              {property.location.neighborhood}, {property.location.city}
            </span>
          </div>
          <p className="text-sm text-brand-slate line-clamp-2 mt-1">
            {property.description}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 text-xs text-brand-slate mb-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {formatBeds(property.specs.bedrooms)}
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.specs.bathrooms} Bath
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              {formatArea(property.specs.area || property.specs.lotArea || 0)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="bg-brand-cream text-brand-navy text-xs font-medium px-2 py-0.5 rounded-full capitalize">
              {property.type}
            </span>
            <span className="inline-flex items-center gap-1 text-brand-gold text-xs font-semibold">
              View Details
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>

          {showAgent && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Image
                src={property.agent.photo}
                alt={property.agent.name}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <span className="text-xs text-brand-slate">
                {property.agent.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Compact variant                                                     */
/* ------------------------------------------------------------------ */

function CompactCard({
  property,
  wishlisted,
  onHeartClick,
  className,
}: {
  property: Property;
  wishlisted: boolean;
  onHeartClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <Link
      href={`/listings/${property.slug}`}
      className={cn(
        "group flex flex-row h-[100px] rounded-xl overflow-hidden bg-white shadow-card hover:shadow-card-lg transition-all duration-300",
        className
      )}
    >
      {/* Image 100px square */}
      <div className="relative w-[100px] h-full flex-shrink-0 overflow-hidden">
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="100px"
        />
        <button
          onClick={onHeartClick}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-3 h-3",
              wishlisted ? "fill-red-500 text-red-500" : "fill-none text-white"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col justify-center gap-1">
        <h3 className="text-sm font-semibold text-brand-navy line-clamp-1">
          {property.title}
        </h3>
        <p className="text-base font-display font-bold text-brand-navy">
          {formatPrice(property.price, property.currency, property.priceUnit)}
        </p>
        <div className="flex items-center gap-2 text-xs text-brand-slate">
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            {formatBeds(property.specs.bedrooms)}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            {property.specs.bathrooms} Bath
          </span>
        </div>
      </div>
    </Link>
  );
}
