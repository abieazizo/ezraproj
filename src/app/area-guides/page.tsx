import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { listings } from "@/data/listings";

export const metadata: Metadata = {
  title: "Area Guides",
  description:
    "Explore Dubai's most desirable neighborhoods with Shefa Real Estate's comprehensive area guides. Find property insights for Downtown Dubai, Palm Jumeirah, Dubai Marina, and more.",
  openGraph: {
    title: "Dubai Area Guides | Shefa Real Estate",
    description:
      "Explore Dubai's top neighborhoods. Property insights, lifestyle highlights, and investment potential for every area.",
  },
};

const neighborhoods = [
  {
    name: "Downtown Dubai",
    slug: "downtown-dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&q=80",
    description:
      "The heart of Dubai, home to the iconic Burj Khalifa and Dubai Mall. Downtown offers a vibrant urban lifestyle with world-class dining, entertainment, and luxury residences. Ideal for professionals and investors seeking premium city-center living.",
    highlights: [
      "Burj Khalifa & Dubai Mall",
      "Dubai Opera & cultural district",
      "Metro connected",
      "High rental yields",
    ],
    avgPrice: "AED 2,200/sqft",
    rentalYield: "5.5%",
  },
  {
    name: "Palm Jumeirah",
    slug: "palm-jumeirah",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&q=80",
    description:
      "The world's largest man-made island offers unparalleled beachfront living. Palm Jumeirah features luxury villas, premium apartments, five-star resorts, and private beach access. A prestigious address for discerning buyers.",
    highlights: [
      "Private beach access",
      "Five-star resort lifestyle",
      "Waterfront dining at The Pointe",
      "Monorail connectivity",
    ],
    avgPrice: "AED 2,800/sqft",
    rentalYield: "4.8%",
  },
  {
    name: "Dubai Marina",
    slug: "dubai-marina",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&q=80",
    description:
      "A stunning waterfront community featuring a 3km promenade, world-class restaurants, and a vibrant nightlife scene. Dubai Marina attracts young professionals and families with its walkable lifestyle and excellent connectivity.",
    highlights: [
      "Marina Walk promenade",
      "JBR Beach nearby",
      "Tram & Metro access",
      "Strong rental demand",
    ],
    avgPrice: "AED 1,600/sqft",
    rentalYield: "6.2%",
  },
  {
    name: "Business Bay",
    slug: "business-bay",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&q=80",
    description:
      "Dubai's central business district along the Dubai Canal, blending commercial towers with residential high-rises. Business Bay is a hub for entrepreneurs and investors, offering modern living minutes from Downtown.",
    highlights: [
      "Dubai Canal waterfront",
      "Walking distance to Downtown",
      "Growing dining scene",
      "Excellent investment value",
    ],
    avgPrice: "AED 1,400/sqft",
    rentalYield: "6.5%",
  },
  {
    name: "Dubai Hills",
    slug: "dubai-hills",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&q=80",
    description:
      "A master-planned community by Emaar offering a suburban oasis with an 18-hole championship golf course, parks, and top-tier schools. Dubai Hills Estate appeals to families seeking green spaces without sacrificing urban convenience.",
    highlights: [
      "Championship golf course",
      "Dubai Hills Mall",
      "Top international schools",
      "Family-friendly parks",
    ],
    avgPrice: "AED 1,800/sqft",
    rentalYield: "5.8%",
  },
  {
    name: "JVC",
    slug: "jvc",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&q=80",
    description:
      "Jumeirah Village Circle is one of Dubai's most popular affordable communities, offering excellent value for families and first-time buyers. With parks, schools, and retail within walking distance, JVC combines convenience with affordability.",
    highlights: [
      "Affordable entry point",
      "Community parks & retail",
      "Growing infrastructure",
      "High rental yields",
    ],
    avgPrice: "AED 900/sqft",
    rentalYield: "7.2%",
  },
  {
    name: "Arabian Ranches",
    slug: "arabian-ranches",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&q=80",
    description:
      "A premier villa community set amidst landscaped gardens and a championship golf course. Arabian Ranches offers spacious homes, a close-knit community feel, and excellent amenities for families seeking a tranquil suburban lifestyle.",
    highlights: [
      "Spacious villas with gardens",
      "Arabian Ranches Golf Club",
      "Community center & retail",
      "Established neighborhood",
    ],
    avgPrice: "AED 1,200/sqft",
    rentalYield: "4.5%",
  },
  {
    name: "DIFC",
    slug: "difc",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&q=80",
    description:
      "The Dubai International Financial Centre is the region's leading financial hub. DIFC features sleek residential towers, world-renowned art galleries, fine dining, and a dynamic professional community. Perfect for executives and investors.",
    highlights: [
      "Financial hub of the region",
      "Gate Avenue dining & retail",
      "Art galleries & cultural scene",
      "Premium corporate address",
    ],
    avgPrice: "AED 2,500/sqft",
    rentalYield: "5.0%",
  },
];

function getPropertyCount(neighborhood: string): number {
  return listings.filter(
    (p) => p.location.neighborhood === neighborhood
  ).length;
}

export default function AreaGuidesPage() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative bg-brand-navy pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Area Guides</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Dubai Area Guides
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Explore Dubai&apos;s most sought-after neighborhoods. Get insights
            on lifestyle, investment potential, and available properties.
          </p>
        </div>
      </section>

      {/* Neighborhood Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Explore Dubai"
            title="Find Your Ideal Neighborhood"
            subtitle="Each area offers a unique lifestyle. Discover the one that fits yours."
            align="center"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {neighborhoods.map((area) => {
              const count = getPropertyCount(area.name);
              return (
                <div
                  key={area.slug}
                  className="group bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-lg transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl text-white mb-1">
                        {area.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                        <span>Dubai, UAE</span>
                        {count > 0 && (
                          <>
                            <span className="text-white/40">·</span>
                            <span className="text-brand-gold font-medium">
                              {count} {count === 1 ? "Listing" : "Listings"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-brand-slate text-sm leading-relaxed mb-4">
                      {area.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {area.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-2 text-sm text-brand-navy"
                        >
                          <span className="text-brand-gold mt-0.5">✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-brand-gold" />
                        <div>
                          <p className="text-xs text-brand-slate">Avg. Price</p>
                          <p className="text-sm font-semibold text-brand-navy">
                            {area.avgPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-brand-gold" />
                        <div>
                          <p className="text-xs text-brand-slate">
                            Rental Yield
                          </p>
                          <p className="text-sm font-semibold text-brand-navy">
                            {area.rentalYield}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/listings?city=Dubai&neighborhood=${encodeURIComponent(area.name)}`}
                        className="ml-auto flex items-center gap-1 text-sm font-semibold text-brand-gold hover:text-brand-gold-400 transition-colors group/link"
                      >
                        View Listings
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-5 w-5 text-brand-gold" />
            <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
              Expert Guidance
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-brand-navy mb-4">
            Need Help Choosing the Right Area?
          </h2>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto mb-8">
            Our agents live and breathe Dubai real estate. Get personalized
            recommendations based on your lifestyle, budget, and investment
            goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-brand-gold text-brand-navy font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors"
            >
              Talk to an Agent
            </Link>
            <Link
              href="/listings"
              className="px-8 py-3 border-2 border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
            >
              Browse All Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
