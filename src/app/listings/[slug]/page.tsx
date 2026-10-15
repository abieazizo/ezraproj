import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Calendar,
  Home,
  ChevronRight,
  Phone,
  MessageCircle,
  Mail,
  Star,
  Check,
  Eye,
  Hash,
  Clock,
  Activity,
  Building,
  TreePine,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";
import { getPropertyBySlug, getAllSlugs, getPropertiesByIds } from "@/data/listings";
import { generatePropertyMeta } from "@/lib/metadata";
import { formatPrice, formatArea, formatBeds, cn } from "@/lib/utils";
import PropertyCard from "@/components/ui-custom/PropertyCard";
import ScheduleViewingForm from "./ScheduleViewingForm";
import ExpandableDescription from "./ExpandableDescription";

const PropertyGallery = dynamic(
  () => import("@/components/property/PropertyGallery"),
  { ssr: false }
);

const MortgageCalculator = dynamic(
  () => import("@/components/property/MortgageCalculator"),
  { ssr: false }
);

const LeafletMap = dynamic(
  () => import("@/components/ui-custom/LeafletMap"),
  { ssr: false }
);

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) {
    return { title: "Property Not Found" };
  }
  return generatePropertyMeta(property);
}

const NEARBY_PLACES = [
  { icon: <ShoppingBag className="w-4 h-4" />, label: "Shopping Mall", distance: "0.8 km" },
  { icon: <GraduationCap className="w-4 h-4" />, label: "International School", distance: "1.2 km" },
  { icon: <Stethoscope className="w-4 h-4" />, label: "Hospital", distance: "2.5 km" },
  { icon: <TreePine className="w-4 h-4" />, label: "Park", distance: "0.5 km" },
  { icon: <Building className="w-4 h-4" />, label: "Metro Station", distance: "1.0 km" },
];

export default function PropertyDetailPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const similarProperties = property.similarIds
    ? getPropertiesByIds(property.similarIds).slice(0, 3)
    : [];

  const listedDate = new Date(property.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const typeLabel =
    property.type.charAt(0).toUpperCase() + property.type.slice(1);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://www.shefarealestate.com/listings/${property.slug}`,
    image: property.images,
    datePosted: property.createdAt,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address,
      addressLocality: property.location.city,
      addressCountry: property.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.lat,
      longitude: property.location.lng,
    },
    numberOfRooms: property.specs.bedrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.specs.area,
      unitText: "SQM",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-brand-cream/50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <nav className="flex items-center gap-1.5 text-sm text-brand-slate flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-brand-gold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-slate-400" />
            <Link
              href="/listings"
              className="hover:text-brand-gold transition-colors"
            >
              Properties
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-slate-400" />
            <Link
              href={`/listings?type=${property.type}`}
              className="hover:text-brand-gold transition-colors capitalize"
            >
              {typeLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-slate-400" />
            <span className="text-brand-navy font-medium truncate max-w-[200px]">
              {property.title}
            </span>
          </nav>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <PropertyGallery images={property.images} title={property.title} />
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column (65%) */}
            <div className="lg:w-[65%] space-y-8">
              {/* Status & Deal Type Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                    property.status === "available"
                      ? "bg-green-100 text-green-700"
                      : property.status === "under-offer"
                        ? "bg-amber-100 text-amber-700"
                        : property.status === "sold"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                  )}
                >
                  {property.status.replace("-", " ")}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-navy text-white">
                  {property.dealType === "sale" ? "For Sale" : "For Rent"}
                </span>
                {property.badge && (
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold text-white",
                      property.badge === "featured"
                        ? "bg-brand-gold"
                        : property.badge === "new"
                          ? "bg-brand-navy-700"
                          : property.badge === "hot-deal"
                            ? "bg-red-500"
                            : property.badge === "price-reduced"
                              ? "bg-green-500"
                              : "bg-brand-navy-700"
                    )}
                  >
                    {property.badge === "hot-deal"
                      ? "Hot Deal"
                      : property.badge === "price-reduced"
                        ? "Price Reduced"
                        : property.badge.charAt(0).toUpperCase() +
                          property.badge.slice(1)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-brand-slate">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-base">
                  {property.location.address},{" "}
                  {property.location.neighborhood},{" "}
                  {property.location.city}
                </span>
              </div>

              {/* Price */}
              <div>
                <p className="font-display text-4xl font-bold text-brand-gold">
                  {formatPrice(
                    property.price,
                    property.currency,
                    property.priceUnit
                  )}
                </p>
                {property.serviceFee && (
                  <p className="text-sm text-brand-slate mt-1">
                    Service fee: {formatPrice(property.serviceFee, property.currency, "total")}/year
                  </p>
                )}
              </div>

              {/* Quick Specs Bar */}
              <div className="flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow-card">
                <div className="flex items-center gap-2 px-3 py-2">
                  <Bed className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-xs text-brand-slate">Bedrooms</p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {formatBeds(property.specs.bedrooms)}
                    </p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100 self-center" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <Bath className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-xs text-brand-slate">Bathrooms</p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {property.specs.bathrooms}
                    </p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100 self-center" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <Maximize className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-xs text-brand-slate">Area</p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {formatArea(property.specs.area)}
                    </p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100 self-center" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <Car className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-xs text-brand-slate">Parking</p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {property.specs.parking} {property.specs.parking === 1 ? "Space" : "Spaces"}
                    </p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100 self-center" />
                <div className="flex items-center gap-2 px-3 py-2">
                  <Calendar className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-xs text-brand-slate">Year Built</p>
                    <p className="text-sm font-semibold text-brand-navy">
                      {property.specs.yearBuilt || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* About This Property */}
              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-brand-navy">
                  About This Property
                </h2>
                <ExpandableDescription description={property.description} />
              </section>


              {/* Features & Highlights */}
              {property.features.length > 0 && (
                <section className="space-y-4">
                  <h2 className="font-display text-2xl font-bold text-brand-navy">
                    Features & Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg"
                      >
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className="text-sm text-brand-navy">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <section className="space-y-4">
                  <h2 className="font-display text-2xl font-bold text-brand-navy">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium text-brand-navy shadow-sm border border-gray-100"
                      >
                        <Check className="w-3.5 h-3.5 text-brand-gold" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Location Section */}
              <section className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-brand-navy">
                  Location
                </h2>

                {/* Interactive Map */}
                <LeafletMap
                  lat={property.location.lat}
                  lng={property.location.lng}
                  zoom={property.location.mapZoom ?? 15}
                  markerLabel={`${property.title} — ${property.location.address}`}
                  height="300px"
                />

                {/* Nearby Places */}
                <div className="bg-white rounded-xl p-6 shadow-card">
                  <h3 className="text-base font-semibold text-brand-navy mb-4">
                    Nearby Places
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {NEARBY_PLACES.map((place) => (
                      <div
                        key={place.label}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-cream flex items-center justify-center text-brand-gold">
                          {place.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-brand-navy">
                            {place.label}
                          </p>
                          <p className="text-xs text-brand-slate">
                            {place.distance}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Similar Properties */}
              {similarProperties.length > 0 && (
                <section className="space-y-4">
                  <h2 className="font-display text-2xl font-bold text-brand-navy">
                    Similar Properties
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {similarProperties.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column (35%) */}
            <div className="lg:w-[35%]">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Agent Card */}
                <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Image
                      src={property.agent.photo}
                      alt={property.agent.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-16 h-16"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-navy text-lg">
                        {property.agent.name}
                      </h3>
                      <p className="text-sm text-brand-slate">
                        {property.agent.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                        <span className="text-sm font-semibold text-brand-navy">
                          {property.agent.rating}
                        </span>
                        <span className="text-xs text-brand-slate">
                          ({property.agent.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-brand-slate leading-relaxed line-clamp-3">
                    {property.agent.bio}
                  </p>

                  <div className="space-y-2">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-brand-navy text-white font-semibold rounded-lg hover:bg-brand-navy-700 transition-colors duration-200"
                    >
                      <Phone className="w-4 h-4" />
                      Call Agent
                    </a>
                    <a
                      href={`https://wa.me/${property.agent.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${property.agent.email}?subject=Inquiry: ${property.title}`}
                      className="flex items-center justify-center gap-2 w-full py-3 border-2 border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-brand-navy hover:text-white transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4" />
                      Email Agent
                    </a>
                  </div>
                </div>

                {/* Schedule Viewing Form */}
                <ScheduleViewingForm propertyTitle={property.title} />

                {/* Mortgage Calculator */}
                {property.dealType === "sale" && (
                  <MortgageCalculator
                    propertyPrice={property.price}
                    currency={property.currency}
                  />
                )}

                {/* Quick Info */}
                <div className="bg-white rounded-xl shadow-card p-6 space-y-4">
                  <h3 className="font-display text-lg font-bold text-brand-navy">
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="flex items-center gap-2 text-sm text-brand-slate">
                        <Hash className="w-4 h-4" />
                        Property ID
                      </span>
                      <span className="text-sm font-semibold text-brand-navy">
                        {property.id.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="flex items-center gap-2 text-sm text-brand-slate">
                        <Clock className="w-4 h-4" />
                        Listed Date
                      </span>
                      <span className="text-sm font-semibold text-brand-navy">
                        {listedDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="flex items-center gap-2 text-sm text-brand-slate">
                        <Eye className="w-4 h-4" />
                        Views
                      </span>
                      <span className="text-sm font-semibold text-brand-navy">
                        {property.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="flex items-center gap-2 text-sm text-brand-slate">
                        <Activity className="w-4 h-4" />
                        Status
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold capitalize",
                          property.status === "available"
                            ? "text-green-600"
                            : "text-amber-600"
                        )}
                      >
                        {property.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

