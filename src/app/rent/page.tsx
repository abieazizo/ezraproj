import type { Metadata } from "next";
import Image from "next/image";
import { Clock, HeartHandshake, Wrench } from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { listings } from "@/data/listings";
import RentListingsGrid from "./RentListingsGrid";

export const metadata: Metadata = {
  title: "Rent Property in Dubai",
  description:
    "Discover luxury and affordable rental properties across Dubai. Fully furnished apartments, villas, and commercial spaces from Shefa Real Estate.",
  openGraph: {
    title: "Rent Property in Dubai | Shefa Real Estate",
    description:
      "Discover luxury and affordable rental properties across Dubai. Fully furnished apartments, villas, and commercial spaces.",
  },
};

const rentalListings = listings.filter((p) => p.dealType === "rent");

const promises = [
  {
    icon: Clock,
    title: "48-Hour Move-In Guarantee",
    description:
      "Once your tenancy contract is signed and payment is processed, we guarantee that you can move into your new home within 48 hours. Our operations team handles key collection, utility connections, and building access cards so there is no waiting, no confusion, and no delays.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&q=80",
  },
  {
    icon: Wrench,
    title: "Maintenance Coordination",
    description:
      "Throughout your lease, our dedicated property management desk coordinates all maintenance requests with your landlord and building management. From HVAC servicing to plumbing emergencies, one call to Shefa is all it takes. We track every request until resolution and follow up to ensure your satisfaction.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&q=80",
  },
  {
    icon: HeartHandshake,
    title: "Fair & Transparent Terms",
    description:
      "We believe in honest, straightforward rental agreements. Every lease we broker is reviewed by our in-house legal team to ensure terms are balanced and compliant with RERA regulations. No hidden charges, no ambiguous clauses. We explain every line so you sign with complete confidence.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&q=80",
  },
];

export default function RentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&auto=format&q=80"
          alt="Modern apartment interior in Dubai"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Rental Properties
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Your Ideal Rental
          </h1>
          <p className="text-white/80 text-lg">
            {rentalListings.length} rental properties across Dubai&apos;s finest communities
          </p>
        </div>
      </section>

      {/* The Shefa Rental Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Our Commitment"
            title="The Shefa Rental Promise"
            subtitle="Renting should be simple, transparent, and stress-free. Here is how we make that a reality for every tenant."
          />

          <div className="mt-16 space-y-20">
            {promises.map((promise, index) => {
              const Icon = promise.icon;
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={promise.title}
                  className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden">
                      <Image
                        src={promise.image}
                        alt={promise.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy">
                      {promise.title}
                    </h3>
                    <p className="text-brand-slate text-lg leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listings Grid with Filters */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Browse Listings"
            title="Rental Properties"
            subtitle="Find the perfect rental from our curated collection of verified properties across Dubai."
          />
          <div className="mt-12">
            <RentListingsGrid />
          </div>
        </div>
      </section>
    </>
  );
}
